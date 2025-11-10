import { prisma } from "../prisma.js";
import { slugify } from "../utils/slugify.js";

export async function listPublic(req, res) {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, createdAt: true, updatedAt: true }
  });
  res.json(posts);
}

export async function getBySlug(req, res) {
  const { slug } = req.params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { comments: { orderBy: { createdAt: "desc" } }, author: { select: { username: true } } }
  });
  if (!post || !post.published) return res.status(404).json({ message: "Not found" });
  res.json(post);
}

// Admin
export async function adminList(req, res) {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  res.json(posts);
}

export async function createPost(req, res) {
  const { title, content, published } = req.body;
  if (!title || !content) return res.status(400).json({ message: "title and content required" });
  const slug = slugify(title);
  const exists = await prisma.post.findUnique({ where: { slug } });
  const finalSlug = exists ? `${slug}-${Date.now()}` : slug;
  const post = await prisma.post.create({
    data: { title, slug: finalSlug, content, published: !!published, authorId: req.user.id }
  });
  res.status(201).json(post);
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content, published } = req.body;
  const data = {};
  if (title) data.title = title;
  if (typeof content === "string") data.content = content;
  if (typeof published === "boolean") data.published = published;
  if (title) data.slug = slugify(title) + "-" + id;

  try {
    const post = await prisma.post.update({ where: { id: Number(id) }, data });
    res.json(post);
  } catch (e) {
    res.status(404).json({ message: "Post not found" });
  }
}

export async function togglePublish(req, res) {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) return res.status(404).json({ message: "Post not found" });
  const updated = await prisma.post.update({ where: { id: post.id }, data: { published: !post.published } });
  res.json(updated);
}

export async function deletePost(req, res) {
  const { id } = req.params;
  await prisma.comment.deleteMany({ where: { postId: Number(id) } });
  await prisma.post.delete({ where: { id: Number(id) } });
  res.json({ message: "Deleted" });
}
