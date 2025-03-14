//TODO Inquirer Interface
//TODO Inventory part
//TODO Dialogues
//TODO Exceptions
//TODO Documentation
//TODO Test
//TODO To search info abt base class for good/hunter/merchant

import { mainMenu } from "./inquirer.js"


async function main() {
  try {
    mainMenu();
  } catch(e) { //TODO To Create Various catchs for every exception
    console.log(`Exception: {e}`);
  }
}