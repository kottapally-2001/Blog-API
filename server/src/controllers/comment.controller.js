import { prisma } from "../prisma.js";

export async function createComment(req, res) {
  const { slug } = req.params;
  const { authorName, authorEmail, content } = req.body;
  if (!authorName || !content) return res.status(400).json({ message: "authorName and content required" });
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) return res.status(404).json({ message: "Post not found" });
  const comment = await prisma.comment.create({
    data: { postId: post.id, authorName, authorEmail: authorEmail || null, content }
  });
  res.status(201).json(comment);
}

export async function deleteComment(req, res) {
  const { id } = req.params;
  try {
    await prisma.comment.delete({ where: { id: Number(id) } });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(404).json({ message: "Comment not found" });
  }
}
