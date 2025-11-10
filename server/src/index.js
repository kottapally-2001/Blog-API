import "dotenv/config";
import app from "./app.js";
import { prisma } from "./prisma.js";

const PORT = process.env.PORT || 4000;

async function main() {
  await prisma.$connect();
  app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
