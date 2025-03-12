import { JSONFilePreset } from "lowdb/node";
//import { mainMenu } from "inquirer"

type DBSchema = {
  posts: string[];
};

async function main() {
  // Crear o leer la base de datos con esquema
  const defaultData: DBSchema = { posts: [] };
  const db = await JSONFilePreset<DBSchema>('db.json', defaultData);

  let petition = mainMenu();

  db.data.posts.push(petition.jsonfify)

  // Agregar un nuevo post
  //db.data.posts.push('hello world');
  //await db.write();

  //console.log("📄 Base de datos actualizada:", db.data);
}

main().catch(console.error);
