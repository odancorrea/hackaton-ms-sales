import { Buyer } from "../../../core/domain/entities/buyer"
import { Sale } from "../../../core/domain/entities/sale"
import iDrivenAdapter from "../../driven/iDriven.adapter"
import { DataSource } from "typeorm"

class PgDataSource implements iDrivenAdapter {    
    appDataSource: any
    
    constructor() {
        this.appDataSource = new DataSource({
            type: "postgres",
            host: process.env.DATABASE_URI || "localhost",
            port: 5432,
            username: process.env.DATABASE_USERNAME || "root",
            password: process.env.DATABASE_PASSWORD || "strong_password",
            database: "vehicle-sales",
            synchronize: true,
            logging: true,
            entities: [Buyer, Sale],
            subscribers: [],
            migrations: [],
        })
    }

    async init() {
        await this.appDataSource.initialize()
        console.log('Db Connected')
    }

    getDataSource() {
        return this.appDataSource
    }
}

export default new PgDataSource()
