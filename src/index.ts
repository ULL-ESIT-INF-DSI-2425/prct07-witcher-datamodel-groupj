//TODO Tests
//TODO Documentation
//TODO SOLID
/**
 * Separar el DATABASE en varios database (por ejemplo, uno UpdateDatabase, AddDatabase, GetDatabase, etc)
 * Lo bomba seria meterlo en la misma carpeta, lo mismo con good, hunter y merchant tmb en una misma carpeta
 * separar transaction tmb en una carpeta que tenga las 3 bases de datos separadas
 * cuando vayan separando, rueden los tests al nuevo .spec.ts para que no se lien
 * y ya estaria lo solid 
**/

import { mainMenu } from "./inquirer/inquirer.js"
import { Database } from "./database/database.js";

async function main() {
  try {
    const db = new Database();
    await db.init(); 
    await mainMenu(db);
  } catch(error) {
    if (error instanceof Error) {
      console.error("❌ Error during runtime:", error.message);
      return;
    }
    console.error("❌ Unexpected error during runtime");
  }
}

main();