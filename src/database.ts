import { JSONFilePreset } from "lowdb/node";
import { Good } from "./good.js";
import { Merchant } from "./merchant.js";
import { Hunter } from "./hunter.js";


type DBSchema = {
    goods: Good[];
    merchants: Merchant[];
    hunters: Hunter[];
};
const defaultData: DBSchema = { goods: [],  merchants: [], hunters: []};

export class Database { //TODO to document
    private db!: Awaited<ReturnType<typeof JSONFilePreset<DBSchema>>>;
    private async save(): Promise<void> {
        await this.db.write();
        console.log("✅ Base de datos actualizada.");
    }

    constructor() {}

    async init() {
        this.db = await JSONFilePreset<DBSchema>('db.json', defaultData);
        console.log("📦 Base de datos inicializada.");
    }

    getAllGoods(): Good[] { return this.db.data.goods; }
    getAllMerchants(): Merchant[] { return this.db.data.merchants; }
    getAllHunters(): Hunter[] { return this.db.data.hunters; }

    //TODO por hacer un sort del output de cada getALlGoods
    //getAllGoodsSortedAlphUp(): Good[] { return this.getAllGoods; }
    //getAllGoodsSortedAlphDown(): Good[] { return this.getAllGoods; }
    //getAllGoodsSortedCrownsUp(): Good[] { return this.getAllGoods; }
    //getAllGoodsSortedCrownsDown(): Good[] { return this.getAllGoods; }

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
}