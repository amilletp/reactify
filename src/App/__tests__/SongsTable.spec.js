import React from "react";
import { render, mount } from "enzyme";
import SongsTable from "../components/SongsTable";

/**
 * Testing de 2 componentes de presentaciÃ³n
 */

/**
 * SongsTable
 */
describe('SongsTable', () => {
    const songs = {
        items: [
          {
            id: 6,
            name: "Dancing Queen",
            audio: "/music/funky_energy_loop.mp3",
            seconds: 203,
            album_id: 2
          },
          {
            id: 7,
            name: "Fernando",
            audio: "/music/funky_energy_loop.mp3",
            seconds: 203,
            album_id: 2
          },
          {
            id: 8,
            name: "Gimme! Gimme! Gimme! (A Man After Midnight)",
            audio: "/music/funky_energy_loop.mp3",
            seconds: 203,
            album_id: 2
          },
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
        ]
      };
      
      const tile = { id: 2 };

/**
 * SongsTable test render con un album de 5 canciones
 */      
  describe("Render", () => {
    let wrapper;
    // Inicializamos el componente en un beforeEach para
    // evitar tener que repetir esta lÃ­nea en cada test
    beforeEach(() => {
      wrapper = render(
        <SongsTable
          songs={songs.items.filter(song => song.album_id === tile.id)}
        />
      );
    });

    it("should add the HTML elements", () => {
      // Comprobamos los distintos aspectos de HTML
      expect(wrapper.is('div[class*="SongsTable-root"]')).toBeTruthy();
      expect(wrapper.find('table').length).toBe(1);
      expect(wrapper.find('table thead').length).toBe(1);
      expect(wrapper.find('tbody tr').length).toBe(5);;
      });
      it('should match the following texts', () => {
      // Comprobamos el texto
      expect(wrapper.find('tbody tr th').first().text()).toBe('Dancing Queen');
      expect(wrapper.find('tbody tr td').first().text()).toBe('3:23');     
    });
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });    
  });

  describe("Shallow", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SongsTable
          songs={songs.items.filter(song => song.album_id === tile.id)}
        />
      );
    });

    it("should contain the nodes", () => {
        /** 
         * NOTA: Actualmente Enzyme no soporta el acceso a wrapper.state()
         * para componentes funcionales
         */
        // Probar que el nodo padre se ha construido con estilos de MaterialUI
      expect(wrapper.is('WithStyles(SongsTable)')).toBeTruthy();
    });
  });  
});

