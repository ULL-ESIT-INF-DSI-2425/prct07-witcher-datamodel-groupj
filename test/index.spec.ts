import { describe, test, expect } from 'vitest';
import { Saludar } from "../src/index";

describe('Saludar', () => {
  test('debería retornar el saludo proporcionado', () => {
    expect(Saludar('Hola')).toBe('Hola');
    expect(Saludar('Buenos días')).toBe('Buenos días');
    expect(Saludar('Hello')).toBe('Hello');
  });

  test('debería retornar una cadena vacía si se pasa una cadena vacía', () => {
    expect(Saludar('')).toBe('');
  });

  test('debería manejar espacios en el saludo', () => {
    expect(Saludar('  Hola  ')).toBe('  Hola  ');
  });
});
