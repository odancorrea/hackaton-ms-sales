import { Express } from "express-serve-static-core";
import iDrivenAdapter from "../iDriven.adapter";
import express from "express"
import application from "../controller/application.controller";
import buyerController from "../controller/buyer.controller";
import saleController from "../controller/sale.controller";

class Server implements iDrivenAdapter{
    app: Express
    
    constructor(private port: string) {
        this.app = express()
    }

    async init(): Promise<void> {
        this.setMiddlewares()
        this.setRoutes()
        await this.start()
    }

    setMiddlewares() {
        this.app.use(express.json())
    }

    setRoutes() {
        //application
        this.app.get('/ping', application.ping)
        //buyer
        this.app.post('/buyer', buyerController.create)
        this.app.get('/buyer/:id', buyerController.readById)
        this.app.get('/buyer', buyerController.read)
        this.app.put('/buyer/:id', buyerController.update)
        this.app.delete('/buyer/:id', buyerController.delete)
        //sale
        this.app.post('/sale', saleController.create)
        this.app.get('/sale/:id', saleController.readById)
        this.app.get('/sale', saleController.read)
        this.app.put('/sale/:id', saleController.update)
        this.app.delete('/sale/:id', saleController.delete)
    }

    async start(): Promise<void> {
        this.app.listen(this.port, () => { console.log(`Server running at port ${process.env.PORT}`) })
    }
}

export default new Server(process.env.PORT || '3031')