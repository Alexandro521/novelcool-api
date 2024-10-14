
# Novecool API


## Características

- Obtener los mangas más recientes
- Buscar mangas por título o categoría
- Obtener información detallada de un manga
- Leer capítulos de un manga
- Navegar por diferentes géneros y categorías

## Instalación

1. Clona este repositorio:
```bash
   git clone https://github.com/Alexandro521/novelcool-api.git
```
2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor:
```bash
npm start
```


Rutas de la API

Rutas principales

Ruta base de la API: /api/v1


Rutas disponibles

1. Página principal:
GET /api/v1/index
Muestra un mensaje o una página de inicio.


2. Últimos lanzamientos:
GET /api/v1/lasted
Obtiene la lista de mangas lanzados recientemente.


3. Categorías:
Las siguientes rutas devuelven mangas en la categoría correspondiente:

GET /api/v1/complete - Mangas completos

GET /api/v1/romance - Categoría romance

GET /api/v1/comedy - Categoría comedia

GET /api/v1/drama - Categoría drama

GET /api/v1/action - Categoría acción

GET /api/v1/webcomic - Webcómics



4. Cualquier categoría:
GET /api/v1/category/:category
Devuelve los mangas de una categoría específica. Reemplaza :category con el nombre de la categoría (ejemplo: action, romance, etc.).


5. Búsqueda:
GET /api/v1/search
Busca mangas por título. Debes incluir los parámetros de búsqueda en la URL.

| Parámetro             | Descripción                                                    | Tipo      | Ejemplo                                             |
|-----------------------|----------------------------------------------------------------|-----------|-----------------------------------------------------|
| `query`               | Palabra clave para buscar en el título o descripción del manga.| `string`  | `naruto`                                            |
| `author`              | Nombre del autor del manga.                                    | `string`  | `Kishimoto`                                         |
| `s_sel`               | Selecciona el estado del manga, si está completo o en progreso.| `string`  | `completed`                                         |
| `a_sel`               | Selecciona el estado de actividad del autor.                   | `string`  | `active`                                            |
| `genres_includes`     | Lista de géneros que deben estar incluidos en el manga.        | `string`  | `action,drama`                                      |
| `genres_not_includes` | Lista de géneros que deben ser excluidos del manga.            | `string`  | `horror`                                            |
| `year`                | Año de publicación o lanzamiento del manga.                    | `number`  | `2020`                                              |
| `completed`           | Filtra por mangas completados (`true` o `false`).              | `boolean` | `true`                                              |
| `rate`                | Filtra por la calificación del manga (un valor numérico).      | `number`  | `4.5`                                               |


6. Información de un manga por ID:
GET /api/v1/view/:mangaId
Devuelve la información completa del manga identificado por :mangaId.


7. Lista de géneros:
GET /api/v1/info/genres
Obtiene la lista completa de géneros disponibles.


8. Capítulos de un manga:
GET /api/v1/reader/:mangaId/:chapterId
Obtiene las páginas de un capítulo específico de un manga, donde :mangaId es el ID del manga y :chapterId es el ID del capítulo.



Ruta no encontrada

Si se intenta acceder a una ruta que no existe, la API devolverá el siguiente mensaje:

{
    "message": "route not exist"
}


