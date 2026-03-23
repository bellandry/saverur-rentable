import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let settings = await prisma.emailSettings.findFirst();

    if (!settings) {
      settings = await prisma.emailSettings.create({
        data: {
          subject: "Bienvenue chez Saveur Rentable",
          content: "<p>Bonjour,</p><p>Bienvenue sur notre plateforme !</p>",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching email settings:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des réglages" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { subject, content } = body;

    const existing = await prisma.emailSettings.findFirst();

    if (!existing) {
      const settings = await prisma.emailSettings.create({
        data: { subject, content },
      });
      return NextResponse.json(settings);
    }

    const settings = await prisma.emailSettings.update({
      where: { id: existing.id },
      data: { subject, content },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating email settings:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des réglages" },
      { status: 500 },
    );
  }
}
