import { createAsyncAction } from "redux-promise-middleware-actions";

export const fetchAlbums = createAsyncAction("ALBUMS", async () => {
  try {
    const res = await fetch("http://localhost:3000/albums");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
});

export const fetchSongs = createAsyncAction("SONGS", async () => {
  try {
    const res = await fetch("http://localhost:3000/songs");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
});
