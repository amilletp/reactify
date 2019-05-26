import { createAsyncAction } from "redux-promise-middleware-actions";

export const fetchAlbums = createAsyncAction("ALBUMS", async () => {
  try {
    const res = await fetch("/albums.json");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
});

export const fetchSongs = createAsyncAction("SONGS", async () => {
  try {
    const res = await fetch("/songs.json");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
});
