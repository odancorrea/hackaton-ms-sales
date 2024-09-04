import { Buyer } from "../../../../core/domain/entities/buyer";
import IBuyerRepository from "../../../../core/domain/repositories/iBuyer.repository";
import dataSource from "../data-source";

class BuyerRepository implements IBuyerRepository{
    async create(buyer: any): Promise<boolean> {
        try {
            const buyerRepository = dataSource.getDataSource().getRepository(Buyer)
            await buyerRepository.save(buyer)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async readById(id: number): Promise<Buyer | false> {
        try {
            const buyerRepository = dataSource.getDataSource().getRepository(Buyer)
            return await buyerRepository.findOneBy( { id: id } )  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async read(): Promise<Buyer[] | false> {
        try {
            const buyerRepository = dataSource.getDataSource().getRepository(Buyer)
            return await buyerRepository.find()  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async update(buyer: Buyer): Promise<boolean> {
        try {
            const buyerRepository = dataSource.getDataSource().getRepository(Buyer)
            await buyerRepository.save(buyer)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async delete(buyer: Buyer): Promise<boolean> {
        try {
            const buyerRepository = dataSource.getDataSource().getRepository(Buyer)
            await buyerRepository.delete(buyer)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default BuyerRepository