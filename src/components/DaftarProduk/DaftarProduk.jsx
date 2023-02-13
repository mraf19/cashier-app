import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMenu, getSelectedMenu } from "../../actions/menuAction";
import { numberWithCommas } from "../../utils/utils";

function DaftarProduk() {
	const dispatch = useDispatch();
	const { getMenuResult } = useSelector((state) => state.menuReducer);
	const { getSelectedKategoriResult } = useSelector(
		(state) => state.kategoriReducer,
	);

	useEffect(() => {
		dispatch(getMenu());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getMenu(getSelectedKategoriResult.nama));
	}, [dispatch, getSelectedKategoriResult]);

	return (
		<Col className="mt-3">
			<h3>Daftar Produk</h3>
			<hr />

			<Row className="overflow-auto menu">
				{getMenuResult ? (
					getMenuResult.map((menu) => {
						return (
							<Col md="4" xs="6" className="mt-3 mr-3">
								<Card
									key={menu.id}
									onClick={() => dispatch(getSelectedMenu(menu))}
								>
									<Card.Img
										variant="top"
										src={`assets/images/${menu.category.nama.toLowerCase()}/${
											menu.gambar
										}`}
									/>
									<Card.Body>
										<Card.Title>{menu.nama}</Card.Title>
										<Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						);
					})
				) : (
					<h3>
						<FontAwesomeIcon icon={faTruckLoading} /> Mohon ditungu. . .
					</h3>
				)}
			</Row>
		</Col>
	);
}

export default DaftarProduk;
