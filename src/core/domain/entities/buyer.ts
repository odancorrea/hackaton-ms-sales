import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Sale } from "./sale"

@Entity()
export class Buyer {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    cpf: string

    @OneToMany(() => Sale, (sale: { client: any }) => sale.client, { cascade: true })
    sales?: Sale[]

    constructor (name: string, email: string, cpf: string) {
        this.name = name
        this.email = email
        this.cpf = cpf
    }
}