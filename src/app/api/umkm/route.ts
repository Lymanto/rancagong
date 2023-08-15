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
    const data = await prisma.umkm.findMany({});
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
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const description = formData.get('description') as string;
    const whatsAppUrl = formData.get('whatsAppUrl') as string | null;
    const shopeeUrl = formData.get('shopeeUrl') as string | null;
    const tokopediaUrl = formData.get('tokopediaUrl') as string | null;
    const grabUrl = formData.get('grabUrl') as string | null;
    const gojekUrl = formData.get('gojekUrl') as string | null;
    const instagramUrl = formData.get('instagramUrl') as string | null;
    const tiktokUrl = formData.get('tiktokUrl') as string | null;
    const image = formData.get('image') as Blob;

    if (name == '' || description == '' || address == '' || !image)
      return NextResponse.json(
        { message: 'name, description, address, image is required' },
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
    const post = await prisma.umkm.create({
      data: {
        description,
        name,
        imageUrl: uploadedImageResponse.url,
        imageId,
        whatsAppUrl: whatsAppUrl != '' ? whatsAppUrl : null,
        shopeeUrl: shopeeUrl != '' ? shopeeUrl : null,
        tokopediaUrl: tokopediaUrl != '' ? tokopediaUrl : null,
        instagramUrl: instagramUrl != '' ? instagramUrl : null,
        address,
        grabFoodUrl: grabUrl != '' ? grabUrl : null,
        goFoodUrl: gojekUrl != '' ? gojekUrl : null,
        ttUrl: tiktokUrl != '' ? tiktokUrl : null,
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
    const address = formData.get('address') as string;
    const description = formData.get('description') as string;
    const whatsAppUrl = formData.get('whatsAppUrl') as string | null;
    const shopeeUrl = formData.get('shopeeUrl') as string | null;
    const tokopediaUrl = formData.get('tokopediaUrl') as string | null;
    const grabUrl = formData.get('grabUrl') as string | null;
    const gojekUrl = formData.get('gojekUrl') as string | null;
    const instagramUrl = formData.get('instagramUrl') as string | null;
    const tiktokUrl = formData.get('tiktokUrl') as string | null;

    const oldImageId = formData.get('imageId') as string;
    const image = formData.get('image') as Blob;
    if (name == '' || description == '' || address == '')
      return NextResponse.json(
        { message: 'name, description, address is required' },
        { status: 400 }
      );

    if (!image) {
      await main();
      const post = await prisma.umkm.update({
        where: {
          id: id,
        },
        data: {
          description,
          name,
          address,
          whatsAppUrl: whatsAppUrl != '' ? whatsAppUrl : null,
          shopeeUrl: shopeeUrl != '' ? shopeeUrl : null,
          tokopediaUrl: tokopediaUrl != '' ? tokopediaUrl : null,
          instagramUrl: instagramUrl != '' ? instagramUrl : null,
          grabFoodUrl: grabUrl != '' ? grabUrl : null,
          goFoodUrl: gojekUrl != '' ? gojekUrl : null,
          ttUrl: tiktokUrl != '' ? tiktokUrl : null,
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
      const post = await prisma.umkm.update({
        where: {
          id: id,
        },
        data: {
          description,
          name,
          address,
          imageId,
          imageUrl: uploadedImageResponse.url,
          whatsAppUrl: whatsAppUrl != '' ? whatsAppUrl : null,
          shopeeUrl: shopeeUrl != '' ? shopeeUrl : null,
          tokopediaUrl: tokopediaUrl != '' ? tokopediaUrl : null,
          instagramUrl: instagramUrl != '' ? instagramUrl : null,
          grabFoodUrl: grabUrl != '' ? grabUrl : null,
          goFoodUrl: gojekUrl != '' ? gojekUrl : null,
          ttUrl: tiktokUrl != '' ? tiktokUrl : null,
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
    const post = await prisma.umkm.delete({
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
