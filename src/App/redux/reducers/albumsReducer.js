import { fetchAlbums } from "../actions/fetchActions";

// Estado inicial
const initialState = {
  isLoading: false,
  items: [],
  error: false
};

// Implementamos el reducer
const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case String(fetchAlbums.pending):
      // Activamos la flag de isLoading.
      // Eliminamos cualquier error anterior
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case String(fetchAlbums.fulfilled):
      // Almacenamos los articulos y reiniciamos
      // las flags
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        error: false
      };
    case String(fetchAlbums.rejected):
      // Desactivamos la flag de carga y
      // activamos la de error
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
export default albumsReducer;
