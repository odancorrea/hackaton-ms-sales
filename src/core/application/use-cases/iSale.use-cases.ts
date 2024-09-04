export default interface iSaleUseCases {
  create(saleInfo: any): Promise<boolean>,
  readById(id: number): Promise<any> ,
  read(id: number): Promise<any> ,
  update(id: number, saleInfo: any): Promise<boolean>,
  delete(id: number): Promise<boolean>,
  cancel(id: number): Promise<boolean>,
  confirm(id: number): Promise<boolean>
}