import inquirer from "inquirer";
import { Database } from "../database/database.js";
import { Good } from "../characters/good.js";
import { Sale } from "../transactions/sale.js"
import { Purchase } from "../transactions/purchase.js";
import { Return } from "../transactions/return.js";

export async function manageTransactions(db: Database) {
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
        choices: ['Sell Item', 'List Sales', 'Back'],
      },
      ]);

      switch (sellAction) {
        case 'Sell Item': {
          try {
            const newSale = await inquirer.prompt([
            { type: 'number', name: 'hunterID', message: 'Hunter ID making purchase:' },
            { type: 'number', name: 'quantity', message: 'Quantity:' },
            { type: 'number', name: 'goodID', message: 'Good ID:' },
            { type: 'input', name: 'date', message: 'Date: ' }
            ]);

            if (isNaN(newSale.hunterID) || isNaN(newSale.quantity) || isNaN(newSale.goodID) || isNaN(newSale.date)) {
              throw new Error("⚠️ Invalid input: Hunter ID, quantity, good ID and date atributes must be filled.");
            }

            const good = db.getGoodByID(Number(newSale.goodID));
            if (!good) {
              throw new Error("⚠️ Good not found.");
            }
            const hunter = db.getHunterByID(Number(newSale.hunterID));
            if (!hunter) {
              throw new Error("⚠️ Hunter not found.");
            }

            if (newSale.quantity <= 0) {
              throw new Error("⚠️ Quantity must be greater than zero.");
            }

            if (newSale.quantity > good.quantity) {
              throw new Error("⚠️ Not enough stock!");
            }

            console.log(`💰 The price per unit is ${good.value} crowns.`);
            const totalPrice = good.value * newSale.quantity;
      
            const { confirmSale } = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'confirmSale',
                message: `Confirm sale of ${newSale.quantity}x ${good.name} for a total of ${totalPrice} crowns?`,
              },
            ]);
      
            if (!confirmSale) {
              console.log("❌ Sale cancelled.");
              break;
            }

            const sale = new Sale(
              db.getAllSales().length + 1,
              newSale.date,
              Number(newSale.hunterID),
              [new Good(good.id, good.name, good.description, good.material, good.weight, good.value, newSale.quantity)],
              totalPrice
            );

            db.addSale(sale);

            const newQuantity = good.quantity - newSale.quantity;
            if (newQuantity <= 0) {
              db.deleteGood(good.id);
              console.log(`❌ ${good.name} were out of stock and was eliminated from the inventory.`);
            } else {
              db.updateGood(good.id, { quantity: newQuantity });
            }
          } catch (error) {
            if (error instanceof Error) {
              console.error("❌ Error adding sale:", error.message);
              break;
            }
            console.error("❌ Unexpected error adding sale");
          }
          console.log('✅ Sale added');
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
              Total: sale.totalAmount + " crowns"
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
        choices: ['Add a Purchase', 'List Purchases', 'Back'],
      },
      ]);

      switch (purchaseAction) {
        case 'Add a Purchase': {
          try {
            const newPurchase = await inquirer.prompt([
              { type: 'input', name: 'merchantID', message: 'Merchant ID providing the goods:' },
              { type: 'number', name: 'quantity', message: 'Quantity:' },
              { type: 'input', name: 'date', message: 'Date: ' },
              { type: 'number', name: 'goodID', message: 'Good ID:' }
            ]);

            if (isNaN(newPurchase.merchantID) || isNaN(newPurchase.quantity) || isNaN(newPurchase.date) || isNaN(newPurchase.goodID)) {
              throw new Error("⚠️ Invalid input: Merchant ID, quantity, date and good ID atributes must be filled.");
            }

            const good = db.getGoodByID(Number(newPurchase.goodID));
            if (!good) {
              throw new Error("⚠️ Good not found.");
            }
            const merchant = db.getMerchantByID(Number(newPurchase.merchantID));
            if (!merchant) {
              throw new Error("⚠️ Merchant not found.");
            }

            if (newPurchase.quantity <= 0) {
              throw new Error("Quantity must be greater than zero.");
            }

            if (newPurchase.quantity > good.quantity) {
              throw new Error("Not enough stock!");
            }

            console.log(`💰 The market price per unit is ${good.value} crowns.`);
            const totalPrice = good.value * newPurchase.quantity;

            const { confirmPurchase } = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'confirmPurchase',
                message: `Confirm purchase of ${newPurchase.quantity}x ${good.name} from ${db.getMerchantByID(newPurchase.merchantID)?.name} for a total of ${totalPrice} crowns?`,
              },
            ]);
          
            if (!confirmPurchase) {
              console.log("❌ Purchase cancelled.");
              break;
            }

            const purchase = new Purchase(
              db.getAllPurchases().length + 1,
              newPurchase.date,
              Number(newPurchase.merchantID),
              [new Good(good.id, good.name, good.description, good.material, good.weight, good.value, newPurchase.quantity)],
              totalPrice
            );

            db.addPurchase(purchase);

            const newQuantity = good.quantity - newPurchase.quantity;
            db.updateGood(good.id, { quantity: newQuantity });
          } catch (error) {
            if (error instanceof Error) {
              console.error("❌ Error while purchasing an item:", error.message);
              break;
            }
            console.error("❌ Unexpected error while purchasing an item");
          }
          console.log('✅ Purchase added');
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
          try {
            const merchantsList = db.getAllMerchants();
            if (merchantsList.length === 0) {
              console.log("⚠️ No merchants found.");
              break;
            }
          
            const { merchantId } = await inquirer.prompt([
              {
                type: 'list',
                name: 'merchantId',
                message: 'Select the merchant receiving the return:',
                choices: merchantsList.map(merchant => ({
                  name: `${merchant.name} (Type: ${merchant.type}, Location: ${merchant.location})`,
                  value: merchant.id
                })),
              },
            ]);
          
            const goodsList = db.getAllGoods();
            if (goodsList.length === 0) {
              console.log("⚠️ No goods available for return.");
              break;
            }
          
            const { goodId } = await inquirer.prompt([
              {
                type: 'list',
                name: 'goodId',
                message: 'Select the good to return:',
                choices: goodsList.map(good => ({
                  name: `${good.name} (Stock: ${good.quantity}, Price: ${good.value} crowns)`,
                  value: good.id
                })),
              },
            ]);
          
            const good = db.getGoodByID(Number(goodId));
            if (!good) {
              throw new Error("⚠️ Good not found.");
            }
          
            const { quantity } = await inquirer.prompt([
              {
                type: 'number',
                name: 'quantity',
                message: 'Enter quantity to return:',
                validate: (input) => {
                  if (!input || isNaN(input) || input <= 0) throw new Error("⚠️ Quantity must be a valid number greater than zero.");
                  return true;
                },
              },
            ]);
                  
          
            console.log(`💰 The market price per unit is ${good.value} crowns.`);
            const totalRefund = good.value * quantity;
          
            const { date } = await inquirer.prompt([
              {
                type: 'input',
                name: 'date',
                message: 'Enter the return date (YYYY-MM-DD):',
              },
            ]);
          
            const { confirmReturn } = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'confirmReturn',
                message: `Confirm return of ${quantity}x ${good.name} to ${db.getMerchantByID(merchantId)?.name} on ${date} for a total refund of ${totalRefund} crowns?`,
              },
            ]);
          
            if (!confirmReturn) {
              console.log("❌ Return cancelled.");
              break;
            }
          
            const returnTransaction = new Return(
              db.getAllReturns().length + 1,
              date,
              Number(merchantId),
              [new Good(good.id, good.name, good.description, good.material, good.weight, good.value, quantity)]
            );
          
            db.addReturn(returnTransaction);
          
            const newQuantity = good.quantity + quantity;
            db.updateGood(good.id, { quantity: newQuantity });
            console.log(`✅ Return registered: ${quantity}x ${good.name} returned to ${db.getMerchantByID(merchantId)?.name} on ${date}.`);
          } catch (error) {
            if (error instanceof Error) {
              console.error("❌ Error adding a return:", error.message);
              break;
            }
            console.error("❌ Unexpected error adding a return");
          }
          break;
        }
        case 'List Returns': {
          const returns = db.getAllReturns();
          if (returns.length === 0) {
            console.log("⚠️ No returns found.");
          } else {
            const formattedReturns = returns.map(returnn => ({
              ID: returnn.id,
              Date: returnn.date,
              Returner: db.getHunterByID(returnn.customerId)?.name || db.getMerchantByID(returnn.customerId)?.name || "Unknown",
              ItemsReturned: returnn.itemsReturned.map(item => `${item.quantity}x ${item.name}`).join(", "),
            }));
            console.table(formattedReturns);
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