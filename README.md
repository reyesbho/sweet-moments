# 🍰 Sweet Moments - Sistema de Gestión de Pedidos

Una aplicación web moderna para la gestión de pedidos de dulces y pastelería, desarrollada con React, TypeScript y Vite.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes Principales](#-componentes-principales)
- [Servicios](#-servicios)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

### 🛍️ Gestión de Pedidos
- **Creación y edición de pedidos** con múltiples productos
- **Sistema de estados** (Pendiente, En proceso, Completado, Cancelado)
- **Gestión de clientes** y lugares de entrega
- **Cálculo automático de totales** por pedido
- **Historial de pedidos** con paginación

### 📅 Calendario de Entregas
- **Vista de calendario** para programar entregas
- **Filtros por fecha** (Hoy, Mañana, Esta semana, Este mes)
- **Gestión de fechas de entrega** con timestamps
- **Vista de pedidos por día**

### 🏪 Catálogo de Productos
- **Administración de productos** con imágenes
- **Categorización por tipos** (Sabores, Gelatinas, Pizzas, Pasteles, Panes)
- **Gestión de tamaños** y precios
- **Sistema de etiquetas** para filtrado
- **Conversión automática de imágenes** a formato WebP

### 👤 Sistema de Autenticación
- **Login seguro** con JWT
- **Rutas protegidas** para usuarios autenticados
- **Gestión de sesiones** con cookies
- **Interceptor de requests** para tokens

### 🎨 Interfaz de Usuario
- **Diseño responsive** y moderno
- **Tema oscuro** por defecto
- **Notificaciones toast** para feedback
- **Componentes reutilizables** y modulares
- **Formularios validados** con Zod

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción rápida
- **React Router DOM** - Enrutamiento
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### UI/UX
- **Material-UI (MUI)** - Componentes de interfaz
- **React Icons** - Iconografía
- **React Toastify** - Notificaciones
- **Styled Components** - Estilos CSS-in-JS
- **React Slick** - Carousel y sliders

### Utilidades
- **Day.js** - Manipulación de fechas
- **JWT Decode** - Decodificación de tokens
- **JS Cookie** - Gestión de cookies
- **Fetch Intercept** - Interceptación de requests

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/sweet-moments.git
   cd sweet-moments
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   VITE_API_URL=tu_url_api
   VITE_APP_NAME=Sweet Moments
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📖 Uso

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview

# Linting
npm run lint
```

### Flujo de Trabajo

1. **Iniciar sesión** con credenciales válidas
2. **Navegar a Pedidos** para ver todos los pedidos
3. **Crear nuevo pedido** seleccionando productos y configurando detalles
4. **Gestionar estados** de los pedidos según el progreso
5. **Usar el calendario** para programar entregas
6. **Administrar catálogos** de productos y tamaños

## 📁 Estructura del Proyecto

```
sweet-moments/
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/            # Imágenes y recursos
│   ├── components/        # Componentes reutilizables
│   │   ├── addNewProduct/     # Agregar productos a pedidos
│   │   ├── calendar/          # Componentes de calendario
│   │   ├── cardOrderInfo/     # Tarjetas de información
│   │   ├── cardProduct/       # Tarjetas de productos
│   │   ├── detailOrder/       # Detalles de pedidos
│   │   ├── formProducts/      # Formularios de productos
│   │   ├── header/            # Encabezado de la aplicación
│   │   ├── modal/             # Modales reutilizables
│   │   ├── new-order/         # Creación de nuevos pedidos
│   │   ├── newCatalogRecord/  # Registros de catálogo
│   │   ├── order/             # Componentes de pedidos
│   │   ├── selectMultiple/    # Selección múltiple
│   │   ├── sidebar/           # Barra lateral
│   │   └── tableComponent/    # Componentes de tabla
│   ├── config/            # Configuración de la aplicación
│   │   ├── AuthProvider.tsx   # Proveedor de autenticación
│   │   ├── ProtectedRoute.tsx # Rutas protegidas
│   │   └── Interceptor.ts     # Interceptor de requests
│   ├── context/           # Contextos de React
│   ├── general/           # Utilidades generales
│   │   ├── Constants.ts       # Constantes de la aplicación
│   │   ├── Dtos.ts           # Data Transfer Objects
│   │   ├── interfaces/        # Interfaces TypeScript
│   │   └── Status.tsx         # Estados de la aplicación
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas de la aplicación
│   │   ├── calendar/          # Página de calendario
│   │   ├── catalog/           # Administración de catálogos
│   │   ├── login/             # Página de login
│   │   ├── orders/            # Lista de pedidos
│   │   └── products/          # Detalles de productos
│   ├── services/          # Servicios de API
│   └── utils/             # Utilidades adicionales
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.js        # Configuración de Vite
```

## 🧩 Componentes Principales

### Gestión de Pedidos
- **`Orders.tsx`** - Lista principal de pedidos con paginación
- **`DetailOrder.tsx`** - Vista detallada de un pedido específico
- **`NewOrder.tsx`** - Formulario para crear nuevos pedidos
- **`AddNewProduct.tsx`** - Agregar productos a pedidos existentes

### Calendario
- **`Calendar.tsx`** - Vista de calendario con pedidos programados
- **`DayCalendar.tsx`** - Vista de pedidos por día específico
- **`OrderPill.tsx`** - Representación visual de pedidos en calendario

### Catálogos
- **`AdminCatalog.tsx`** - Administración de catálogos de productos
- **`NewCatalogRecord.tsx`** - Crear/editar registros de catálogo
- **`TableCatalogType.tsx`** - Tabla para mostrar catálogos

### Productos
- **`Product.tsx`** - Componente individual de producto
- **`CardProduct.tsx`** - Tarjeta de producto con información
- **`DetailProducts.tsx`** - Vista detallada de productos

## 🔌 Servicios

### Autenticación
- **`Auth.service.ts`** - Login, logout y gestión de tokens

### Pedidos
- **`pedidos.services.ts`** - CRUD de pedidos y estados

### Productos
- **`producto.service.ts`** - Gestión de productos
- **`sizeProducto.service.ts`** - Gestión de tamaños de productos

### Clientes
- **`cliente.service.ts`** - Gestión de información de clientes

## 🎯 Hooks Personalizados

- **`useCatalogs.ts`** - Gestión de catálogos con estados
- **`useProducts.ts`** - Gestión de productos
- **`useOrders.ts`** - Gestión de pedidos con paginación
- **`useClients.ts`** - Gestión de clientes
- **`useDebounce.ts`** - Debounce para búsquedas
- **`useModalConfirm.ts`** - Confirmaciones modales
- **`useLocalStorage.ts`** - Gestión de localStorage

## 🔧 Configuración

### Variables de Entorno
```env
VITE_API_URL=https://tu-api.com
VITE_APP_NAME=Sweet Moments
```

### Configuración de Vite
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Estándares de Código
- Usar **TypeScript** para todo el código
- Seguir **ESLint** y **Standard** para linting
- Escribir **componentes funcionales** con hooks
- Usar **interfaces** para tipado
- Documentar **funciones complejas**

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Desarrollador**: reyesbho
- **Email**: reyesbho@gmail.com
- **Proyecto**: https://github.com/reyesbho/sweet-moments

---
