import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { title } from 'process';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const tasks = await prisma.task.findMany({ where: { projectId: parseInt(id) } });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, description } = await req.json();

  if (!title || !description ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        projectId: parseInt(id),
      },
    });
    return NextResponse.json(newTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
    const { id } = await req.json();
  
    try {
      const task = await prisma.task.delete({
        where: { id: Number(id) },
      });
  
      return NextResponse.json(task, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
    }
  }