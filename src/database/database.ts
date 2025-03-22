import { JSONFilePreset } from "lowdb/node";
import { Good } from "../characters/good.js";
import { Merchant } from "../characters/merchant.js";
import { Hunter } from "../characters/hunter.js";
import { Sale } from "../transactions/sale.js";
import { Purchase } from "../transactions/purchase.js";
import { Return } from "../transactions/return.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Representa el esquema de la base de datos.
 */
type DBSchema = {
  goods: Good[];
  merchants: Merchant[];
  hunters: Hunter[];
  sales: Sale[];
  purchases: Purchase[];
  returns: Return[];
};

/**
 * Datos predeterminados para inicializar la base de datos.
 */
const defaultData: DBSchema = {
  goods: [],
  merchants: [],
  hunters: [],
  sales: [],
  purchases: [],
  returns: [],
};

/**
 * Clase principal para manejar la base de datos.
 */
export class Database {
  /**
   * Instancia de la base de datos manejada por `lowdb`.
   */
  private db!: Awaited<ReturnType<typeof JSONFilePreset<DBSchema>>>;

  /**
   * Guarda los cambios realizados en la base de datos en el archivo JSON.
   * @returns Una promesa que se resuelve cuando los datos se han guardado correctamente.
   */
  private async save(): Promise<void> {
    await this.db.write();
    console.log("✅ Base de datos actualizada.");
  }

  /**
   * Constructor de la clase `Database`.
   */
  constructor() {}

  /**
   * Inicializa la base de datos cargando los datos desde el archivo JSON.
   * @throws Error si ocurre un problema al inicializar la base de datos.
   */
  async init() {
    try {
      const dbPath = path.resolve(__dirname, "../../db.json");
      this.db = await JSONFilePreset<DBSchema>(dbPath, defaultData);
      await this.db.read();
      console.log("📦 Posada del Lobo Blanco.");
    } catch (e) {
      console.error("❌ Error al inicializar la base de datos:", e);
      throw e;
    }
  }

  /**
   * Obtiene todos los bienes de la base de datos.
   * @returns Una lista de bienes.
   */
  getAllGoods(): Good[] {
    return this.db.data.goods;
  }

  /**
   * Obtiene todos los comerciantes de la base de datos.
   * @returns Una lista de comerciantes.
   */
  getAllMerchants(): Merchant[] {
    return this.db.data.merchants;
  }

  /**
   * Obtiene todos los cazadores de la base de datos.
   * @returns Una lista de cazadores.
   */
  getAllHunters(): Hunter[] {
    return this.db.data.hunters;
  }

  /**
   * Busca un bien por su ID.
   * @param id - El ID del bien.
   * @returns El bien encontrado o `undefined` si no existe.
   */
  getGoodByID(id: number): Good | undefined {
    return this.db.data.goods.find((good) => good.id === id);
  }

  /**
   * Busca un comerciante por su ID.
   * @param id - El ID del comerciante.
   * @returns El comerciante encontrado o `undefined` si no existe.
   */
  getMerchantByID(id: number): Merchant | undefined {
    return this.db.data.merchants.find((merchant) => merchant.id === id);
  }

  /**
   * Busca un cazador por su ID.
   * @param id - El ID del cazador.
   * @returns El cazador encontrado o `undefined` si no existe.
   */
  getHunterByID(id: number): Hunter | undefined {
    return this.db.data.hunters.find((hunter) => hunter.id === id);
  }

  /**
   * Busca un bien por su nombre.
   * @param name - El nombre del comerciante.
   * @returns El bien encontrado o `undefined` si no existe.
   */
  getGoodByName(name: string): Good | undefined {
    return this.db.data.goods.find((good) => good.name === name);
  }

  /**
   * Busca un comerciante por su nombre.
   * @param name - El nombre del comerciante.
   * @returns El comerciante encontrado o `undefined` si no existe.
   */
  getMerchantByName(name: string): Merchant | undefined {
    return this.db.data.merchants.find((merchant) => merchant.name === name);
  }

  /**
   * Busca un comerciante por su ID.
   * @param id - El ID del comerciante.
   * @returns El comerciante encontrado o `undefined` si no existe.
   */
  getHunterByName(name: string): Hunter | undefined {
    return this.db.data.hunters.find((hunter) => hunter.name === name);
  }

  /**
   * Busca un bien por su descripción.
   * @param description - La descripción del bien.
   * @returns - El bien encontrado o `undefined` si no existe.
   */
  getGoodByDescription(description: string): Good | undefined {
    return this.db.data.goods.find((good) => good.description === description);
  }

  /**
   * Busca un comerciante por su tipo.
   * @param type - El tipo del comerciante.
   * @returns - El comerciante encontrado o `undefined` si no existe.
   */
  getMerchantByType(type: string): Merchant | undefined {
    return this.db.data.merchants.find((merchant) => merchant.type === type);
  }

  /**
   * Busca un cazador por su raza.
   * @param race - La raza del cazador.
   * @returns - El cazador encontrado o `undefined` si no existe.
   */
  getHunterByRace(race: string): Hunter | undefined {
    return this.db.data.hunters.find((hunter) => hunter.race === race);
  }

  /**
   * Busca un comerciante por su ubicación.
   * @param location - La ubicación del comerciante.
   * @returns - El comerciante encontrado o `undefined` si no existe.
   */
  getMerchantByLocation(location: string): Merchant | undefined {
    return this.db.data.merchants.find((merchant) => merchant.location === location);
  }

  /**
   * Busca un cazador por su ubicación.
   * @param location - La ubicación del cazador.
   * @returns - El cazador encontrado o `undefined` si no existe.
   */
  getHunterByLocation(location: string): Hunter | undefined {
    return this.db.data.hunters.find((hunter) => hunter.location === location);
  }

  /**
   * Agrega un nuevo bien a la base de datos.
   * @param good - El bien a agregar.
   * @throws Error si el objeto `good` es inválido.
   */
  addGood(good: Good): void {
    if (!good || typeof good !== "object") throw new Error("El objeto 'good' es inválido.");
    this.db.data.goods.push(good);
    this.save().catch((e) => console.error("Error al guardar la base de datos:", e));
  }

  /**
   * Agrega un nuevo comerciante a la base de datos.
   * @param merchant - El comerciante a agregar.
   * @throws Error si el objeto `merchant` es inválido.
   */
  addMerchant(merchant: Merchant): void {
    if (!merchant || typeof merchant !== "object")
      throw new Error("El objeto 'merchant' es inválido.");
    this.db.data.merchants.push(merchant);
    this.save().catch((e) => console.error("Error al guardar la base de datos:", e));
  }

  /**
   * Agrega un nuevo cazador a la base de datos.
   * @param hunter - El cazador a agregar.
   * @throws Error si el objeto `hunter` es inválido.
   */
  addHunter(hunter: Hunter): void {
    if (!hunter || typeof hunter !== "object") throw new Error("El objeto 'hunter' es inválido.");
    this.db.data.hunters.push(hunter);
    this.save().catch((e) => console.error("Error al guardar la base de datos:", e));
  }

  /**
   * Actualiza un bien existente en la base de datos.
   * @param id - El ID del bien a actualizar.
   * @param updates - Los campos a actualizar.
   * @throws Error si no se encuentra el bien con el ID especificado.
   */
  updateGood(id: number, updates: Partial<Good>): void {
    const good = this.getGoodByID(id);
    if (!good) throw new Error(`No se encontró un Good con ID ${id}`);
    Object.assign(good, updates);
    this.save().catch((e) => console.error("Error al guardar la base de datos:", e));
  }

  /**
   * Actualiza un comerciante existente en la base de datos.
   * @param id - El ID del comerciante a actualizar.
   * @param updates - Los campos a actualizar.
   * @throws Error si no se encuentra el comerciante con el ID especificado.
   */
  updateMerchant(id: number, updates: Partial<Merchant>): void {
    const merchant = this.getMerchantByID(id);
    if (!merchant) throw new Error(`No se encontró un Merchant con ID ${id}`);
    Object.assign(merchant, updates);
    this.save().catch((e) => console.error("Error al guardar la base de datos:", e));
  }

  /**
   * Actualiza un cazador existente en la base de datos.
   * @param id - El ID del cazador a actualizar.
   * @param updates - Los campos a actualizar.
   * @throws Error si no se encuentra el cazador con el ID especifico.
   */
  updateHunter(id: number, updates: Partial<Hunter>): void {
    const hunter = this.getHunterByID(id);
    if (!hunter) throw new Error(`No se encontró un Hunter con ID ${id}`);
    Object.assign(hunter, updates);
    this.save().catch((e) => console.error("Error al guardar la base de datos:", e));
  }

  /**
   * Elimina un bien de la base de datos.
   * @param id - El ID del bien a eliminar
   */
  deleteGood(id: number): void {
    this.db.data.goods = this.db.data.goods.filter((good) => good.id !== id);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Elimina un comerciante de la base de datos.
   * @param id - El ID del comerciante a eliminar.
   */
  deleteMerchant(id: number): void {
    this.db.data.merchants = this.db.data.merchants.filter((merchant) => merchant.id !== id);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Elimina un cazador de la base de datos.
   * @param id - El ID del cazador a eliminar.
   */
  deleteHunter(id: number): void {
    this.db.data.hunters = this.db.data.hunters.filter((hunter) => hunter.id !== id);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Agrega una nueva venta a la base de datos.
   * @param sale - La venta a agregar.
   * @throws Error si el objeto `sale` es inválido.
   */
  addSale(sale: Sale): void {
    if (!sale || typeof sale !== "object") throw new Error("El objeto 'sale' es inválido.");
    this.db.data.sales.push(sale);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Agrega una nueva compra a la base de datos.
   * @param purchase - La compra a agregar.
   * @throws Error si el objeto `purchase` es inválido.
   */
  addPurchase(purchase: Purchase): void {
    if (!purchase || typeof purchase !== "object")
      throw new Error("El objeto 'purchase' es inválido.");
    this.db.data.purchases.push(purchase);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Agrega una nueva devolución a la base de datos.
   * @param returnn - La devolución a agregar.
   * @throws Error si el objeto `returnn` es inválido.
   */
  addReturn(returnn: Return): void {
    if (!returnn || typeof returnn !== "object")
      throw new Error("El objeto 'returnn' es inválido.");
    this.db.data.returns.push(returnn);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Elimina una venta de la base de datos.
   * @param id - El ID de la venta a eliminar.
   */
  deleteSale(id: number): void {
    this.db.data.sales = this.db.data.sales.filter((sale) => sale.id !== id);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Elimina una compra de la base de datos.
   * @param id - El ID de la compra a eliminar.
   */
  deletePurchase(id: number): void {
    this.db.data.purchases = this.db.data.purchases.filter((purchase) => purchase.id !== id);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Elimina una devolución de la base de datos.
   * @param id - El ID de la devolución a eliminar.
   */
  deleteReturn(id: number): void {
    this.db.data.returns = this.db.data.returns.filter((returnn) => returnn.id !== id);
    this.save().catch((error) => console.error("Error al guardar la base de datos:", error));
  }

  /**
   * Obtiene todas las ventas de la base de datos.
   * @returns Una lista de ventas.
   */
  getAllSales(): Sale[] {
    return this.db.data.sales;
  }

  /**
   * Obtiene todas las compras de la base de datos.
   * @returns Una lista de compras.
   */
  getAllPurchases(): Purchase[] {
    return this.db.data.purchases;
  }

  /**
   * Obtiene todas las devoluciones de la base de datos.
   * @returns Una lista de devoluciones.
   */
  getAllReturns(): Return[] {
    return this.db.data.returns;
  }
}
