import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error('Database connection failed');
  }
}

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params?.id;
    if (!id)
      return NextResponse.json({ message: 'url is required' }, { status: 400 });

    await main();
    const data = await prisma.news.findUnique({
      where: {
        url: id,
      },
    });
    console.log(id);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
