import { Sale } from "../../domain/entities/sale";
import IBuyerRepository from "../../domain/repositories/iBuyer.repository";
import IHttp from "../../domain/repositories/iHttp";
import ISaleQueue from "../../domain/repositories/iSale.queue";
import ISaleRepository from "../../domain/repositories/iSale.repository";
import iSaleUseCases from "./iSale.use-cases";

class SaleUseCases implements iSaleUseCases {
    constructor (
        private saleRepository: ISaleRepository,
        private buyerRepository: IBuyerRepository,
        private queue: ISaleQueue,
        private http: IHttp
    ) {}

    async create(saleInfo: any): Promise<boolean> {
        try {
            const buyer = await this.buyerRepository.readById(saleInfo.buyer_id)
            if (buyer) {
                const sale = new Sale(saleInfo.id_vehicle, new Date(), Sale.SALE_STATUS_START, buyer)
                const saleAdded = await this.saleRepository.create(sale)
                this.queue.sendToQueue(JSON.stringify(saleAdded), process.env.RESERVATION_PENDING || 'reserva_pendente')
                return true
            } else return false
        } catch (error: any) {
            console.log(error.message)
            return false
        }
    }

    async readById(id: number): Promise<any> {
        return await this.saleRepository.readById(id)
    }

    async read(): Promise<any> {
        return await this.saleRepository.read()
    }

    async update(id: number, saleInfo: any): Promise<boolean> {
        let sale = await this.saleRepository.readById(id)
        if (sale) {
            await this.saleRepository.update(Object.assign(sale, saleInfo))
            return true
        }

        return false
    }

    async delete(id: number): Promise<boolean> {
        let sale = await this.saleRepository.readById(id)
        if (sale) {
            await this.saleRepository.delete(sale)
            return true
        }

        return false
    }

    async cancel(id: number): Promise<boolean> {
        let sale = await this.saleRepository.readById(id)
        if (sale) {
            await this.saleRepository.update(Object.assign(sale, { status: Sale.SALE_STATUS_CANCELED }))
            this.http.put(`${process.env.STOCK_MS}/stock/${sale.id_vehicle}`, { status: 'disponivel' })
            return true
        }

        return false
    }

    async confirm(id: number): Promise<boolean> {
        let sale = await this.saleRepository.readById(id)
        if (sale) {
            await this.saleRepository.update(Object.assign(sale, { status: Sale.SALE_STATUS_CONFIRMED }))
            this.http.put(`${process.env.STOCK_MS}/stock/${sale.id_vehicle}`, { status: 'vendido' })
            return true
        }

        return false
    }
}

export default SaleUseCases