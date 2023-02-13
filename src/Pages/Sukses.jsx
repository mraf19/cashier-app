import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/konstanta";

function Sukses() {
	useEffect(() => {
		axios.get(`${API_URL}/keranjangs`).then((res) => {
			res.data.map((keranjang) =>
				axios.delete(`${API_URL}/keranjangs/${keranjang.id}`),
			);
		});
	}, []);
	return (
		<div className="mt-4 text-center">
			<h1>SUKSES!!</h1>
			<p>Pesanan telah dibayar. Terimakasih telah memesan!</p>
			<Button variant="primary" as={Link} to="/">
				Kembali
			</Button>
		</div>
	);
}

export default Sukses;
