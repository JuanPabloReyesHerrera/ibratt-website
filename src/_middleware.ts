import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware corriendo en: ", request.nextUrl.pathname);
  return await updateSession(request);
}

export const config = {
  matcher: ["/artist/:path*", "/producer/:path*"],
};
