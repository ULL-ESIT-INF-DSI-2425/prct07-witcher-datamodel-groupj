/**
 * Representa un cliente (objeto) de la Posada del Lobo Blanco
 */
export class Cliente {
    /**
   * @param id - Identificador único del bien. Unique good's identifier
   * @param nombre - Nombre del bien.
   * @param breed - Descripción que detalla el origen y utilidad.
   * @param material - Material principal del bien.
   * @param peso - Peso del bien.
   * @param valor - Valor en coronas.
   */
    constructor(
        public id: number,
        public name: string,
        public race: string,
        public location: string
    ) {}
}