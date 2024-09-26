import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

//  POST Handler
export async function POST(req: Request) {
  const { title, description, userId } = await req.json();
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
}

// GET Handler
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}

//  PUT Handler
export async function PUT(req: Request) {
    const { id, title, description, status } = await req.json();
  
    const data: any = {}; 

    if (title) data.title = title;
    if (description) data.description = description;
    if (status) data.status = status;
  
    try {
      const task = await prisma.task.update({
        where: { id: Number(id) },
        data,
      });
  
      return NextResponse.json(task, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
    }
  }

// DELETE Handler
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