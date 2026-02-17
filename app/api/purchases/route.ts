import { auth } from "@/lib/auth";
import { getAllPurchases } from "@/lib/fetch-datas";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!session || (session.user as any).role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const purchases = await getAllPurchases();
    return NextResponse.json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
