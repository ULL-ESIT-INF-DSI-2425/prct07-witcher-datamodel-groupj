/**
 * Representa un bien (objeto) de la Posada del Lobo Blanco
 */
export class Good {
  /**
   * @param id - Identificador único del bien.
   * @param name - Nombre del bien.
   * @param description - Descripción que detalla el origen y utilidad.
   * @param material - Material principal del bien.
   * @param weight - Peso del bien.
   * @param value - Valor en coronas.
   * @param quantity - cantidades de este bien en el stock
   */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public material: string,
    public weight: number,
    public value: number,
    public quantity: number
  ) {}
}