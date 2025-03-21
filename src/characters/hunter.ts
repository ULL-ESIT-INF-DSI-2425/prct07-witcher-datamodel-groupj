/**
 * Representa un cliente (objeto) de la Posada del Lobo Blanco
 */
export class Hunter { 
  /**
   * @param id - Identificador unico del cliente
   * @param name - Nombre del cliente.
   * @param race - Raza del cliente
   * @param location - Ubicacion del cliente
 */
  constructor(
    public id: number,
    public name: string,
    public race: string,
    public location: string
  ) {}
}