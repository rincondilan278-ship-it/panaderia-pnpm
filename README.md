# Panadería — Expo + React Native + pnpm

Aplicación inicial para gestionar una panadería. La pantalla principal muestra un resumen y accesos a **Productos, Ingredientes, Pedidos y Proveedores**.

## Requisitos
- Node.js LTS
- pnpm
- Expo Go en el celular, o un emulador Android/iOS

## Instalar y ejecutar

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go. En Windows, si el teléfono no conecta, asegúrate de que el PC y el teléfono estén en la misma red Wi-Fi. También puedes probar:

```bash
pnpm exec expo start --tunnel
```

## Comandos útiles

```bash
pnpm typecheck
pnpm start
```

## Estructura

```text
panaderia-pnpm/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## Siguiente paso
Esta es una interfaz inicial con datos de ejemplo; todavía no guarda información ni usa una base de datos. Después se pueden añadir pantallas CRUD y conectar una API/backend.
