## Backend
### Levantar proyecto

#### Requisitos previos
- Node.js >= 24.x
- npm >= 11.x (o yarn/pnpm)

#### Instalación y configuración
1. Clonar el repositorio
2. Instalar dependencias

```bash
npm install
```

3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

O crear la app de producción:

```bash
npm run preview
```

### Decisiones de diseño

#### Uso de tsx en lugar de nodemon + ts-node
Para la configuración del proyecto para el desarrollo, he decidido usar tsx ya que soporta typescript de forma nativa, su configuración y uso es más sencilla ya que no requiere de ficheros config para funcionar, es más rapido que nodemon + ts-node y la funcionalidad que nos interesa esta toda incluida en un solo paquete.

#### Paginación en el endpoint "getPolicies"
El endpoint acepta los query params limit y page para poder paginar el numero de items que se muestran por llamada, se devuelven junto con los datos la siguiente estructura:

para /api/policies?limit=5&page=2

```json
{
  "data": [
    {
      "id": 6,
      "holder": "Pedro Doe",
      "type": "auto",
      "status": "active",
      "premium": 1200
    },
    {
      "id": 7,
      "holder": "Maria Doe",
      "type": "health",
      "status": "expired",
      "premium": 1500
    },
    {
      "id": 8,
      "holder": "Jose Doe",
      "type": "home",
      "status": "pending",
      "premium": 1800
    }
  ],
  "items": 3,
  "totalItems": 8,
  "totalPages": 2,
  "page": 2,
  "limit": 5
}
```

## Frontend

### Decisiones de diseño
#### SPA pura
En este caso se instala Angular sin SSR, ya que en el enunciado se da a entender que backend y frontend son independientes.

#### Uso de store
Realiza la carga de los datos y guarda el listado para que sea accedido desde otros puntos de la app. También mockea la eliminación de pólizas

#### Generalización de las clases css para los estados
Para aplicar el css se utiliza Tailwind CSS, los colores por estados se generalizan en el fichero policy-status-styles.ts para reutilizar las clases. 
