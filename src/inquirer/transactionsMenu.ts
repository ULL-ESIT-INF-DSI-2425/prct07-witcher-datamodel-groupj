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
        const newSale = await inquirer.prompt([
        { type: 'number', name: 'hunterId', message: 'Hunter ID making purchase:' },
        { type: 'number', name: 'quantity', message: 'Quantity:' },
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

        if (newSale.quantity <= 0) {
          console.log("Quantity must be greater than zero.");
          break;
        }

        if (newSale.quantity > good.quantity) {
          console.log("Not enough stock!");
          break;
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
          db.getAllSales().length + 1, // Generate a unique ID
          newSale.date,
          Number(newSale.hunterId),
          [new Good(good.id, good.name, good.description, good.material, good.weight, good.value, newSale.quantity)],
          totalPrice
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
        const newPurchase = await inquirer.prompt([
          { type: 'input', name: 'merchantId', message: 'Merchant ID providing the goods:' },
          { type: 'number', name: 'quantity', message: 'Quantity:' },
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

        if (newPurchase.quantity <= 0) {
          console.log("Quantity must be greater than zero.");
          break;
        }

        if (newPurchase.quantity > good.quantity) {
          console.log("Not enough stock!");
          break;
        }

        // Mostrar precio por unidad basado en el inventario
        console.log(`💰 The market price per unit is ${good.value} crowns.`);
        const totalPrice = good.value * newPurchase.quantity;

        // Confirmar la compra
        const { confirmPurchase } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirmPurchase',
            message: `Confirm purchase of ${newPurchase.quantity}x ${good.name} from ${db.getMerchantByID(newPurchase.merchantId)?.name} for a total of ${totalPrice} crowns?`,
          },
        ]);
      
        if (!confirmPurchase) {
          console.log("❌ Purchase cancelled.");
          break;
        }

        const purchase = new Purchase(
          db.getAllPurchases().length + 1, // Generate a unique ID
          newPurchase.date,
          Number(newPurchase.merchantId),
          [new Good(good.id, good.name, good.description, good.material, good.weight, good.value, newPurchase.quantity)],
          totalPrice
        );

        await db.addPurchase(purchase);

        const newQuantity = good.quantity - newPurchase.quantity;
        await db.updateGood(good.id, { quantity: newQuantity });
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
          // Seleccionar el mercader que recibe la devolución
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
        
          // Seleccionar el bien a devolver
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
        
          // Obtener el bien seleccionado
          const good = db.getGoodByID(Number(goodId));
          if (!good) {
            console.log("⚠️ Good not found.");
            break;
          }
        
          // Pedir la cantidad a devolver
          const { quantity } = await inquirer.prompt([
            {
              type: 'number',
              name: 'quantity',
              message: 'Enter quantity to return:',
              validate: (input) => {
                if (!input || isNaN(input) || input <= 0) return "Quantity must be a valid number greater than zero.";
                return true;
              },
            },
          ]);
                
        
          // Mostrar el precio por unidad basado en el inventario
          console.log(`💰 The market price per unit is ${good.value} crowns.`);
          const totalRefund = good.value * quantity;
        
          // Pedir la fecha manualmente
          const { date } = await inquirer.prompt([
            {
              type: 'input',
              name: 'date',
              message: 'Enter the return date (YYYY-MM-DD):',
            },
          ]);
        
          // Confirmación de la devolución
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
        
          // Registrar la devolución
          const returnTransaction = new Return(
            db.getAllReturns().length + 1, // ID único
            date, // Fecha ingresada por el usuario
            Number(merchantId),
            [new Good(good.id, good.name, good.description, good.material, good.weight, good.value, quantity)]
          );
        
          await db.addReturn(returnTransaction);
        
          // Actualizar el stock sumando la cantidad devuelta
          const newQuantity = good.quantity + quantity;
          await db.updateGood(good.id, { quantity: newQuantity });
        
          console.log(`✅ Return registered: ${quantity}x ${good.name} returned to ${db.getMerchantByID(merchantId)?.name} on ${date}.`);
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