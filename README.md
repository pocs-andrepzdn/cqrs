# CQRS - Patrón de Segregación de Responsabilidad de Consulta y Comando

## Qué es CQRS?

**CQRS** es un patrón de diseño que separa las operaciones de escritura
(**Commands**) de las operaciones de lectura (**Queries**).
Esto permite optimizar el rendimiento, escalabilidad y seguridad en aplicaciones
donde la carga de lectura y escritura es diferente.

### Beneficios de CQRS

- **Mejora el rendimiento**: Las consultas se ejecutan rápidamente en una
base optimizada para lecturas
- **Escalabilidad**: Se pueden escalar los sistemas de lectura y escritura
de manera independiente
- **Seguridad**: Separar comandos y consultas puede mejorar el control de
acceso
- **Optimizado para cada tarea**: La base de datos de lectura puede ser un
cache como Redis para mejorar la velocidad

## Tecnologías Utilizadas

- **MongoDB** (Base de datos NoSQL para escritura)
- **Redis** (Base de datos NoSQL para lectura - cache)
- **Node.js** + **Express.js**
- **Docker & Docker Compose**

## Instalación y Ejecución

### **Clonar el repositorio**

```sh
git clone https://github.com/pocs-andrepzdn/cqrs.git
```

### **Ejecutar con Docker**

```sh
docker-compose up -d --build
```

Esto iniciará los contenedores para:

- MongoDB (puerto **27017**)
- Redis (puerto **6379**)
- API Node.js (puerto **3000**)

### **Probar la API**

#### **Crear una tarea**

Mediante el uso de Postman o cualquier herramienta de consultas HTTP

`http://localhost:3000/tasks/`

Usando un body en formato JSON

```json
{
    "title": "Comprar Leche",
    "description": "Ir a la tienda"
}
```

#### **Obtener una tarea**

`http://localhost:3000/tasks/<task_id>`

## Flujo de CQRS en este Proyecto

1. **Crear una tarea**:
   - Se guarda en **MongoDB** (escritura)
   - Se almacena en **Redis** para futuras consultas rápidas

2. **Obtener una tarea**:
   - Primero se busca en **Redis** (cache rápido)
   - Si no está en Redis, se busca en **MongoDB**, luego se guarda en Redis
     para futuras consultas
