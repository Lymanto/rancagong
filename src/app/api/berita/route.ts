import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error('Database connection failed');
  }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') as string);
    if (!take)
      return NextResponse.json(
        { message: 'take is required' },
        { status: 400 }
      );
    const page = parseInt(searchParams.get('page') as string);

    let skip = (page - 1) * take;

    await main();
    const data = await prisma.news.findMany({
      take: take,
      skip: skip,

      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('page', data);
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
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;
    const image = formData.get('image') as Blob;

    if (!title || !description || !url || !image)
      return NextResponse.json(
        { message: 'title, description, url, image is required' },
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
    const post = await prisma.news.create({
      data: {
        description,
        title,
        imageUrl: uploadedImageResponse.url,
        imageId,
        url,
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
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;

    const oldImageId = formData.get('imageId') as string;
    const image = formData.get('image') as Blob;
    if (!title || !description || !url)
      return NextResponse.json(
        { message: 'title, description, url is required' },
        { status: 400 }
      );

    if (!image) {
      await main();
      const post = await prisma.news.update({
        where: {
          id: id,
        },
        data: {
          description,
          title,
          url,
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
      const post = await prisma.news.update({
        where: {
          id: id,
        },
        data: {
          description,
          title,
          imageUrl: uploadedImageResponse.url,
          imageId,
          url,
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
    const post = await prisma.news.delete({
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
