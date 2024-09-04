import { Sale } from "../../../../core/domain/entities/sale";
import ISaleRepository from "../../../../core/domain/repositories/iSale.repository";
import dataSource from "../data-source";

class SaleRepository implements ISaleRepository{
    async create(sale: any): Promise<Sale | boolean> {
        try {
            const saleRepository = dataSource.getDataSource().getRepository(Sale)
            const saleAdded = await saleRepository.save(sale)
            return saleAdded
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async readById(id: number): Promise<Sale | false> {
        try {
            const saleRepository = dataSource.getDataSource().getRepository(Sale)
            return await saleRepository.findOneBy( { id: id } )  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async read(): Promise<Sale[] | false> {
        try {
            const saleRepository = dataSource.getDataSource().getRepository(Sale)
            return await saleRepository.find()  
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async update(sale: Sale): Promise<boolean> {
        try {
            const saleRepository = dataSource.getDataSource().getRepository(Sale)
            await saleRepository.save(sale)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async delete(sale: Sale): Promise<boolean> {
        try {
            const saleRepository = dataSource.getDataSource().getRepository(Sale)
            await saleRepository.delete(sale)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default SaleRepository