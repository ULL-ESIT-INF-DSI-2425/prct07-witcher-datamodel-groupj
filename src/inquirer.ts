import inquirer from "inquirer";
import { Good } from "./good.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";
import { Database } from "./database.js";
import { Sale, Purchase, Return } from "./transaction.js"

const db = new Database();

export async function mainMenu(db: Database) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '🐺 The White Wolf Inn 🐺',
      choices: ['Manage Goods', 'Manage Merchants', 'Manage Hunters', 'Manage Transactions', 'Reports', 'Exit'],
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
    case 'Manage Transactions':
      await manageTransactions(db);
      break;
    case 'Reports':
      await manageReports(db);
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
      choices: ['Add a Good', 'List Goods', 'Delete a Good', 'Search Goods', 'Update Good' , 'Stock' ,'Back'],
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

async function manageTransactions(db: Database) {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Type of transaction to manage:',
      choices: ['Sells', 'Purchases', 'Returns', 'Back'],
    },
  ]);

  switch (action) {
    case 'Sells': {
      const { sellAction } = await inquirer.prompt([
      {
        type: 'list',
        name: 'sellAction',
        message: 'Select an action for Sells',
        choices: ['Add a Sale', 'Delete a Sale', 'List Sales', 'Back'],
      },
      ]);

      switch (sellAction) {
      case 'Add a Sale': {
        const newSale = await inquirer.prompt([
        { type: 'number', name: 'hunterId', message: 'Hunter ID:' },
        { type: 'number', name: 'quantity', message: 'Quantity:' },
        { type: 'number', name: 'price', message: 'Price per unit:' },
        { type: 'number', name: 'goodId', message: 'Good ID:' },
        { type: 'input', name: 'date', message: 'Date: ' }
        ]);

        const good = db.getGoodByID(Number(newSale.goodId));
        if (!good) {
          console.log("⚠️ Good not found.");
          break;
        }
        const hunter = db.getHunterByID(Number(newSale.hunterId));
        if (!hunter) {
          console.log("⚠️ Hunter not found.");
          break;
        }

        const sale = new Sale(
        db.getAllSales().length + 1, // Generate a unique ID
        newSale.date,
        Number(newSale.hunterId),
        [new Good(good.id, good.name, good.description, good.material, good.weight, newSale.price, newSale.quantity)],
        newSale.price * newSale.quantity
        );

        await db.addSale(sale);

        const newQuantity = good.quantity - newSale.quantity;
        if (newQuantity <= 0) {
          await db.deleteGood(good.id);
          console.log(`❌ ${good.name} were out of stock and was eliminated from the inventory.`);
        } else {
          await db.updateGood(good.id, { quantity: newQuantity });
        }

        console.log('✅ Sale added');
        break;
      }
      case 'Delete a Sale': {
        const salesList = db.getAllSales();
        if (salesList.length === 0) {
        console.log("⚠️ No sales available to delete.");
        break;
        }

        const { saleToDelete } = await inquirer.prompt([
        {
          type: 'list',
          name: 'saleToDelete',
          message: 'Select the Sale to delete:',
          choices: [...salesList.map(sale => ({ name: `Sale ID: ${sale.id}`, value: sale.id })), 
          { name: "🔙 Back", value: "back" }],
        },
        ]);

        if (saleToDelete === "back") break;
        await db.deleteSale(saleToDelete);
        console.log("❌ Sale removed.");
        break;
      }
      case 'List Sales': {
        const sales = db.getAllSales();
        if (sales.length === 0) {
            console.log("⚠️ No sales found.");
        } else {
            const formattedSales = sales.map(sale => ({
                ID: sale.id,
                Date: sale.date,
                HunterID: sale.hunterId,
                ItemsSold: sale.itemsSold.map(item => item.name).join(", "),
            }));
            console.table(formattedSales);
        }
        break;
      }
      case 'Back':
        return;
      }

      break;
    }
    case 'Purchases': {
      const { purchaseAction } = await inquirer.prompt([
      {
        type: 'list',
        name: 'purchaseAction',
        message: 'Select an action for Purchases',
        choices: ['Add a Purchase', 'Delete a Purchase', 'List Purchases', 'Back'],
      },
      ]);

      switch (purchaseAction) {
      case 'Add a Purchase': {
        const newPurchase = await inquirer.prompt([
          { type: 'input', name: 'merchantId', message: 'Merchant ID:' },
          { type: 'number', name: 'quantity', message: 'Quantity:' },
          { type: 'number', name: 'price', message: 'Price per unit:' },
          { type: 'input', name: 'date', message: 'Date: ' },
          { type: 'number', name: 'goodId', message: 'Good ID:' }
        ]);

        const good = db.getGoodByID(Number(newPurchase.goodId));
        if (!good) {
          console.log("⚠️ Good not found.");
          break;
        }
        const merchant = db.getMerchantByID(Number(newPurchase.merchantId));
        if (!merchant) {
          console.log("⚠️ Merchant not found.");
          break;
        }


        const purchase = new Purchase(
        db.getAllPurchases().length + 1, // Generate a unique ID
        newPurchase.date,
        Number(newPurchase.merchantId),
        [new Good(good.id, good.name, good.description, good.material, good.weight, newPurchase.price, newPurchase.quantity)],
        newPurchase.price * newPurchase.quantity
        );

        await db.addPurchase(purchase);

        const newQuantity = good.quantity - newPurchase.quantity;
        if (newQuantity <= 0) {
          await db.deleteGood(good.id);
          console.log(`❌ ${good.name} were out of stock and was eliminated from the inventory.`);
        } else {
          await db.updateGood(good.id, { quantity: newQuantity });
        }
        console.log('✅ Purchase added');
        break;
      }
      case 'Delete a Purchase': {
        const purchasesList = db.getAllPurchases();
        if (purchasesList.length === 0) {
        console.log("⚠️ No purchases available to delete.");
        break;
        }

        const { purchaseToDelete } = await inquirer.prompt([
        {
          type: 'list',
          name: 'purchaseToDelete',
          message: 'Select the Purchase to delete:',
          choices: [...purchasesList.map(purchase => ({ name: `Purchase ID: ${purchase.id}`, value: purchase.id })), 
          { name: "🔙 Back", value: "back" }],
        },
        ]);

        if (purchaseToDelete === "back") break;
        await db.deletePurchase(purchaseToDelete);
        console.log("❌ Purchase removed.");
        break;
      }
      case 'List Purchases': {
        const purchases = db.getAllPurchases();
        if (purchases.length === 0) {
          console.log("⚠️ No sales found.");
        } else {
          const formattedPurchases = purchases.map(purchase => ({
            ID: purchase.id,
            Date: purchase.date,
            MerchantID: purchase.merchantId,
            ItemsPurchased: purchase.itemsPurchased.map(item => item.name).join(", "),
            TotalAmount: purchase.totalAmount
          }));
          console.table(formattedPurchases);
        }
        break;
      }
      case 'Back':
        return;
      }

      break;
    }
    case 'Returns': {
      const { returnAction } = await inquirer.prompt([
      {
        type: 'list',
        name: 'returnAction',
        message: 'Select an action for Returns',
        choices: ['Add a Return', 'Delete a Return', 'List Returns', 'Back'],
      },
      ]);

      switch (returnAction) {
      case 'Add a Return': {
        const newReturn = await inquirer.prompt([
          { type: 'input', name: 'goodId', message: 'Good ID:' },
          { type: 'input', name: 'merchantId', message: 'Merchant ID:' },
          { type: 'number', name: 'quantity', message: 'Quantity:' },
          { type: 'number', name: 'price', message: 'Price per unit:' }
        ]);

        const good = db.getGoodByID(Number(newReturn.goodId));
        if (!good) {
          console.log("⚠️ Good not found.");
          break;
        }
        const merchant = db.getMerchantByID(Number(newReturn.merchantId));
        if (!merchant) {
          console.log("⚠️ Merchant not found.");
          break;
        }

        const returnTransaction = new Return(
        db.getAllReturns().length + 1, // Generate a unique ID
        new Date(),
        Number(newReturn.merchantId),
        [new Good(good.id, good.name, good.description, good.material, good.weight, newReturn.price, newReturn.quantity)]
        );

        await db.addReturn(returnTransaction);

        const newQuantity = good.quantity - newReturn.quantity;
        if (newQuantity <= 0) {
          await db.deleteGood(good.id);
          console.log(`❌ ${good.name} were out of stock and was eliminated from the inventory.`);
        } else {
          await db.updateGood(good.id, { quantity: newQuantity });
        }
        console.log('✅ Return added');
        break;
      }
      case 'Delete a Return': {
        const returnsList = db.getAllReturns();
        if (returnsList.length === 0) {
        console.log("⚠️ No returns available to delete.");
        break;
        }

        const { returnToDelete } = await inquirer.prompt([
        {
          type: 'list',
          name: 'returnToDelete',
          message: 'Select the Return to delete:',
          choices: [...returnsList.map(returnTransaction => ({ name: `Return ID: ${returnTransaction.id}`, value: returnTransaction.id })), 
          { name: "🔙 Back", value: "back" }],
        },
        ]);

        if (returnToDelete === "back") break;
        await db.deleteReturn(returnToDelete);
        console.log("❌ Return removed.");
        break;
      }
      case 'List Returns': {
        const returns = db.getAllReturns();
        if (returns.length === 0) {
          console.log("No returns found.");
        } else {
          const formattedReturns = returns.map(returnn => ({
            ID: returnn.id,
            Date: returnn.date,
            CustomerID: returnn.customerId,
            ItemsReturned: returnn.itemsReturned.map(item => item.name).join(", ")
          }));
        }
        break;
      }
      case 'Back':
        return;
      }

      break;
    }
    case 'Back':
      return;
  }

  await manageTransactions(db);
}

async function manageReports(db: Database) {
  const { reportAction } = await inquirer.prompt([
    {
      type: 'list',
      name: 'reportAction',
      message: 'Select a report:',
      choices: ['Best-selling item', 'Most in-demand item', 'Client transaction history', 'Back']
    }
  ]);

  switch (reportAction) {
    case 'Best-selling item': {
      const purchases = db.getAllPurchases();
      if (purchases.length === 0) {
        console.log("⚠️ No purchases found.");
        break;
      }

      const counts: Record<number, { name: string; total: number }> = {};
      for (const purchase of purchases) {
        for (const item of purchase.itemsPurchased) {
          // Sumar la cantidad (propiedad quantity) de cada item
          if (!counts[item.id]) {
            counts[item.id] = { name: item.name, total: item.quantity };
          } else {
            counts[item.id].total += item.quantity;
          }
        }
      }

      let bestSelling: { name: string; total: number } | null = null;
      for (const key in counts) {
        if (!bestSelling || counts[key].total > bestSelling.total) {
          bestSelling = counts[key];
        }
      }
      if (bestSelling) {
        console.log(`⭐ Best-selling item: ${bestSelling.name} with ${bestSelling.total} units purchased.`);
      }
      break;
    }
    case 'Most in-demand item': {
      const sales = db.getAllSales();
      if (sales.length === 0) {
        console.log("⚠️ No sales found.");
        break;
      }

      const counts: Record<number, { name: string; total: number }> = {};
      for (const sale of sales) {
        for (const item of sale.itemsSold) {
          if (!counts[item.id]) {
            counts[item.id] = { name: item.name, total: item.quantity };
          } else {
            counts[item.id].total += item.quantity;
          }
        }
      }

      let mostInDemand: { name: string; total: number } | null = null;
      for (const key in counts) {
        if (!mostInDemand || counts[key].total > mostInDemand.total) {
          mostInDemand = counts[key];
        }
      }
      if (mostInDemand) {
        console.log(`🔥 Most in-demand item: ${mostInDemand.name} with ${mostInDemand.total} units sold.`);
      }
      break;
    }

    case 'Client transaction history': {
      const { clientId } = await inquirer.prompt([
        { type: 'number', name: 'clientId', message: 'Enter client ID:' }
      ]);

      const merchant = db.getMerchantByID(clientId);
      const hunter = db.getHunterByID(clientId);

      if (!merchant && !hunter) {
        console.log("⚠️ Client not found.");
        break;
      }

      let transactions: any[] = [];

      if (merchant) {
        const clientPurchases = db.getAllPurchases()
          .filter(purchase => purchase.merchantId === clientId)
          .map(purchase => ({
            Type: 'Purchase',
            ID: purchase.id,
            Date: purchase.date,
            TotalAmount: purchase.totalAmount,
            Items: purchase.itemsPurchased.map(item => item.name).join(", ")
          }));
        const clientReturns = db.getAllReturns()
          .filter(ret => ret.customerId === clientId)
          .map(ret => ({
            Type: 'Return',
            ID: ret.id,
            Date: ret.date,
            TotalAmount: "-",
            Items: ret.itemsReturned.map(item => item.name).join(", ")
          }));
        transactions = transactions.concat(clientPurchases, clientReturns);
      }

      if (hunter) {
        const clientSales = db.getAllSales()
          .filter(sale => sale.hunterId === clientId)
          .map(sale => ({
            Type: 'Sale',
            ID: sale.id,
            Date: sale.date,
            TotalAmount: sale.totalAmount,
            Items: sale.itemsSold.map(item => item.name).join(", ")
          }));
        transactions = transactions.concat(clientSales);
      }

      if (transactions.length === 0) {
        console.log("⚠️ No transactions found for this client.");
      } else {
        console.table(transactions);
      }
      break;
    }

    case 'Back':
      return;
  }

  await manageReports(db);
}