import inquirer from "inquirer";
import { Database } from "../database/database.js";
import { Merchant } from "../characters/merchant.js";
import { isNumber } from "lodash";

export async function manageMerchants(db: Database) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action for Merchants',
      choices: ['Add a Merchant', 'List Merchants', 'Delete a Merchant', 'Update Merchant', 'Search Merchant' , 'Back'],
    },
  ]);

  switch (action) {
    case 'Add a Merchant': {
      try {
        const newMerchant = await inquirer.prompt([
          { type: 'input', name: 'name', message: 'Merchant\'s name:' },
          { type: 'input', name: 'type', message: 'Merchant type (e.g., Blacksmith, Alchemist):' },
          { type: 'input', name: 'location', message: 'Merchant\'s location:' },
        ]);

        if (isNaN(newMerchant.name) || isNaN(newMerchant.type) || isNaN(newMerchant.location)) {
          throw new Error("❌ Invalid input: Name, type and location atributes must be filled.");
        }

        const merchant = new Merchant(
          db.getAllMerchants().length + 1, // Genera un ID único
          newMerchant.name,
          newMerchant.type,
          newMerchant.location
        );

        db.addMerchant(merchant);
        console.log('✅ Merchant added');
      } catch (error) {
        if (error instanceof Error) {
          console.error("❌ Error adding merchant:", error.message);
          break;
        }
        console.error("❌ Unexpected error adding merchant");
      }
      break;
    }
    case 'Update Merchant':
      await updateMerchant(db);
      break;
    
    case 'Search Merchant':
      await searchMerchant(db);
      break;

    case 'List Merchants':
      if (db.getAllMerchants().length === 0) {
        console.log("⚠️ No merchants found.");
      } else {
        console.table(db.getAllMerchants());
      }
      break;

    case 'Delete a Merchant': {
      const merchantsList = db.getAllMerchants();
      if (merchantsList.length === 0) {
        console.log("⚠️ No merchants available to delete.");
        break;
      }

      const { merchantToDelete } = await inquirer.prompt([
        {
          type: 'list',
          name: 'merchantToDelete',
          message: 'Select the Merchant to delete:',
          choices: [...merchantsList.map(merchant => ({ name: `${merchant.name} (ID: ${merchant.id})`, value: merchant.id })), 
            { name: "🔙 Back", value: "back" }],
          },
      ]);

      if (merchantToDelete === "back") break;
      if (!isNumber(merchantToDelete)) {
        console.error("❌ Not a valid Merchant ID");
        break;
      }
      db.deleteMerchant(merchantToDelete);
      console.log("❌ Merchant removed.");
      break;
    }

    case 'Back':
      return;
  }

  await manageMerchants(db);
}

export async function searchMerchant(db: Database) {
  const { searchType } = await inquirer.prompt([
    {
      type: "list",
      name: "searchType",
      message: "Search merchants by:",
      choices: ["Name", "Type", "Location"],
    },
  ]);

  let merchants = db.getAllMerchants();

  const { searchQuery } = await inquirer.prompt([
    {
      type: "input",
      name: "searchQuery",
      message: `Enter the ${searchType.toLowerCase()}:`,
    },
  ]);

  switch (searchType) {
    case "Name":
      merchants = merchants.filter((merchant) =>
        merchant.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      break;
    case "Type":
      merchants = merchants.filter((merchant) =>
        merchant.type.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      break;
    case "Location":
      merchants = merchants.filter((merchant) =>
        merchant.location.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      break;
  }

  if (merchants.length === 0) {
    console.log("⚠️ No matching merchants found.");
  } else {
    console.table(merchants);
  }
}

async function updateMerchant(db: Database) {
  const merchantsList = db.getAllMerchants();
  if (merchantsList.length === 0) {
    console.log("⚠️ No merchants available to update.");
    return;
  }

  const { merchantToUpdate } = await inquirer.prompt([
    {
      type: "list",
      name: "merchantToUpdate",
      message: "Select the Merchant to update:",
      choices: merchantsList.map((merchant) => ({ name: merchant.name, value: merchant.id })),
    },
  ]);

  const { fieldToUpdate } = await inquirer.prompt([
    {
      type: "list",
      name: "fieldToUpdate",
      message: "Which field do you want to update?",
      choices: ["Name", "Type", "Location", "Cancel"],
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

  const updateData: Partial<Merchant> = {};
  switch (fieldToUpdate) {
    case "Name":
      updateData.name = newValue;
      break;
    case "Type":
      updateData.type = newValue;
      break;
    case "Location":
      updateData.location = newValue;
      break;
  }

  db.updateMerchant(merchantToUpdate, updateData);
  console.log("✅ Merchant updated successfully!");
}