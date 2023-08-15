import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const password = await hash('adminrancagong123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'admin@rancagong.com' },
    update: {},
    create: {
      email: 'admin@rancagong.com',
      name: 'Admin',
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
