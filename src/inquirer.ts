import inquirer from "inquirer";
import { Good } from "./good.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";

//TODO This is in local. To connect with the DB
let goods: Good[] = [];
let merchants: Merchant[] = [];
let hunters: Hunter[] = [];

export async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want:',
      choices: ['Manage Goods', 'Manage Merchants', 'Manage Hunters', 'Exit'],
    },
  ]);

  switch (action) {
    case 'Gestionar Bienes':
      await manageGoods();
      break;
    case 'Gestionar Mercaderes':
      await manageMerchants();
      break;
    case 'Gestionar Clientes':
      await manageHunters();
      break;
    case 'Salir':
      console.log('Bye');
      return;
  }

  await mainMenu();
}

async function manageGoods() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action',
      choices: ['Add a Good', 'List Goods', 'Delete a Good', 'Back'],
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
      ]);
      //goods.push({ id: goods.length + 1, ...newGood }); //TODO To Fix
      console.log('Good added');
      break;
    }
    case 'List Goods':
      console.table(goods); //TODO Parse an inquirer interface to select how the user would like to list the goods
      break;
    case 'Eliminar Bien': {
      const { id } = await inquirer.prompt([
        { type: 'number', name: 'id', message: 'Good\'s ID to remove:' },
      ]);
      goods = goods.filter(g => g.id !== id);
      console.log('Good safely removed');
      break;
    }
    case 'Back':
      return;
  }
  await manageGoods();
}

async function manageMerchants() {
  //TODO
  await manageMerchants();
}

async function manageHunters() {
  //TODO
  await manageHunters();
}