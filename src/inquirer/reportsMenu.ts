import inquirer from "inquirer";
import { Database } from "../database/database.js";

export async function manageReports(db: Database) {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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