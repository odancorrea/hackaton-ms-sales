import {Request, Response} from 'express'
import SaleUseCases from '../../../core/application/use-cases/sale.use-cases'
import Http from '../../driver/http/http'
import BuyerRepository from '../../driver/infra/repositories/buyer.repository'
import SaleRepository from '../../driver/infra/repositories/sale.repository'
import queue from '../../driver/queue/queue'

class SaleController {
    async create(req: Request, res: Response) {
        const saleRepository = new SaleRepository()
        const buyerRepository = new BuyerRepository()
        const http = new Http()
        const saleUseCase = new SaleUseCases(saleRepository, buyerRepository, queue, http)
        await saleUseCase.create(req.body)
        res.status(201).send('created')
    }

    async readById(req: Request, res: Response) {
        const saleRepository = new SaleRepository()
        const buyerRepository = new BuyerRepository()
        const http = new Http()
        const saleUseCase = new SaleUseCases(saleRepository, buyerRepository, queue, http)
        const result = await saleUseCase.readById(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async read(req: Request, res: Response) {
        const saleRepository = new SaleRepository()
        const buyerRepository = new BuyerRepository()
        const http = new Http()
        const saleUseCase = new SaleUseCases(saleRepository, buyerRepository, queue, http)
        const result = await saleUseCase.read()
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async update(req: Request, res: Response) {
        const saleRepository = new SaleRepository()
        const buyerRepository = new BuyerRepository()
        const http = new Http()
        const saleUseCase = new SaleUseCases(saleRepository, buyerRepository, queue, http)
        const result = await saleUseCase.update(parseInt(req.params.id), req.body)
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async delete(req: Request, res: Response) {
        const saleRepository = new SaleRepository()
        const buyerRepository = new BuyerRepository()
        const http = new Http()
        const saleUseCase = new SaleUseCases(saleRepository, buyerRepository, queue, http)
        const result = await saleUseCase.delete(parseInt(req.params.id))
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async cancel(req: any) {
        try {
            const item = JSON.parse(req.content)
            const saleRepository = new SaleRepository()
            const buyerRepository = new BuyerRepository()
            const http = new Http()
            const saleUseCase = new SaleUseCases(saleRepository, buyerRepository, queue, http)
            await saleUseCase.cancel(item.id)
            queue.ack(req)
        } catch (error: any) {
            console.log(error.message)
            queue.nack(req)
        }
    }

    async confirm(req: any) {
        try {
            const item = JSON.parse(req.content)
            const saleRepository = new SaleRepository()
            const buyerRepository = new BuyerRepository()
            const http = new Http()
            const saleUseCase = new SaleUseCases(saleRepository, buyerRepository, queue, http)
            await saleUseCase.confirm(item.id)
            queue.ack(req)
        } catch (error: any) {
            console.log(error.message)
            queue.nack(req)
        }
    }
}

export default new SaleController()