import React, { useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getKategori, getSelectedKategori } from "../../actions/kategoriAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUtensils,
	faCoffee,
	faCheese,
} from "@fortawesome/free-solid-svg-icons";

function ListKategori() {
	const Icon = ({ nama }) => {
		if (nama === "Makanan")
			return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
		if (nama === "Minuman")
			return <FontAwesomeIcon icon={faCoffee} className="mr-3" />;
		if (nama === "Cemilan")
			return <FontAwesomeIcon icon={faCheese} className="mr-3" />;

		return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
	};

	const dispatch = useDispatch();
	const { getKategoriResult, getSelectedKategoriResult } = useSelector(
		(state) => state.kategoriReducer,
	);
	useEffect(() => {
		dispatch(getKategori());
	}, [dispatch]);

	return (
		<Col md="2" className="mt-3">
			<h3>List Kategori</h3>
			<hr />
			{getKategoriResult &&
				getKategoriResult.map((kategori) => {
					return (
						<ListGroup>
							<ListGroup.Item
								className={
									getSelectedKategoriResult.nama === kategori.nama &&
									"kategori-aktif"
								}
								key={kategori.id}
								onClick={() => dispatch(getSelectedKategori(kategori))}
								style={{ cursor: "pointer" }}
							>
								<h5>
									<Icon nama={kategori.nama} /> {kategori.nama}
								</h5>
							</ListGroup.Item>
						</ListGroup>
					);
				})}
		</Col>
	);
}

export default ListKategori;
