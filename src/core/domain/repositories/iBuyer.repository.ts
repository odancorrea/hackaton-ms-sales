import { Buyer } from "../entities/buyer";

export default interface IBuyerRepository {
    create(buyerInfo: any): Promise<boolean>,
    readById(id: number): Promise<Buyer | false>,
    read(): Promise<Buyer[] | false>,
    update(buyer: Buyer): Promise<boolean>,
    delete(buyer: Buyer): Promise<boolean>
}