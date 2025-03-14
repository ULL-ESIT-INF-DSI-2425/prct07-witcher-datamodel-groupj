/**
 * Representa un bien (objeto) de la Posada del Lobo Blanco
 */
export class Good { //TODO to document
  /**
   * @param id - Identificador único del bien.
   * @param nombre - Nombre del bien.
   * @param descripcion - Descripción que detalla el origen y utilidad.
   * @param material - Material principal del bien.
   * @param peso - Peso del bien.
   * @param valor - Valor en coronas.
   */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public material: string,
    public weight: number,
    public price: number
  ) {}
}