// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // Get all projects or specific project
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true, // Include related tasks if necessary
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Create a new project
  const { name, userId } = await req.json(); // Use await to parse JSON
  try {
    const project = await prisma.project.create({
      data: {
        name,
        user: { connect: { id: userId } }, // Connect to the user
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating project' }, { status: 500 });
  }
}

// Implement PUT and DELETE as needed

export async function PUT(req: Request) {
  const { id, updatedName } = await req.json();
  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name: updatedName },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating project' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { projectId } = await req.json();
  try {
    await prisma.project.delete({
      where: { id: projectId },
    });
    return NextResponse.json({}, { status: 204 }); // No content to return
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 });
  }
}
