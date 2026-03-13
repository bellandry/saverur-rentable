import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      // Return empty links if no settings exist yet
      return NextResponse.json({
        facebook: "",
        instagram: "",
        youtube: "",
        twitter: "",
        pinterest: "",
        tiktok: "",
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des liens" },
      { status: 500 },
    );
  }
}
