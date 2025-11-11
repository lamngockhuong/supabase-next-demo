import { NextResponse, type NextRequest } from "next/server";
import { createServer } from "@/lib/supabaseServer";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = await createServer();
  const { data } = await supabase.auth.getSession();

  // If no session → redirect to login page
  if (!data.session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
