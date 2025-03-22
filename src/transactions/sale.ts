import { Good } from "../characters/good.js";

/**
 * Representa una venta realizada a un cazador.
 */
export class Sale {
  /**
   * Crea una nueva instancia de la clase `Sale`.
   * @param id - Identificador único de la venta.
   * @param date - Fecha en la que se realizó la venta.
   * @param hunterId - Identificador del cazador que realizó la compra.
   * @param itemsSold - Lista de bienes vendidos.
   * @param totalAmount - Monto total de la venta en coronas.
   */
  constructor(
    public id: number,
    public date: Date,
    public hunterId: number,
    public itemsSold: Good[],
    public totalAmount: number,
  ) {}
}
