[![CI TESTS](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupj/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupj/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupj/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupj?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupj&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupj)

# Práctica 7. Gestión de inventario de la Posada del Lobo Blanco

**Integrantes**: 
[Oscar Navarro Mesa](https://github.com/oscarnavaarro, "Enlace GitHub")
[Iván Pérez Rodríguez](https://github.com/Ivanperez03, "Enlace GitHub")
[Jonay Faas García](https://github.com/mag4no10, "Enlace GitHub")

**Asignatura**: Desarrollo de Sistemas Informáticos

[Enunciado de la práctica 7](https://ull-esit-inf-dsi-2425.github.io/prct07-witcher-dataModel/)

**The White Wolf Inn** es un sistema de gestión de datos inspirado en el universo de The Witcher.
Este proyecto permite gestionar bienes, comerciantes, cazadores y transacciones (ventas, compras y devoluciones) en una posada.

## Características
- **Gestión de bienes (Goods):**
  - Agregar, listar, buscar, actualizar y eliminar bienes.
  - Ver el stock total de bienes.

- **Gestión de comerciantes (Merchants):**
  - Agregar, listar, buscar, actualizar y eliminar comerciantes.

- **Gestión de cazadores (Hunters):**
  - Agregar, listar, buscar, actualizar y eliminar cazadores.

- **Gestión de transacciones:**
  - Registrar ventas, compras y devoluciones.
  - Listar transacciones realizadas.

- **Generación de reportes:**
  - Reporte del bien más vendido.
  - Reporte del bien más solicitado.
  - Historial de transacciones de un cliente.

## Uso
1. Al iniciar la aplicación, se mostrará el menú principal con las siguientes opciones:
  - **Manage Goods**: Gestiona los bienes disponibles en la posada.
  - **Manage Merchants**: Gestiona los comerciantes asociados.
  - **Manage Hunters**: Gestiona los cazadores que visitan la posada.
  - **Manage Transactions**: Gestiona las ventas, compras y devoluciones.
  - **Reports**: Genera reportes basados en los datos almacenados.
  - **Exit**: Salir de la aplicación.
2. Navega por las opciones usando las flechas del teclado y selecciona una opción con `Enter`.

## Estructuta del Proyecto
```bash
src/
├── characters/         # Clases relacionadas con bienes, comerciantes y cazadores.
├── database/           # Gestión de la base de datos.
├── inquirer/           # Menús interactivos para la gestión de datos.
├── transactions/       # Clases relacionadas con ventas, compras y devoluciones.
└── index.ts            # Punto de entrada principal de la aplicación.
```
