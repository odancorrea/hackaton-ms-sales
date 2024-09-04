export default interface iBuyerUseCases {
  create(buyerInfo: any): Promise<boolean>,
  readById(id: number): Promise<any> ,
  read(): Promise<any>,
  update(id: number, buyerInfo: any): Promise<boolean>,
  delete(id: number): Promise<boolean>
}