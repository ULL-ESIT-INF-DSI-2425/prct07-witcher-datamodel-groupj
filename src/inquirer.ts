import inquirer from 'inquirer';

export async function mainMenu() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Seleccione una acción:',
        choices: [
          'Gestionar bienes',
          'Gestionar mercaderes',
          'Gestionar clientes',
          'Salir'
        ]
      }
    ]);

    switch (action) {
      case 'Gestionar bienes':
        await manageGoods();
        break;
      case 'Gestionar mercaderes':
        await manageMerchants();
        break;
      case 'Gestionar clientes':
        await manageClients();
        break;
      case 'Salir':
        console.log('Saliendo del sistema...');
        return;
    }
  }
}

async function manageGoods() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Seleccione una acción para los bienes:',
      choices: ['Añadir bien', 'Eliminar bien', 'Modificar bien', 'Consultar bienes', 'Volver']
    }
  ]);

  console.log(`Acción seleccionada: ${action}`);
}

async function manageMerchants() {
  console.log('Funcionalidad para gestionar mercaderes...');
}

async function manageClients() {
  console.log('Funcionalidad para gestionar clientes...');
}
