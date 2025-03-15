//TODO Inventory part
//TODO Dialogues : bomba no se q era esto 
//TODO Exceptions : mas o menos controladas en el main, te sale el tipo de error
//TODO Documentation
//TODO Test : preguntar al profe
//TODO To search info abt base class for good/hunter/merchant

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