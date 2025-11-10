import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/prisma.js";

async function run() {
  const adminEmail = "admin@example.com";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      username: "admin",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await prisma.post.create({
      data: {
        title: "Welcome to Your Blog",
        slug: "welcome-to-your-blog",
        content: "This is your first post. Edit it from the admin dashboard!",
        published: true,
        authorId: admin.id,
      },
    });
  }

  console.log("Seed complete.");
  process.exit(0);
}

run();
