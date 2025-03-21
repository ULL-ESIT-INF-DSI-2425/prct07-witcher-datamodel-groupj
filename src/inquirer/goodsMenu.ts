import inquirer from "inquirer";
import { Database } from "../database/database.js";
import { Good } from "../characters/good.js";

export async function manageGoods(db: Database) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action for Goods',
      choices: ['Add a Good', 'List Goods', 'Delete a Good', 'Search Goods', 'Update Good', 'Stock', 'Back'],
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

    case 'Stock': {
      const goodsList = db.getAllGoods();
      if (goodsList.length === 0) {
        console.log("⚠️ No goods found.");
      } else {
        let totalQuantity = 0;
        goodsList.forEach(good => {
          console.log(`Good: ${good.name}, Quantity: ${good.quantity}`);
          totalQuantity += good.quantity;
        });
        console.log(`Total Stock: ${totalQuantity}`);
      }
      break;
    }

    case 'Back':
      return;
  }

  await manageGoods(db);
}

export async function searchGood(db: Database) {
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