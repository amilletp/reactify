import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Polyfills!
import "@babel/polyfill";
// Babel solo agrega los polyfills definidos en ECMAScript
// Fetch no esta, tiene que ser agregado separadamente
import "whatwg-fetch";

ReactDOM.render(
  <main>
    <App />
  </main>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
// Instalamos el service worker

// Definimos la variable que contendrá al service worker
let worker;
// Esta variable indica que ya se ha forzado la recarga
// de la página
let refreshing = false;
// Agregamos el evento on Click
document.getElementById("reload").addEventListener("click", () => {
  // Mandamos el mensaje al worker
  document.getElementById("updateApplication").classList.add("hide");
  worker.postMessage({ action: "skipWaiting" });
});

// Comprobamos que el navegador lo soporte:
if ("serviceWorker" in navigator) {
  // Esperamos a que cargue la web
  window.addEventListener("load", () => {
    // Intentamos instalar el Service worker
    navigator.serviceWorker.register("/sw.js").then(
      registration => {
        // Se ha registrado correctamente
        console.log(
          "El service worker SW se ha registrado correctamente:",
          registration.scope
        );

        // Nos suscribimos al evento de nueva versión
        registration.addEventListener("updatefound", () => {
          // Obtenemos el nuevo worker
          worker = registration.installing;

          // Nos suscribimos a los cambios en su ciclo de vida
          worker.addEventListener("statechange", () => {
            // Comprobamos si ha habido un cambio
            if (worker.state === "installed") {
              //workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
              // Una vez que se ha instalado, mostramos el botón
              const updateApp = document.getElementById("updateApplication");
              updateApp.classList.add("show");
            }
          });
        });
      },
      err => {
        // registration failed :(
        console.log("El registro de SW ha fallado :(", err);
      }
    );

    // Nos suscribimos al evento de actualización
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  });
}
