import { Good } from "../characters/good.js";

/**
 * Representa una compra realizada por un comerciante.
 */
export class Purchase {
  /**
   * Crea una nueva instancia de la clase `Purchase`.
   * @param id - Identificador único de la compra.
   * @param date - Fecha en la que se realizó la compra.
   * @param merchantId - Identificador del comerciante que realizó la compra.
   * @param itemsPurchased - Lista de bienes comprados.
   * @param totalAmount - Monto total de la compra en coronas.
   */
  constructor(
    public id: number,
    public date: Date,
    public merchantId: number,
    public itemsPurchased: Good[],
    public totalAmount: number,
  ) {}
}
