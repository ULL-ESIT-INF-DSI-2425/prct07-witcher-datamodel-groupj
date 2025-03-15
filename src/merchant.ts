/**
 * Representa un mercader de bienes
 */
export class Merchant {
  /**
   * @param id - Identificador del mercader
   * @param name - Nombre del mercader
   * @param type - Tipo de mercader (su especialidad)
   * @param location - Ubicacion del mercader
   */
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public location: string
  ) {}
}