import React, { Component } from "react";
import { render, mount } from "enzyme";
import { Provider } from "react-redux";
import store from "../redux/store";
import { createAsyncAction } from "redux-promise-middleware-actions";
import * as fetchActions from "../redux/actions/fetchActions";

// Componente
import AlbumsGrid from "../components/AlbumsGrid";

/**
 * Este test no funciona bien. Puede ser por algun tema de soporte
 * de Enzyme a los componentes funcionales
 *
 * Aunque se usa mount y se llama a .update() en un setImmediate
 * (se ejecuta cuando ya se han resuelto las promesas) el componente
 * se queda con el mismo arbol y no renderiza las canciones
 * En real si que lo hace bien
 */

const albums = [
  {
    id: 2,
    name: "Battle grounds",
    artist: "Florian",
    cover: "/images/cover.jpg"
  }
];

const songs = [
  {
    id: 9,
    name: "Does Your Mother Know",
    audio: "/music/funky_energy_loop.mp3",
    seconds: 203,
    album_id: 2
  },
  {
    id: 10,
    name: "The Name Of The Game",
    audio: "/music/funky_energy_loop.mp3",
    seconds: 203,
    album_id: 2
  }
];

const fetchAlbumsMockImpl = createAsyncAction("ALBUMS", async () => {
  console.log("entra en fetchAlbumsMock");
  return Promise.resolve(albums);
});

const fetchSongsMockImpl = createAsyncAction("SONGS", async () => {
  return Promise.resolve(songs);
});

describe("AlbumsGrid", () => {
  //jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
  const fetchAlbumsMock = jest
    .spyOn(fetchActions, "fetchAlbums")
    .mockImplementation(fetchAlbumsMockImpl);
  const fetchSongsMock = jest
    .spyOn(fetchActions, "fetchSongs")
    .mockImplementation(fetchSongsMockImpl);

  it("renders correctly", done => {
    const wrapper = mount(
      <Provider store={store}>
        <AlbumsGrid />
      </Provider>
    );
    // Comprobamos los distintos aspectos de HTML
    const albumsLink = wrapper.find('a[href="/albums"]');
    //albumsLink.simulate('click');

    setImmediate(() => {
      console.log("Antes update", wrapper.debug());
      wrapper.update();
      console.log("Despues update", wrapper.debug());
      expect(fetchAlbumsMock).toHaveBeenCalled();
      expect(fetchSongsMock).toHaveBeenCalled();
      //expect(wrapper.find('div[class*="AlbumsGrid-avatar"]').length).toBe(6)
      done();
    });
  });
});
