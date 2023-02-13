import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { API_URL } from "../../utils/konstanta";

function Bayar({ listKeranjang, history }) {
	const totalBayar = listKeranjang.reduce(function (result, item) {
		return result + item.total_harga;
	}, 0);
	const clickButton = (totalBayar) => {
		const pesanan = {
			totalBayar,
			menu: listKeranjang,
		};
		console.log(pesanan);
		axios
			.post(`{${API_URL}/pesanans`, pesanan)
			.then((res) => {
				history.push("/sukses");
			})
			.catch((err) => console.log(err.message));
	};
	return (
		<>
			{/* web */}
			<div className="fixed-bottom d-none d-md-block">
				<Row>
					<Col md={{ span: 3, offset: 9 }}>
						<h4>
							Total Harga:{" "}
							<strong className="mx-2 float-right">
								Rp. {numberWithCommas(totalBayar)}
							</strong>
						</h4>
						<Button
							variant="primary"
							size="lg"
							className="d-grid gap-3 mt-2"
							onClick={() => clickButton(totalBayar)}
						>
							<FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
						</Button>
					</Col>
				</Row>
			</div>

			{/* mobile */}
			<div className="d-sm-block d-md-none">
				<Row>
					<Col md={{ span: 3, offset: 9 }}>
						<h4 className="mt-2">
							Total Harga:{" "}
							<strong className="mx-2 float-right">
								Rp. {numberWithCommas(totalBayar)}
							</strong>
						</h4>
						<Button
							variant="primary"
							size="lg"
							className="mb-2 mr-2 mt-2 mb-2 d-grid gap-3"
							onClick={() => clickButton(totalBayar)}
						>
							<FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
						</Button>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Bayar;
