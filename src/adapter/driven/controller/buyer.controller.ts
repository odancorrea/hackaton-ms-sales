import {Request, Response} from 'express'
import BuyerUseCases from '../../../core/application/use-cases/buyer.use-cases'
import BuyerRepository from '../../driver/infra/repositories/buyer.repository'

class BuyerController {
    async create(req: Request, res: Response) {
        const buyerRepository = new BuyerRepository()
        const buyerUseCase = new BuyerUseCases(buyerRepository)
        await buyerUseCase.create(req.body)
        res.status(201).send('created')
    }

    async readById(req: Request, res: Response) {
        const buyerRepository = new BuyerRepository()
        const buyerUseCase = new BuyerUseCases(buyerRepository)
        const result = await buyerUseCase.readById(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async read(req: Request, res: Response) {
        const buyerRepository = new BuyerRepository()
        const buyerUseCase = new BuyerUseCases(buyerRepository)
        const result = await buyerUseCase.read()
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async update(req: Request, res: Response) {
        const buyerRepository = new BuyerRepository()
        const buyerUseCase = new BuyerUseCases(buyerRepository)
        const result = await buyerUseCase.update(parseInt(req.params.id), req.body)
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }

    async delete(req: Request, res: Response) {
        const buyerRepository = new BuyerRepository()
        const buyerUseCase = new BuyerUseCases(buyerRepository)
        const result = await buyerUseCase.delete(parseInt(req.params.id))
        result ? res.status(200).send('ok') : res.status(404).send('not found')
    }
}

export default new BuyerController()