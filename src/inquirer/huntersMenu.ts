import inquirer from "inquirer";
import { Database } from "../database/database.js";
import { Hunter } from "../characters/hunter.js";

export async function manageHunters(db: Database) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action for Hunters',
      choices: ['Add a Hunter', 'List Hunters', 'Delete a Hunter', 'Update Hunter', 'Search Hunter','Back'],
    },
  ]);

  switch (action) {
    case 'Add a Hunter': {
      const newHunter = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Hunter\'s name:' },
        { type: 'input', name: 'race', message: 'Hunter\'s race (e.g., Human, Elf, Dwarf):' },
        { type: 'input', name: 'location', message: 'Hunter\'s location:' },
      ]);

      const hunter = new Hunter(
        db.getAllHunters().length + 1, // Genera un ID único
        newHunter.name,
        newHunter.race,
        newHunter.location
      );

      await db.addHunter(hunter);
      console.log('✅ Hunter added');
      break;
    }
    case 'Update Hunter':
      await updateHunter(db);
      break;

    case 'Search Hunter':
      await searchHunter(db);
      break;

    case 'List Hunters':
      if (db.getAllHunters().length === 0) {
        console.log("⚠️ No hunters found.");
      } else {
        console.table(db.getAllHunters());
      }
      break;

    case 'Delete a Hunter': {
      const huntersList = db.getAllHunters();
      if (huntersList.length === 0) {
        console.log("⚠️ No hunters available to delete.");
        break;
      }

      const { hunterToDelete } = await inquirer.prompt([
        {
          type: 'list',
          name: 'hunterToDelete',
          message: 'Select the Hunter to delete:',
          choices: [...huntersList.map(hunter => ({ name: `${hunter.name} (ID: ${hunter.id})`, value: hunter.id })), 
            { name: "🔙 Back", value: "back" }],
        },
      ]);

      if (hunterToDelete === "back") break;
      await db.deleteHunter(hunterToDelete); // Asegurar que sea un número
      console.log("❌ Hunter removed.");
      break;
    }

    case 'Back':
      return;
  }

  await manageHunters(db);
}

async function searchHunter(db: Database) {
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
        hunter.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      break;
    case "Race":
      hunters = hunters.filter((hunter) =>
        hunter.race.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      break;
    case "Location":
      hunters = hunters.filter((hunter) =>
        hunter.location.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      break;
  }

  if (hunters.length === 0) {
    console.log("⚠️ No matching hunters found.");
  } else {
    console.table(hunters);
  }
}

async function updateHunter(db: Database) {
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

  await db.updateHunter(hunterToUpdate, updateData);
  console.log("✅ Hunter updated successfully!");
}