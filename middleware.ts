// middleware.ts (raíz del proyecto, al mismo nivel que src/)
import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/artist/:path*", "/producer/:path*"],
};
