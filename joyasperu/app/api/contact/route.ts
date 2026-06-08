import { NextRequest, NextResponse } from "next/server";
import { sanitizeInput } from "@/lib/utils/sanitize";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 4;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const current = attempts.get(ip);

  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  attempts.set(ip, {
    count: current && current.resetAt > now ? current.count + 1 : 1,
    resetAt: now + WINDOW_MS,
  });

  const form = await request.formData();
  const payload = {
    nombre: sanitizeInput(String(form.get("nombre") ?? ""), 120),
    email: sanitizeInput(String(form.get("email") ?? ""), 160),
    telefono: sanitizeInput(String(form.get("telefono") ?? ""), 80),
    mensaje: sanitizeInput(String(form.get("mensaje") ?? ""), 900),
  };

  if (!payload.nombre || !payload.email || !payload.mensaje || !payload.email.includes("@")) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
