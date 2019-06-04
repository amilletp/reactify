# Reactify

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
An App developed for a [React-Redux](https://cursos.trainingit.es/course/view.php?id=39) course that reflects a music content service.

Care has been put into making the app navigable across all its sections, either by clicking the top bar menu, or by typing URLs in the browser. The main components are independent from each other and load on their own. They carry out the fetching of data collections. These are served from the backend, the first time, and from cached data by the ServiceWorker in successive calls. Fetching of data is performed only if it is not already present in the Redux store.

Vast majority of the components have been developed as functional, with the use of React Hooks. Except for few cases, such as ErrorBoundary, where much more fine grained control of the lifecycle methods is needed.

Not much effort has been put into the UI design, as this was not the scope of the course. Instead, Material UI components have been imported.

The following sections have been added:

- Temas recomendados (Recommended tracks)
- Temas recientes (Recent tracks)
- Buscar (Search)
- Albums
- Reproductor (Player)
- Inicio de sesión (Sign In)
- Perfil de usuario (Profile)

### Temas recomendados (Recommended tracks)

A random selection of up to six tracks for the user to choose. Tracks can be played, but these are not added to the Recent Tracks list, as they are considered a preview.

### Temas recientes (Recent tracks)

Tracks the user has played, at the player section, during the current session.

### Buscar (Search)

You can search by Album, Track name or Artist. The search applies the filters over the fetched example dataset

### Albums

Albums view. You can see a grid with the available albums. Name and Artist show up at the top, followed by the cover and a songs table. Additionally, albums can be favorited, clicking over the heart icon, though a Favorites view is not on the road map. Sharing is a nice-to-have, and could be added in the future.
You can click on the album name to see an expanded detail view of the album. Tracks can be clicked to open up them at the Player section.

### Reproductor (Player)

An expanded detail view for a Track. An <audio> player appears. If yo

## Iniciar el proyecto

El proyecto se inicia directamente con `yarn start`.

Este comando hace uso de `npm-run-all` que ejecuta el servidor y el cliente al mismo tiempo. El servidor estará escuchando en el puerto 3001 y la aplicación en el 3000. No obstante, la aplicación ya viene preconfigurada con un proxy que redirige cualquier llamada al servidor. Por ejemplo:

`/albums -> http://localhost:3001/albums`

## Créditos

- Fotografía de la carátula de los álbums por [James Owen](https://unsplash.com/photos/c-NBiJrhwdM)
- Audio compuesto por [Kevin MacLeod](https://twitter.com/kmacleod)
