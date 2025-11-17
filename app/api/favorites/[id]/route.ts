import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return NextResponse.json({ error: "ID invalid" }, { status: 400 });
  }

  const item = await prisma.favorite.findUnique({
    where: { id: idNumber },
  });

  if (!item) {
    return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) return NextResponse.json({ error: "ID invalid" }, { status: 400 });

  const data = await req.json();

  const updated = await prisma.favorite.update({
    where: { id: idNumber },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) return NextResponse.json({ error: "ID invalid" }, { status: 400 });

  await prisma.favorite.delete({ where: { id: idNumber } });
  return NextResponse.json({ message: "Deleted" });
}
