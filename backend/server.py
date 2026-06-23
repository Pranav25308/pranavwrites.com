"""Lightweight FastAPI proxy that forwards /api/* requests to the Next.js
dev server running on port 3000. The Kubernetes ingress routes /api/* to
this backend (port 8001); Next.js owns the real API routes under app/api,
so we just proxy through to it.
"""

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

NEXT_URL = os.environ.get("NEXT_URL", "http://localhost:3000")

app = FastAPI(title="Next.js /api proxy")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health():
    return {"status": "ok", "proxy_target": NEXT_URL}


HOP_BY_HOP = {
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "content-encoding",
    "content-length",
    "host",
}


@app.api_route(
    "/api/{full_path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
)
async def proxy(full_path: str, request: Request):
    target = f"{NEXT_URL}/api/{full_path}"

    headers = {
        k: v for k, v in request.headers.items() if k.lower() not in HOP_BY_HOP
    }

    body = await request.body()

    async with httpx.AsyncClient(timeout=30.0) as client:
        upstream = await client.request(
            request.method,
            target,
            params=request.query_params,
            content=body,
            headers=headers,
        )

    response_headers = {
        k: v for k, v in upstream.headers.items() if k.lower() not in HOP_BY_HOP
    }
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers,
        media_type=upstream.headers.get("content-type"),
    )
