import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getSelectedMenu } from "../../actions/menuAction";
import { API_URL } from "../../utils/konstanta";
import { numberWithCommas } from "../../utils/utils";
import Bayar from "../Bayar/Bayar";
import ModalComp from "../ModalComp/Modal";

function Hasil(props) {
	const [listKeranjang, setListKeranjang] = useState([]);
	const [keranjangDetail, setKeranjangDetail] = useState({
		jumlah: 0,
		total_harga: 0,
		product: {
			nama: "",
			harga: 0,
		},
		id: 0,
	});
	const [show, setshow] = useState(false);

	const dispatch = useDispatch();
	const { getSelectedMenuResult } = useSelector((state) => state.menuReducer);

	const getListKeranjang = () => {
		axios.get(`${API_URL}/keranjangs`).then((res) => {
			setListKeranjang(res.data);
		});
	};

	const handleClose = (data) => {
		setshow(false);
		if (data) {
			getListKeranjang();
		}
	};

	const handleShow = (data) => {
		setshow(true);
		setKeranjangDetail(data);
	};

	useEffect(() => {
		getListKeranjang();
	}, []);

	useEffect(() => {
		console.log(getSelectedMenuResult);
		if (getSelectedMenuResult) {
			axios
				.get(`${API_URL}/keranjangs?product.id=${getSelectedMenuResult.id}`)
				.then((res) => {
					console.log(res.data);
					if (res.data.length > 0) {
						const keranjang = {
							jumlah: res.data[0].jumlah + 1,
							total_harga:
								res.data[0].total_harga + getSelectedMenuResult.harga,
							product: res.data[0].product,
						};
						axios
							.put(`${API_URL}/keranjangs/${res.data[0].id}`, keranjang)
							.then((res) => {
								swal({
									title: "Berhasil!!",
									text: `${getSelectedMenuResult.nama} telah dimasukkan ke keranjang`,
									icon: "success",
									timer: 1500,
								});
							});
						dispatch(getSelectedMenu());
						getListKeranjang();
					} else {
						const keranjang = {
							jumlah: 1,
							total_harga: getSelectedMenuResult.harga,
							product: getSelectedMenuResult,
						};
						axios.post(`${API_URL}/keranjangs`, keranjang).then((res) => {
							swal({
								title: "Berhasil!!",
								text: `${getSelectedMenuResult.nama} telah dimasukkan ke keranjang`,
								icon: "success",
								timer: 1500,
							});
							dispatch(getSelectedMenu());
							getListKeranjang();
						});
					}
				});
		}
	}, [getSelectedMenuResult, dispatch]);

	return (
		<Col md="3" className="mt-3">
			<h3>Hasil</h3>
			<hr />
			<Card className="overflow-auto hasil">
				<ListGroup variant="flush">
					{listKeranjang.length > 0 &&
						listKeranjang.map((keranjang) => {
							return (
								<ListGroup.Item
									key={keranjang.id}
									onClick={() => handleShow(keranjang)}
								>
									<Row>
										<Col xs="2">
											<Badge pill bg="success">
												{keranjang.jumlah}
											</Badge>
										</Col>
										<Col>
											<h5>{keranjang.product.nama}</h5>
											<p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
										</Col>
										<Col>
											<strong className="float-right">
												Rp. {numberWithCommas(keranjang.total_harga)}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
							);
						})}
					<ModalComp
						show={show}
						handleClose={handleClose}
						keranjangDetail={keranjangDetail}
					/>
				</ListGroup>
			</Card>
			<Bayar listKeranjang={listKeranjang} {...props} />
		</Col>
	);
}

export default Hasil;
