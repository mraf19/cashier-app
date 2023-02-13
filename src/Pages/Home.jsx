import React from "react";
import { Row, Container } from "react-bootstrap";
import { ListKategori, Hasil, DaftarProduk } from "../components";

function Home(props) {
	return (
		<div className="mt-3">
			<Container fluid>
				<Row>
					<ListKategori />
					<DaftarProduk />
					<Hasil {...props} />
				</Row>
			</Container>
		</div>
	);
}

export default Home;
