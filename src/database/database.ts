import { JSONFilePreset } from "lowdb/node";
import { Good } from "../characters/good.js";
import { Merchant } from "../characters/merchant.js";
import { Hunter } from "../characters/hunter.js";
import { Sale } from "../transactions/sale.js"
import { Purchase } from "../transactions/purchase.js";
import { Return } from "../transactions/return.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type DBSchema = {
    goods: Good[];
    merchants: Merchant[];
    hunters: Hunter[];
    sales: Sale[];
    purchases: Purchase[];
    returns: Return[];
};

const defaultData: DBSchema = { goods: [],  merchants: [], hunters: [], sales: [], purchases: [], returns: []};

export class Database { //TODO to document
    private db!: Awaited<ReturnType<typeof JSONFilePreset<DBSchema>>>;
    private async save(): Promise<void> {
        await this.db.write();
        console.log("✅ Base de datos actualizada.");
    }

    constructor() {}
    
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

    getAllGoods(): Good[] {
        return this.db.data.goods;
    }

    getAllMerchants(): Merchant[] { 
        return this.db.data.merchants; 
    }

    getAllHunters(): Hunter[] { 
        return this.db.data.hunters; 
    }

    getGoodByID(id: number): Good | undefined {
        return this.db.data.goods.find(good => good.id === id);
    }

    getMerchantByID(id: number): Merchant | undefined {
        return this.db.data.merchants.find(merchant => merchant.id === id);
    }

    getHunterByID(id: number): Hunter | undefined {
        return this.db.data.hunters.find(hunter => hunter.id === id);
    }

    getGoodByName(name: string): Good | undefined {
        return this.db.data.goods.find(good => good.name === name);
    }

    getMerchantByName(name: string): Merchant | undefined {
        return this.db.data.merchants.find(merchant => merchant.name === name);
    }

    getHunterByName(name: string): Hunter | undefined {
        return this.db.data.hunters.find(hunter => hunter.name === name);
    }

    getGoodByDescription(description: string): Good | undefined {
        return this.db.data.goods.find(good => good.description === description);
    }
    
    getMerchantByType(type: string): Merchant | undefined {
        return this.db.data.merchants.find(merchant => merchant.type === type);
    }

    getHunterByRace(race: string): Hunter | undefined {
        return this.db.data.hunters.find(hunter => hunter.race === race);
    }

    getMerchantByLocation(location: string): Merchant | undefined {
        return this.db.data.merchants.find(merchant => merchant.location === location);
    }

    getHunterByLocation(location: string): Hunter | undefined {
        return this.db.data.hunters.find(hunter => hunter.location === location);
    }

    addGood(good: Good): void {
        if (!good || typeof good !== "object") throw new Error("El objeto 'good' es inválido.");
        this.db.data.goods.push(good);
        this.save().catch(e => console.error("Error al guardar la base de datos:", e));
    }

    addMerchant(merchant: Merchant): void {
        if (!merchant || typeof merchant !== "object") throw new Error("El objeto 'merchant' es inválido.");
        this.db.data.merchants.push(merchant);
        this.save().catch(e => console.error("Error al guardar la base de datos:", e));
    }

    addHunter(hunter: Hunter): void {
        if (!hunter || typeof hunter !== "object") throw new Error("El objeto 'hunter' es inválido.");
        this.db.data.hunters.push(hunter);
        this.save().catch(e => console.error("Error al guardar la base de datos:", e));
    }

    updateGood(id: number, updates: Partial<Good>): void {
        const good = this.getGoodByID(id);
        if (!good) throw new Error(`No se encontró un Good con ID ${id}`);
        Object.assign(good, updates);
        this.save().catch(e => console.error("Error al guardar la base de datos:", e));
    }

    updateMerchant(id: number, updates: Partial<Merchant>): void {
        const merchant = this.getMerchantByID(id);
        if (!merchant) throw new Error(`No se encontró un Merchant con ID ${id}`);
        Object.assign(merchant, updates);
        this.save().catch(e => console.error("Error al guardar la base de datos:", e));
    }

    updateHunter(id: number, updates: Partial<Hunter>): void {
        const hunter = this.getHunterByID(id);
        if (!hunter) throw new Error(`No se encontró un Hunter con ID ${id}`);
        Object.assign(hunter, updates);
        this.save().catch(e => console.error("Error al guardar la base de datos:", e));
    }

    deleteGood(id: number): void {
        this.db.data.goods = this.db.data.goods.filter(good => good.id !== id);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }
    deleteMerchant(id: number): void {
        this.db.data.merchants = this.db.data.merchants.filter(merchant => merchant.id !== id);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }
    deleteHunter(id: number): void {
        this.db.data.hunters = this.db.data.hunters.filter(hunter => hunter.id !== id);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }

    addSale(sale: Sale): void {
        if (!sale || typeof sale !== "object") throw new Error("El objeto 'sale' es inválido.");
        this.db.data.sales.push(sale);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }

    addPurchase(purchase: Purchase): void {
        if (!purchase || typeof purchase !== "object") throw new Error("El objeto 'purchase' es inválido.");
        this.db.data.purchases.push(purchase);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }

    addReturn(returnn: Return): void {
        if (!returnn || typeof returnn !== "object") throw new Error("El objeto 'returnn' es inválido.");
        this.db.data.returns.push(returnn);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }

    deleteSale(id: number): void {
        this.db.data.sales = this.db.data.sales.filter(sale => sale.id !== id);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }

    deletePurchase(id: number): void {
        this.db.data.purchases = this.db.data.purchases.filter(purchase => purchase.id !== id);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }

    deleteReturn(id: number): void {
        this.db.data.returns = this.db.data.returns.filter(returnn => returnn.id !== id);
        this.save().catch(error => console.error("Error al guardar la base de datos:", error));
    }

    getAllSales(): Sale[] {
        return this.db.data.sales;
    }

    getAllPurchases(): Purchase[] {
        return this.db.data.purchases;
    }
    
    getAllReturns(): Return[] {
        return this.db.data.returns;
    }
}