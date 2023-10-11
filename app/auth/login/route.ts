import { Database } from "@/schema";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const { error } = await supabase.auth.signInWithPassword({
    email: res.email,
    password: res.password,
  });

  if (error) {
    return NextResponse.json(res, {
      status: 404,
    });
  }

  return NextResponse.json(res, {
    status: 200,
  });
}
