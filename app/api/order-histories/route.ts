import { Database } from "@/schema";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
  .from("order_histories")
  .select("*");

  if(!data) return

  if (error) {
    return NextResponse.json(error, {
      status: 404,
    });
  }
  return NextResponse.json(data, {
    status: 200,
  });
}
