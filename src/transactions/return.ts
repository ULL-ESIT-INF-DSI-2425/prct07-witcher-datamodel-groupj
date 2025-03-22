import { Good } from "../characters/good.js";

/**
 * Representa una devolución realizada por un cliente (cazador o comerciante).
 */
export class Return {
  /**
   * Crea una nueva instancia de la clase `Return`.
   * @param id - Identificador único de la devolución.
   * @param date - Fecha en la que se realizó la devolución.
   * @param customerId - Identificador del cliente que realizó la devolución (puede ser un cazador o comerciante).
   * @param itemsReturned - Lista de bienes devueltos.
   */
  constructor(
    public id: number,
    public date: Date,
    public customerId: number,
    public itemsReturned: Good[],
  ) {}
}
