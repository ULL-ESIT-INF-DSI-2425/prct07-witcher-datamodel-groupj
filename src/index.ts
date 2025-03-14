//TODO Inquirer Interface & connect it to the main function
//TODO Inventory part
//TODO Dialogues
//TODO Exceptions
//TODO Documentation
//TODO To search info abt base class for good/hunter/merchant

import { mainMenu } from "./inquirer.js"


async function main() {
  try {
    mainMenu();
  } catch(e) { //TODO To Create Various catchs for every exception
    console.log(`Exception: {e}`);
  }
}

main().catch(console.error);
