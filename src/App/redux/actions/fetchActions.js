import { createAsyncAction } from "redux-promise-middleware-actions";

export const fetchAlbums = createAsyncAction("ALBUMS", async () => {
  try {
    const res = await fetch("/api/albums");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
});

export const fetchSongs = createAsyncAction("SONGS", async () => {
  try {
    const res = await fetch("/api/songs");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
});
