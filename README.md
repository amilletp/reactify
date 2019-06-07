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

Last 5 tracks the user has played, at the player section, during the current session.

### Buscar (Search)

You can search by Album, Track name or Artist. The search applies the filters over the fetched example dataset.

### Albums

Albums view. You can see a grid with the available albums. Name and Artist show up at the top, followed by the cover and a songs table. Additionally, albums can be favorited, clicking over the heart icon, though a Favorites view is not on the road map. Sharing is a nice-to-have, and could be added in the future.
You can click on the album name to see an expanded detail view of the album. Tracks can be clicked to open up them at the Player section.

### Reproductor (Player)

An expanded detail view for a Track. An <audio> player appears. If you click on play the player goes into floating mode, docked at the bottom of the page. It will remain in this mode for the rest of the session, though playing can be stopped. It will start playing a new track if you click on it from an Album view.

## Running the project

Use `yarn start`

The start srcript runs `npm-run-all`, starting server and client at the same time. Listening port is 3001 for server and 3000 for client app.

## Credits

- Albums cover by [James Owen](https://unsplash.com/photos/c-NBiJrhwdM)
- Audio Track composed by [Kevin MacLeod](https://twitter.com/kmacleod)
