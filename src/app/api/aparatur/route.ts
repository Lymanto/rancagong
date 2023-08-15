import { authOptions } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error('Database connection failed');
  }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
    const data = await prisma.aparatur.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const image = formData.get('image') as Blob;

    if (!name || !position || !image)
      return NextResponse.json(
        { message: 'name, position, image is required' },
        { status: 400 }
      );

    const imageFile =
      'data:' +
      image.type +
      ';base64,' +
      Buffer.from(await image.arrayBuffer()).toString('base64');
    const uploadedImageResponse = await cloudinary.uploader
      .upload(imageFile, ['rancagong'])
      .catch((err: any) => {
        return NextResponse.json({ message: 'Error', err }, { status: 500 });
      });

    await main();
    const imageId = uploadedImageResponse.public_id;
    const post = await prisma.aparatur.create({
      data: {
        position,
        name,
        imageUrl: uploadedImageResponse.url,
        imageId,
      },
    });
    return NextResponse.json({ message: 'Success', post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;

    const oldImageId = formData.get('imageId') as string;
    const image = formData.get('image') as Blob;
    if (!name || !position)
      return NextResponse.json(
        { message: 'name, position is required' },
        { status: 400 }
      );

    if (!image) {
      await main();
      const post = await prisma.aparatur.update({
        where: {
          id: id,
        },
        data: {
          position,
          name,
        },
      });
      return NextResponse.json({ message: 'Success', post }, { status: 201 });
    }
    if (image) {
      await cloudinary.uploader.destroy(oldImageId);
      const imageFile =
        'data:' +
        image.type +
        ';base64,' +
        Buffer.from(await image.arrayBuffer()).toString('base64');
      const uploadedImageResponse = await cloudinary.uploader
        .upload(imageFile, ['rancagong'])
        .catch((err: any) => {
          return NextResponse.json({ message: 'Error', err }, { status: 500 });
        });
      const imageId = uploadedImageResponse.public_id;
      await main();
      const post = await prisma.aparatur.update({
        where: {
          id: id,
        },
        data: {
          position,
          name,
          imageUrl: uploadedImageResponse.url,
          imageId,
        },
      });
      return NextResponse.json({ message: 'Success', post }, { status: 201 });
    }
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const imageId = formData.get('imageId') as string;
    await cloudinary.uploader.destroy(imageId);
    await main();
    const post = await prisma.aparatur.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'Success', post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
