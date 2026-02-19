import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const content = await prisma.aboutPageContent.findFirst();
    return NextResponse.json(content || {});
  } catch (error) {
    console.error("Error fetching about content:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du contenu" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const existing = await prisma.aboutPageContent.findFirst();

    if (!existing) {
      const content = await prisma.aboutPageContent.create({
        data: body,
      });
      return NextResponse.json(content);
    }

    const content = await prisma.aboutPageContent.update({
      where: { id: existing.id },
      data: body,
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating about content:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du contenu" },
      { status: 500 },
    );
  }
}
