export default interface ISaleQueue {
  sendToQueue(message: string, queue: string): void
  ack (message: any): void
  nack (message: any): void
}