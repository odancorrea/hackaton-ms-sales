import { Buyer } from "../../domain/entities/buyer";
import IBuyerRepository from "../../domain/repositories/iBuyer.repository";
import iBuyerUseCases from "./iBuyer.use-cases";

class BuyerUseCases implements iBuyerUseCases {
    constructor (private buyerRepository: IBuyerRepository) {}

    async create(buyerInfo: any): Promise<boolean> {
        try {
            const buyer = new Buyer(buyerInfo.name, buyerInfo.email, buyerInfo.cpf)
            await this.buyerRepository.create(buyer)
            return true
        } catch (error: any) {
            console.log(error.message)
            return false
        }
    }

    async readById(id: number): Promise<any> {
        return await this.buyerRepository.readById(id)
    }

    async read(): Promise<any> {
        return await this.buyerRepository.read()
    }

    async update(id: number, buyerInfo: any): Promise<boolean> {
        let buyer = await this.buyerRepository.readById(id)
        if (buyer) {
            await this.buyerRepository.update(Object.assign(buyer, buyerInfo))
            return true
        }

        return false
    }

    async delete(id: number): Promise<boolean> {
        let buyer = await this.buyerRepository.readById(id)
        if (buyer) {
            await this.buyerRepository.delete(buyer)
            return true
        }

        return false
    }
}

export default BuyerUseCases