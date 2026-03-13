import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const existing = await prisma.siteSettings.findFirst();

    if (!existing) {
      const settings = await prisma.siteSettings.create({
        data: body,
      });
      return NextResponse.json(settings);
    }

    const settings = await prisma.siteSettings.update({
      where: { id: existing.id },
      data: body,
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating social links:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des liens" },
      { status: 500 },
    );
  }
}
