import { fetchAlbums } from "../actions/fetchActions";
import actionTypes from "../actions/actionTypes";

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
      // Almacenamos los items y reiniciamos
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
    case actionTypes.FAVORITE_ALBUM:
      return {
        ...state,
        items: action.items
      };
    default:
      return state;
  }
};
export default albumsReducer;
