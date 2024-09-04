import amqp from 'amqplib/callback_api'
import ISaleQueue from '../../../core/domain/repositories/iSale.queue'
import saleController from '../../driven/controller/sale.controller'

class Queue implements ISaleQueue {
    channel: amqp.Channel | undefined

    async init () {
        amqp.connect(process.env.QUEUE_URI || 'amqp://localhost:5672', (error0: any, connection: any) => {
            if (error0) throw error0
            connection.createChannel((error1: any, channel: any) => {
                if (error1) throw error1
                this.channel = channel
                channel.assertQueue(process.env.RESERVATION_PENDING || 'reserva_pendente', { durable: false })
                channel.assertQueue(process.env.RESERVATION_ERROR || 'reserva_erro', { durable: false })
                channel.assertQueue(process.env.RESERVATION_EXPIRED || 'reserva_expirado', { durable: false })
                channel.assertQueue(process.env.PAYMENT_ERROR || 'pagamento_erro', { durable: false })
                channel.assertQueue(process.env.PAYMENT_EXPIRED || 'pagamento_expirado', { durable: false })
                channel.assertQueue(process.env.PAYMENT_APPROVED || 'pagamento_aprovado', { durable: false })
                
                channel.consume(process.env.RESERVATION_ERROR || 'reserva_erro', saleController.cancel, { noAck: true})
                channel.consume(process.env.RESERVATION_EXPIRED || 'reserva_expirado', saleController.cancel, { noAck: true})
                channel.consume(process.env.PAYMENT_ERROR || 'pagamento_erro', saleController.cancel, { noAck: true})
                channel.consume(process.env.PAYMENT_EXPIRED || 'pagamento_expirado', saleController.cancel, { noAck: true})
                channel.consume(process.env.PAYMENT_APPROVED || 'pagamento_aprovado', saleController.confirm, { noAck: true})
            })
        })
    }

    async sendToQueue (message: string, queue: string) {
        this.channel?.sendToQueue(queue, Buffer.from(message))
    }

    ack (message: any) {
        try {
            this.channel?.ack(message)
        } catch (e: any) {
            console.log(e.message)
        }
    }
      
    nack (message: any) {
        try {
            this.channel?.nack(message)
        } catch (e: any) {
            console.log(e.message)
        }
    }
}

export default new Queue()