// import { connectDB } from "@/lib/db";
import { connectDB } from "../../../lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "DB Connected ✅" });
  } catch (error) {
    return Response.json({ error: "DB Failed ❌" }, { status: 500 });
  }
}