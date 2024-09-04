import { Sale } from "../entities/sale";

export default interface ISaleRepository {
    create(saleInfo: any): Promise<Sale | boolean>,
    readById(id: number): Promise<Sale | false>,
    read(): Promise<Sale[] | false>,
    update(sale: Sale): Promise<boolean>,
    delete(sale: Sale): Promise<boolean>
}