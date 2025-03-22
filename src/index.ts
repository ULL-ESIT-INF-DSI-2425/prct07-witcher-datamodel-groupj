import { mainMenu } from "./inquirer/inquirer.js";
import { Database } from "./database/database.js";

/**
 * Punto de entrada principal de la aplicación.
 * Inicializa la base de datos y muestra el menú principal.
 */
async function main(): Promise<void> {
  try {
    const db = new Database();

    /**
     * Inicializa la base de datos cargando los datos desde el archivo JSON.
     */
    await db.init();

    /**
     * Muestra el menú principal de la aplicación.
     * Permite al usuario navegar entre las diferentes opciones.
     */
    await mainMenu(db);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error during runtime:", error.message);
      return;
    }
    console.error("❌ Unexpected error during runtime");
  }
}

/**
 * Ejecuta la función principal `main`.
 */
main();
