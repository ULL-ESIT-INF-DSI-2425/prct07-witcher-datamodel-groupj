//TODO Exceptions y sus tests
//TODO Documentation
//TODO SOLID: el inquirer son 1000 lineas xd

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