import {
	GET_KATEGORI,
	GET_SELECTED_KATEGORI,
} from "../../actions/kategoriAction";

const initialState = {
	getKategoriLoading: false,
	getKategoriResult: false,
	getKategoriErrorMessage: false,

	getSelectedKategoriResult: { nama: "Makanan" },
};

const kategoriReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_KATEGORI:
			return {
				...state,
				getKategoriLoading: action.payload.loading,
				getKategoriResult: action.payload.data,
				getKategoriErrorMessage: action.payload.errorMessage,
			};
		case GET_SELECTED_KATEGORI:
			return {
				...state,
				getSelectedKategoriResult: action.payload.data,
			};
		default:
			return state;
	}
};

export default kategoriReducer;
