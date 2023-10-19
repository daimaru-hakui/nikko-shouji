import { Database } from "@/schema";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
    .from("order_histories")
    .select(
      `*,order_details(*,suppliers(*),shipping_details(*)),shipping_addresses(*)`
    )
    .eq("id", params.slug)
    .single();

  if (error) {
    return NextResponse.json(error, {
      status: 404,
    });
  }
  if (!data) return;

  return NextResponse.json(data, {
    status: 200,
  });
}
