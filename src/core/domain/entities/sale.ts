import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Buyer } from "./buyer"

@Entity()
export class Sale {
    static SALE_STATUS_START: string = 'iniciado'
    static SALE_STATUS_PAID: string = 'pago'
    static SALE_STATUS_CONFIRMED: string = 'confirmado'
    static SALE_STATUS_DONE: string = 'vendido'
    static SALE_STATUS_CANCELED: string = 'cancelado'

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    id_vehicle: number

    @Column()
    payment_code?: string

    @Column()
    date: Date

    @Column()
    status: string

    @ManyToOne(() => Buyer, (buyer) => buyer.sales)
    buyer: Buyer

    constructor (id_vehicle: number, date: Date, status: string, buyer: Buyer) {
        this.id_vehicle = id_vehicle
        this.date = date
        this.status = status
        this.buyer = buyer
    }
}