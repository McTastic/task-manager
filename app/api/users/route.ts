import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST Handler
export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name, // Optional
      },
    });

    return NextResponse.json(newUser, { status: 201 }); // 201 Created
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error creating user', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error creating user', details: 'An unknown error occurred.' }, { status: 500 });
  }
}

// GET Handler
export async function GET() {
  try {
    const users = await prisma.user.findMany({
        include: {
            tasks: true,
            },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

// PUT Handler
export async function PUT(req: Request) {
    const { id, email, password, name } = await req.json();
  
    const data: any = {}; 

    if (email) data.email = email;
    if (password) data.password = password;
    if (name) data.name = name;
  
    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data,
      });
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error('Error updating user:', error); 
      return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
    }
  }