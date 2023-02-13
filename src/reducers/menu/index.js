import { GET_MENU, GET_SELECTED_MENU } from "../../actions/menuAction";

const initialState = {
	getMenuLoading: false,
	getMenuResult: false,
	getMenuErrorMessage: false,

	getSelectedMenuResult: false,
};

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MENU:
			return {
				...state,
				getMenuLoading: action.payload.loading,
				getMenuResult: action.payload.data,
				getMenuErrorMessage: action.payload.errorMessage,
			};
		case GET_SELECTED_MENU:
			return {
				...state,
				getSelectedMenuResult: action.payload.data,
			};
		default:
			return state;
	}
};

export default menuReducer;
