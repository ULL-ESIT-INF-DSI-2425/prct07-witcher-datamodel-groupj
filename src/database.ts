import { JSONFilePreset } from "lowdb/node";
import { Good } from "./good.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";
import { Sale, Purchase, Return } from "./transaction.js"
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
        const dbPath = path.resolve(__dirname, "../db.json");
        this.db = await JSONFilePreset<DBSchema>(dbPath, defaultData);
        await this.db.read();
        console.log("📦 Posada del Lobo Blanco.");
    }

    getAllGoods(): Good[] {
        return this.db.data.goods;
    }
    getAllMerchants(): Merchant[] { return this.db.data.merchants; }
    getAllHunters(): Hunter[] { return this.db.data.hunters; }

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
        this.db.data.goods.push(good);
        this.save();
    }
    addMerchant(merchant: Merchant): void {
        this.db.data.merchants.push(merchant);
        this.save();
    }
    addHunter(hunter: Hunter): void {
        this.db.data.hunters.push(hunter);
        this.save();
    }

    updateGood(id: number, updates: Partial<Good>): void {
        const good = this.getGoodByID(id);
        if (good) {
            Object.assign(good, updates);
            this.save();
        }
    }
    updateMerchant(id: number, updates: Partial<Merchant>): void {
        const merchant = this.getMerchantByID(id);
        if (merchant) {
            Object.assign(merchant, updates);
            this.save();
        }
    }
    updateHunter(id: number, updates: Partial<Hunter>): void {
        const hunter = this.getHunterByID(id);
        if (hunter) {
            Object.assign(hunter, updates);
            this.save();
        }
    }

    deleteGood(id: number): void {
        this.db.data.goods = this.db.data.goods.filter(good => good.id !== id);
        this.save();
    }
    deleteMerchant(id: number): void {
        this.db.data.merchants = this.db.data.merchants.filter(merchant => merchant.id !== id);
        this.save();
    }
    deleteHunter(id: number): void {
        this.db.data.hunters = this.db.data.hunters.filter(hunter => hunter.id !== id);
        this.save();
    }

    addSale(sale: Sale): void {
        this.db.data.sales.push(sale);
        this.save();
    }

    addPurchase(purchase: Purchase): void {
        this.db.data.purchases.push(purchase);
        this.save();
    }

    addReturn(returnn: Return): void {
        this.db.data.returns.push(returnn);
        this.save();
    }

    deleteSale(id: number): void {
        this.db.data.sales = this.db.data.sales.filter(sale => sale.id !== id);
        this.save();
    }

    deletePurchase(id: number): void {
        this.db.data.purchases = this.db.data.purchases.filter(purchase => purchase.id !== id);
        this.save();
    }

    deleteReturn(id: number): void {
        this.db.data.returns = this.db.data.returns.filter(returnn => returnn.id !== id);
        this.save();
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