import { JSONFilePreset } from 'lowdb/node';

async function main() {
  // Read or create db.json
  const defaultData: { posts: string[] } = { posts: [] };
  const db = await JSONFilePreset('db.json', defaultData);

  // Update db.json
  await db.update(({ posts }) => posts.push('hello world'));

  // Alternatively you can call db.write() explicitly later
  db.data.posts.push('hello world');
  await db.write();
}

main().catch(console.error);