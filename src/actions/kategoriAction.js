import axios from "axios";
import { API_URL } from "../utils/konstanta";

export const GET_KATEGORI = "GET_KATEGORI";
export const GET_SELECTED_KATEGORI = "GET_SELECTED_KATEGORI";

export const getKategori = () => {
	return (dispatch) => {
		dispatch({
			type: GET_KATEGORI,
			payload: {
				loading: true,
				data: false,
				errorMessage: false,
			},
		});

		axios({
			method: "GET",
			url: `${API_URL}/categories`,
		})
			.then((res) => {
				dispatch({
					type: GET_KATEGORI,
					payload: {
						loading: false,
						data: res.data,
						errorMessage: false,
					},
				});
			})
			.catch((err) => {
				dispatch({
					type: GET_KATEGORI,
					payload: {
						loading: false,
						data: false,
						errorMessage: err.message,
					},
				});
			});
	};
};

export const getSelectedKategori = (data) => {
	return (dispatch) => {
		console.log(data);
		dispatch({
			type: GET_SELECTED_KATEGORI,
			payload: {
				loading: false,
				data,
				errorMessage: false,
			},
		});
	};
};
