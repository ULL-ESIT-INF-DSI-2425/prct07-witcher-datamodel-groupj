import inquirer from "inquirer";
import { Good } from "./good.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";
import { Database } from "./database.js";

const db = new Database();

export async function mainMenu(db: Database) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '🐺 The White Wolf Inn 🐺',
      choices: ['Manage Goods', 'Manage Merchants', 'Manage Hunters', 'Exit'],
    },
  ]);

  switch (action) {
    case 'Manage Goods':
      await manageGoods(db);
      break;
    case 'Manage Merchants':
      await manageMerchants(db);
      break;
    case 'Manage Hunters':
      await manageHunters(db);
      break;
    case 'Exit':
      console.log("🌿 Farewell, traveler 🌿");
      return;
  }

  await mainMenu(db);
}

async function manageGoods(db: Database) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action for Goods',
      choices: ['Add a Good', 'List Goods', 'Delete a Good', 'Search Goods', 'Update Good' ,'Back'],
    },
  ]);

  switch (action) {
    case 'Add a Good': {
      const newGood = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Good\'s name:' },
        { type: 'input', name: 'description', message: 'Description:' },
        { type: 'input', name: 'material', message: 'Material:' },
        { type: 'number', name: 'weight', message: 'Weight:' },
        { type: 'number', name: 'value', message: 'Value in crowns:' },
        { type: 'number', name: 'quantity', message: 'Good quantity: ' }
      ]);

      const good = new Good(
        db.getAllGoods().length + 1, // Genera un ID único
        newGood.name,
        newGood.description,
        newGood.material,
        newGood.weight,
        newGood.value,
        newGood.quantity
      );

      await db.addGood(good);
      console.log('✅ Good added');
      break;
    }
    
    case 'Search Goods':
      await searchGood(db);
      break;

    case 'Update Good':
      await updateGood(db);
      break;
    
    case 'List Goods':
      if (db.getAllGoods().length === 0) {
        console.log("⚠️ No goods found.");
      } else {
        console.table(db.getAllGoods());
      }
      break;

    case 'Delete a Good': {
      const goodsList = db.getAllGoods();
      if (goodsList.length === 0) {
        console.log("⚠️ No goods available to delete.");
        break;
      }

      const { goodToDelete } = await inquirer.prompt([
        {
          type: 'list',
          name: 'goodToDelete',
          message: 'Select the Good to delete:',
          choices: [...goodsList.map(good => ({ name: `${good.name} (ID: ${good.id})`, value: good.id })), 
            { name: "🔙 Back", value: "back" }],
        },
      ]);

      if (goodToDelete === "back") break;
      await db.deleteGood(goodToDelete);
      console.log("❌ Good removed.");
      break;
    }

    case 'Back':
      return;
  }

  await manageGoods(db);
}

async function manageMerchants(db: Database) {
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
      const newMerchant = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Merchant\'s name:' },
        { type: 'input', name: 'type', message: 'Merchant type (e.g., Blacksmith, Alchemist):' },
        { type: 'input', name: 'location', message: 'Merchant\'s location:' },
      ]);

      const merchant = new Merchant(
        db.getAllMerchants().length + 1, // Genera un ID único
        newMerchant.name,
        newMerchant.type,
        newMerchant.location
      );

      await db.addMerchant(merchant);
      console.log('✅ Merchant added');
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
      
    await db.deleteMerchant(merchantToDelete); // Asegurar que sea un número
      console.log("❌ Merchant removed.");
      break;
    }

    case 'Back':
      return;
  }

  await manageMerchants(db);
}

async function manageHunters(db: Database) {
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

async function searchGood(db: Database) {
  const { searchType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'searchType',
      message: 'Search goods by:',
      choices: ['Name', 'Description'],
    },
  ]);

  let goods = db.getAllGoods();
  const { searchQuery } = await inquirer.prompt([
    { type: 'input', name: 'searchQuery', message: `Enter the ${searchType.toLowerCase()}:` },
  ]);
    if (searchType === 'Name') {
      goods = goods.filter(good => good.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    } else if (searchType === 'Description') {
      goods = goods.filter(good => good.description.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }

  if (goods.length === 0) {
    console.log("⚠️ No matching goods found.");
    return;
  }

  const { sortOption } = await inquirer.prompt([
    {
      type: 'list',
      name: 'sortOption',
      message: 'Sort by:',
      choices: ['Alphabetically (A-Z)', 'Alphabetically (Z-A)', 'Price (Low to High)', 'Price (High to Low)'],
    },
  ]);

  switch (sortOption) {
    case 'Alphabetically (A-Z)':
      goods.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Alphabetically (Z-A)':
      goods.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'Price (Low to High)':
      goods.sort((a, b) => a.value - b.value);
      break;
    case 'Price (High to Low)':
      goods.sort((a, b) => b.value - a.value);
      break;
  }
  console.table(goods);
}

async function searchMerchant(db: Database) {
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


async function updateGood(db: Database) {
  const goodsList = db.getAllGoods();
  if (goodsList.length === 0) {
    console.log("⚠️ No goods available to update.");
    return;
  }

  const { goodToUpdate } = await inquirer.prompt([
    {
      type: "list",
      name: "goodToUpdate",
      message: "Select the Good to update:",
      choices: goodsList.map((good) => ({ name: good.name, value: good.id })),
    },
  ]);

  const { fieldToUpdate } = await inquirer.prompt([
    {
      type: "list",
      name: "fieldToUpdate",
      message: "Which field do you want to update?",
      choices: ["Name", "Description", "Material", "Weight", "Value", "Quantity",  "Cancel"],
    },
  ]);

  if (fieldToUpdate === "Cancel") {
    console.log("❌ Update cancelled.");
    return;
  }

  const { newValue } = await inquirer.prompt([
    {
      type: fieldToUpdate === "Weight" || fieldToUpdate === "Value" ? "number" : "input",
      name: "newValue",
      message: `Enter new ${fieldToUpdate.toLowerCase()}:`,
    },
  ]);

  const updateData: Partial<Good> = {};
  switch (fieldToUpdate) {
    case "Name":
      updateData.name = newValue;
      break;
    case "Description":
      updateData.description = newValue;
      break;
    case "Material":
      updateData.material = newValue;
      break;
    case "Weight":
      updateData.weight = Number(newValue);
      break;
    case "Value":
      updateData.value = Number(newValue);
      break;
    case "Quantity":
      updateData.quantity = Number(newValue);
      break;
  }

  await db.updateGood(goodToUpdate, updateData);
  console.log("✅ Good updated successfully!");
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

  await db.updateMerchant(merchantToUpdate, updateData);
  console.log("✅ Merchant updated successfully!");
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
