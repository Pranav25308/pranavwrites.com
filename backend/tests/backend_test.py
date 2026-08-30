"""
Backend API tests for Next.js portfolio app.
Tests: reviews CRUD + reactions, messages CRUD, visits tracking, settings persistence.
"""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("PORTFOLIO_BASE_URL", "http://localhost:3000")

# Track created ids for cleanup
_created_review_ids = []
_created_message_ids = []


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session", autouse=True)
def cleanup(client):
    yield
    for rid in _created_review_ids:
        try:
            client.delete(f"{BASE_URL}/api/reviews/{rid}")
        except Exception:
            pass
    for mid in _created_message_ids:
        try:
            client.delete(f"{BASE_URL}/api/messages/{mid}")
        except Exception:
            pass


# ==================== REVIEWS ====================
class TestReviews:
    def test_list_reviews_empty_ok(self, client):
        r = client.get(f"{BASE_URL}/api/reviews")
        assert r.status_code == 200
        assert "reviews" in r.json()
        assert isinstance(r.json()["reviews"], list)

    def test_create_review_missing_fields(self, client):
        r = client.post(f"{BASE_URL}/api/reviews", json={"type": "blog"})
        assert r.status_code == 400

    def test_full_crud_and_filter(self, client):
        # CREATE blog
        payload = {
            "type": "blog",
            "title": "TEST_Blog_" + uuid.uuid4().hex[:6],
            "description": "Test description",
            "content": "Test content body",
        }
        r = client.post(f"{BASE_URL}/api/reviews", json=payload)
        assert r.status_code == 201
        rev = r.json()["review"]
        assert rev["title"] == payload["title"]
        assert rev["type"] == "blog"
        assert rev["likes"] == 0 and rev["dislikes"] == 0
        assert "id" in rev
        rid = rev["id"]
        _created_review_ids.append(rid)

        # GET single
        r = client.get(f"{BASE_URL}/api/reviews/{rid}")
        assert r.status_code == 200
        assert r.json()["review"]["title"] == payload["title"]

        # Filter by type
        r = client.get(f"{BASE_URL}/api/reviews?type=blog")
        assert r.status_code == 200
        titles = [x["title"] for x in r.json()["reviews"]]
        assert payload["title"] in titles

        # Filter by non-existent type returns empty (not the blog)
        r = client.get(f"{BASE_URL}/api/reviews?type=movie")
        assert r.status_code == 200
        titles = [x["title"] for x in r.json()["reviews"]]
        assert payload["title"] not in titles

        # Limit
        r = client.get(f"{BASE_URL}/api/reviews?limit=1")
        assert r.status_code == 200
        assert len(r.json()["reviews"]) <= 1

        # UPDATE
        r = client.put(f"{BASE_URL}/api/reviews/{rid}", json={"title": "TEST_Updated"})
        assert r.status_code == 200
        assert r.json()["review"]["title"] == "TEST_Updated"

        # Verify persistence
        r = client.get(f"{BASE_URL}/api/reviews/{rid}")
        assert r.json()["review"]["title"] == "TEST_Updated"

        # DELETE
        r = client.delete(f"{BASE_URL}/api/reviews/{rid}")
        assert r.status_code == 200
        _created_review_ids.remove(rid)

        # Verify 404
        r = client.get(f"{BASE_URL}/api/reviews/{rid}")
        assert r.status_code == 404

    def test_invalid_id(self, client):
        r = client.get(f"{BASE_URL}/api/reviews/not-a-valid-id")
        assert r.status_code == 400


# ==================== REACTIONS ====================
class TestReactions:
    @pytest.fixture(scope="class")
    def review_id(self, client):
        payload = {"type": "blog", "title": "TEST_React_" + uuid.uuid4().hex[:6], "description": "d"}
        r = client.post(f"{BASE_URL}/api/reviews", json=payload)
        assert r.status_code == 201
        rid = r.json()["review"]["id"]
        _created_review_ids.append(rid)
        return rid

    def test_like(self, client, review_id):
        r = client.post(f"{BASE_URL}/api/reviews/{review_id}/reaction",
                        json={"action": "like", "previous": None})
        assert r.status_code == 200
        d = r.json()
        assert d["likes"] == 1 and d["dislikes"] == 0

    def test_switch_like_to_dislike(self, client, review_id):
        r = client.post(f"{BASE_URL}/api/reviews/{review_id}/reaction",
                        json={"action": "dislike", "previous": "like"})
        assert r.status_code == 200
        d = r.json()
        assert d["likes"] == 0 and d["dislikes"] == 1

    def test_clear_reaction(self, client, review_id):
        r = client.post(f"{BASE_URL}/api/reviews/{review_id}/reaction",
                        json={"action": "none", "previous": "dislike"})
        assert r.status_code == 200
        d = r.json()
        assert d["likes"] == 0 and d["dislikes"] == 0

    def test_invalid_action(self, client, review_id):
        r = client.post(f"{BASE_URL}/api/reviews/{review_id}/reaction",
                        json={"action": "love", "previous": None})
        assert r.status_code == 400

    def test_never_negative(self, client, review_id):
        # dislike with previous=like when current likes=0 -> would decrement to -1, should clamp to 0
        r = client.post(f"{BASE_URL}/api/reviews/{review_id}/reaction",
                        json={"action": "dislike", "previous": "like"})
        assert r.status_code == 200
        d = r.json()
        assert d["likes"] >= 0 and d["dislikes"] >= 0


# ==================== MESSAGES ====================
class TestMessages:
    def test_message_lifecycle(self, client):
        payload = {
            "name": "TEST_User",
            "email": "test@example.com",
            "subject": "TEST_Subject_" + uuid.uuid4().hex[:6],
            "message": "Hello from pytest",
        }
        r = client.post(f"{BASE_URL}/api/messages", json=payload)
        assert r.status_code == 201
        msg = r.json()["message"]
        assert msg["name"] == "TEST_User"
        assert msg["read"] is False
        assert "id" in msg
        mid = msg["id"]
        _created_message_ids.append(mid)

        # List
        r = client.get(f"{BASE_URL}/api/messages")
        assert r.status_code == 200
        subjects = [m["subject"] for m in r.json()["messages"]]
        assert payload["subject"] in subjects

        # PATCH toggle read
        r = client.patch(f"{BASE_URL}/api/messages/{mid}", json={"read": True})
        assert r.status_code == 200

        r = client.get(f"{BASE_URL}/api/messages")
        target = next(m for m in r.json()["messages"] if m["id"] == mid)
        assert target["read"] is True

        # DELETE
        r = client.delete(f"{BASE_URL}/api/messages/{mid}")
        assert r.status_code in (200, 204)
        _created_message_ids.remove(mid)

        # Verify removed
        r = client.get(f"{BASE_URL}/api/messages")
        ids = [m["id"] for m in r.json()["messages"]]
        assert mid not in ids

    def test_message_validation(self, client):
        r = client.post(f"{BASE_URL}/api/messages", json={"name": "x"})
        assert r.status_code == 400


# ==================== VISITS ====================
class TestVisits:
    def test_track_and_stats(self, client):
        r = client.get(f"{BASE_URL}/api/visits")
        assert r.status_code == 200
        before = r.json()
        assert "totalVisits" in before and "uniqueVisitors" in before and "topPages" in before

        visitor_id = "TEST_visitor_" + uuid.uuid4().hex[:8]
        for page in ["/", "/blogs", "/blogs"]:
            r = client.post(f"{BASE_URL}/api/visits", json={"page": page, "visitorId": visitor_id})
            assert r.status_code == 201

        time.sleep(0.5)
        r = client.get(f"{BASE_URL}/api/visits")
        after = r.json()
        assert after["totalVisits"] >= before["totalVisits"] + 3
        assert after["uniqueVisitors"] >= before["uniqueVisitors"] + 1
        pages = {p["page"]: p["views"] for p in after["topPages"]}
        assert "/blogs" in pages

    def test_visit_validation(self, client):
        r = client.post(f"{BASE_URL}/api/visits", json={"page": "/only"})
        assert r.status_code == 400


# ==================== SETTINGS ====================
class TestSettings:
    def test_get_returns_defaults(self, client):
        r = client.get(f"{BASE_URL}/api/settings")
        assert r.status_code == 200
        s = r.json()["settings"]
        assert "navbar" in s and "features" in s and "ads" in s

    def test_put_persists(self, client):
        # Get existing
        r = client.get(f"{BASE_URL}/api/settings")
        original = r.json()["settings"]

        new = {
            "navbar": {**original["navbar"], "movies": False},
            "features": {**original["features"], "chatbot": False},
            "ads": {**original["ads"], "adsenseClientId": "ca-pub-TEST-123"},
        }
        r = client.put(f"{BASE_URL}/api/settings", json=new)
        assert r.status_code == 200
        saved = r.json()["settings"]
        assert saved["navbar"]["movies"] is False
        assert saved["features"]["chatbot"] is False
        assert saved["ads"]["adsenseClientId"] == "ca-pub-TEST-123"

        # Verify GET reflects it
        r = client.get(f"{BASE_URL}/api/settings")
        s = r.json()["settings"]
        assert s["navbar"]["movies"] is False
        assert s["ads"]["adsenseClientId"] == "ca-pub-TEST-123"

        # Restore
        r = client.put(f"{BASE_URL}/api/settings", json=original)
        assert r.status_code == 200
