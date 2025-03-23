import inquirer from "inquirer";
import { Database } from "../database/database.js";
import { Hunter } from "../characters/hunter.js";
import lodash from "lodash";
const { isNumber } = lodash;


/**
 * Administra las operaciones relacionadas con los cazadores (Hunters).
 * @param db - Instancia de la base de datos.
 */
export async function manageHunters(db: Database): Promise<void> {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Select an action for Hunters",
      choices: [
        "Add a Hunter",
        "List Hunters",
        "Delete a Hunter",
        "Update Hunter",
        "Search Hunter",
        "Back",
      ],
    },
  ]);

  switch (action) {
    case "Add a Hunter": {
      try {
        const newHunter = await inquirer.prompt([
          { type: "input", name: "name", message: "Hunter's name:" },
          { type: "input", name: "race", message: "Hunter's race (e.g., Human, Elf, Dwarf):" },
          { type: "input", name: "location", message: "Hunter's location:" },
        ]);

        if (isNaN(newHunter.name) || isNaN(newHunter.race) || isNaN(newHunter.location)) {
          throw new Error("⚠️ Invalid input: Name, race and location atributes must be filled.");
        }

        const hunter = new Hunter(
          db.getAllHunters().length + 1,
          newHunter.name,
          newHunter.race,
          newHunter.location,
        );

        db.addHunter(hunter);
        console.log("✅ Hunter added");
      } catch (error) {
        if (error instanceof Error) {
          console.error("❌ Error adding hunter:", error.message);
          break;
        }
        console.error("❌ Unexpected error adding hunter");
      }
      break;
    }
    case "Update Hunter":
      await updateHunter(db);
      break;

    case "Search Hunter":
      await searchHunter(db);
      break;

    case "List Hunters":
      if (db.getAllHunters().length === 0) {
        console.log("⚠️ No hunters found.");
      } else {
        console.table(db.getAllHunters());
      }
      break;

    case "Delete a Hunter": {
      const huntersList = db.getAllHunters();
      if (huntersList.length === 0) {
        console.log("⚠️ No hunters available to delete.");
        break;
      }

      const { hunterToDelete } = await inquirer.prompt([
        {
          type: "list",
          name: "hunterToDelete",
          message: "Select the Hunter to delete:",
          choices: [
            ...huntersList.map((hunter) => ({
              name: `${hunter.name} (ID: ${hunter.id})`,
              value: hunter.id,
            })),
            { name: "🔙 Back", value: "back" },
          ],
        },
      ]);

      if (hunterToDelete === "back") break;
      if (!isNumber(hunterToDelete)) {
        console.error("❌ Not a valid Merchant ID");
        break;
      }
      db.deleteHunter(hunterToDelete);
      console.log("❌ Hunter removed.");
      break;
    }

    case "Back":
      return;
  }

  await manageHunters(db);
}

/**
 * Busca cazadores (Hunters) en la base de datos según diferentes criterios.
 * @param db - Instancia de la base de datos.
 */
async function searchHunter(db: Database): Promise<void> {
  const { searchType } = await inquirer.prompt([
    {
      type: "list",
      name: "searchType",
      message: "Search hunters by:",
      choices: ["Name", "Race", "Location"],
    },
  ]);

  let hunters = db.getAllHunters();

  const { searchQuery } = await inquirer.prompt([
    {
      type: "input",
      name: "searchQuery",
      message: `Enter the ${searchType.toLowerCase()}:`,
    },
  ]);

  switch (searchType) {
    case "Name":
      hunters = hunters.filter((hunter) =>
        hunter.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
      break;
    case "Race":
      hunters = hunters.filter((hunter) =>
        hunter.race.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
      break;
    case "Location":
      hunters = hunters.filter((hunter) =>
        hunter.location.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
      break;
  }

  if (hunters.length === 0) {
    console.log("⚠️ No matching hunters found.");
  } else {
    console.table(hunters);
  }
}

/**
 * Actualiza un cazador (Hunter) en la base de datos.
 * @param db - Instancia de la base de datos.
 */
async function updateHunter(db: Database): Promise<void> {
  const huntersList = db.getAllHunters();
  if (huntersList.length === 0) {
    console.log("⚠️ No hunters available to update.");
    return;
  }

  const { hunterToUpdate } = await inquirer.prompt([
    {
      type: "list",
      name: "hunterToUpdate",
      message: "Select the Hunter to update:",
      choices: huntersList.map((hunter) => ({ name: hunter.name, value: hunter.id })),
    },
  ]);

  const { fieldToUpdate } = await inquirer.prompt([
    {
      type: "list",
      name: "fieldToUpdate",
      message: "Which field do you want to update?",
      choices: ["Name", "Race", "Location", "Cancel"],
    },
  ]);

  if (fieldToUpdate === "Cancel") {
    console.log("❌ Update cancelled.");
    return;
  }

  const { newValue } = await inquirer.prompt([
    {
      type: "input",
      name: "newValue",
      message: `Enter new ${fieldToUpdate.toLowerCase()}:`,
    },
  ]);

  const updateData: Partial<Hunter> = {};
  switch (fieldToUpdate) {
    case "Name":
      updateData.name = newValue;
      break;
    case "Race":
      updateData.race = newValue;
      break;
    case "Location":
      updateData.location = newValue;
      break;
  }

  db.updateHunter(hunterToUpdate, updateData);
  console.log("✅ Hunter updated successfully!");
}
