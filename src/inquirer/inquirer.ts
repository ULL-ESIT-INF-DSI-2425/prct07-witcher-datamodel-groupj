import inquirer from "inquirer";
import { Database } from "../database/database.js";
import { manageGoods } from "./goodsMenu.js";
import { manageMerchants } from "./merchantsMenu.js";
import { manageHunters } from "./huntersMenu.js";
import { manageTransactions } from "./transactionsMenu.js";
import { manageReports } from "./reportsMenu.js";

const db = new Database();

/**
 * Muestra el menú principal de la aplicación y permite al usuario navegar entre las diferentes opciones.
 * @param db - Instancia de la base de datos.
 * @returns Una promesa que se resuelve cuando el usuario selecciona "Exit".
 */
export async function mainMenu(db: Database): Promise<void> {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "🐺 The White Wolf Inn 🐺",
      choices: [
        "Manage Goods",
        "Manage Merchants",
        "Manage Hunters",
        "Manage Transactions",
        "Reports",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "Manage Goods":
      await manageGoods(db);
      break;
    case "Manage Merchants":
      await manageMerchants(db);
      break;
    case "Manage Hunters":
      await manageHunters(db);
      break;
    case "Manage Transactions":
      await manageTransactions(db);
      break;
    case "Reports":
      await manageReports(db);
      break;
    case "Exit":
      console.log("🌿 Farewell, traveler 🌿");
      return;
  }

  await mainMenu(db);
}
