import { combineReducers } from "redux";
import menuReducer from "./menu";
import kategoriReducer from "./kategori";

export default combineReducers({
	menuReducer,
	kategoriReducer,
});
