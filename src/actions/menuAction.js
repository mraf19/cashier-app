import axios from "axios";
import { API_URL } from "../utils/konstanta";

export const GET_MENU = "GET_MENU";
export const GET_SELECTED_MENU = "GET_SELECTED_MENU";

export const getMenu = (kategori = "Makanan") => {
	return (dispatch) => {
		dispatch({
			type: GET_MENU,
			payload: {
				loading: true,
				data: false,
				errorMessage: false,
			},
		});

		axios({
			method: "GET",
			url: `${API_URL}/products?category.nama=${kategori}`,
		})
			.then((res) => {
				dispatch({
					type: GET_MENU,
					payload: {
						loading: false,
						data: res.data,
						errorMessage: false,
					},
				});
			})
			.catch((err) => {
				dispatch({
					type: GET_MENU,
					payload: {
						loading: false,
						data: false,
						errorMessage: err.message,
					},
				});
			});
	};
};

export const getSelectedMenu = (data) => {
console.log(data)
	return (dispatch) => {
		dispatch({
			type: GET_SELECTED_MENU,
			payload: {
				data,
			},
		});
	};
};
