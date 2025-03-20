//TODO Exceptions y sus tests
//TODO Documentation
//TODO SOLID: el inquirer son 1000 lineas xd
/**
 * Separar el DATABASE en varios database (por ejemplo, uno UpdateDatabase, AddDatabase, GetDatabase, etc)
 * Lo bomba seria meterlo en la misma carpeta, lo mismo con good, hunter y merchant tmb en una misma carpeta
 * separar transaction tmb en una carpeta que tenga las 3 bases de datos separadas
 * cuando vayan separando, rueden los tests al nuevo .spec.ts para que no se lien
 * y ya estaria lo solid 
 */

import { mainMenu } from "./inquirer.js"
import { Database } from "./database.js";

async function main() {
  try {
    const db = new Database();
    await db.init(); 
    await mainMenu(db);
  } catch(e) { //TODO To Create Various catchs for every exception
    console.error("Exception: ", e);
  }
}

main();