# Docker TP

Este proyecto es una aplicación web sencilla desarrollada con React y Node.js, que interactúa con una base de datos CouchDB. La aplicación permite insertar datos de forma manual o generar datos aleatorios, mostrando los resultados en pantalla.

## Tabla de Contenidos
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)

## Instalación

### Requisitos

Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

### Pasos de Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/docker-tp.git
cd docker-tp
```

2. Construye y levanta los contenedores de Docker:

```bash
docker-compose up --build
```

Esto iniciará los servicios de CouchDB, el servidor backend y la aplicación frontend.

### Verificación de Servicios

- **Backend:** Si el backend se ha levantado correctamente, deberías ver el mensaje "Server is running" al acceder a `http://localhost:3000/`.
- **CouchDB:** Si CouchDB se ha levantado correctamente, puedes acceder a la interfaz de administración en `http://localhost:5984/_utils/#login`.

## Uso

1. Abre tu navegador y navega a `http://localhost:3001`.
2. Para insertar un dato manualmente, ingresa un valor en el campo de texto y haz clic en el botón "Enviar".
3. Para generar un dato aleatorio, haz clic en el botón "Generar dato aleatorio".
4. Los resultados se mostrarán en la sección "Resultado".

## Estructura del Proyecto

```plaintext
docker-tp/
│
├── backend/
│   ├── index.js
│   └── Dockerfile
│
├── couchdb/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ParticlesContainer.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── theme.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── public/
│   │   └── ...
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## Tecnologías Utilizadas

- **Frontend:** React, Material-UI, Axios, SweetAlert2
- **Backend:** Node.js, Express
- **Base de Datos:** CouchDB
- **Contenedores:** Docker, Docker Compose

## Configuración de Variables de Entorno

Puedes cambiar las variables de entorno como el usuario y la contraseña de CouchDB en el archivo `docker-compose.yml`:

```yaml
services:
  couchdb:
    build: ./couchdb
    ports:
      - "5984:5984"
    environment:
      - COUCHDB_USER=admin
      - COUCHDB_PASSWORD=admin
```

Si deseas cambiar estas variables, simplemente edita los valores de `COUCHDB_USER` y `COUCHDB_PASSWORD` según tus necesidades.

Además, si necesitas modificar la URL de CouchDB utilizada por el backend, también puedes hacerlo en el archivo `docker-compose.yml`:

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      couchdb:
        condition: service_healthy
    environment:
      - COUCHDB_URL=http://admin:admin@couchdb:5984
```

Asegúrate de que los valores de `COUCHDB_USER` y `COUCHDB_PASSWORD` coincidan con los utilizados en el servicio de CouchDB.
