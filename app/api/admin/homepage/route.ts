import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Récupérer l'ID du contenu existant
    const existing = await prisma.homePageContent.findFirst();

    if (!existing) {
      // Créer si n'existe pas
      const content = await prisma.homePageContent.create({
        data: body,
      });
      return NextResponse.json(content);
    }

    // Mettre à jour
    const content = await prisma.homePageContent.update({
      where: { id: existing.id },
      data: body,
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating homepage content:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du contenu" },
      { status: 500 },
    );
  }
}
