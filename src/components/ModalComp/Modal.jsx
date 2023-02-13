import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { API_URL } from "../../utils/konstanta";
import { numberWithCommas } from "../../utils/utils";

const ModalComp = ({ show, handleClose, keranjangDetail }) => {
	const nama = keranjangDetail.product.nama;
	const [jumlah, setJumlah] = useState(keranjangDetail.jumlah);
	const [totalHarga, setTotalHarga] = useState(keranjangDetail.total_harga);
	const [keterangan, setKeterangan] = useState("");
	const handlePlus = () => {
		setJumlah(jumlah + 1);
		setTotalHarga((jumlah + 1) * keranjangDetail.product.harga);
	};
	const handleMinus = () => {
		setJumlah(jumlah - 1);
		setTotalHarga((jumlah - 1) * keranjangDetail.product.harga);
	};
	const handleChange = (e) => {
		setKeterangan(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			id: keranjangDetail.id,
			jumlah,
			total_harga: totalHarga,
			product: keranjangDetail.product,
		};
		axios.put(`${API_URL}/keranjangs/${keranjangDetail.id}`, data).then(() => {
			swal({
				title: "Berhasil!!",
				text: "Berhasil update pesanan anda!",
				icon: "success",
				timer: 1500,
			});
			handleClose(1);
		});
	};
	const handleDelete = (id) => {
        console.log(id)
		axios.delete(`${API_URL}/keranjangs/${id}`).then(() => {
			swal({
				title: "Berhasil menghapus pesanan anda",
				icon: "success",
				timer: 1500,
			});
			handleClose(1);
		});
	};
	useEffect(() => {
		setJumlah(keranjangDetail.jumlah);
		setTotalHarga(keranjangDetail.total_harga);
	}, [keranjangDetail]);
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{nama} -
					<strong>Rp. {numberWithCommas(keranjangDetail.product.harga)}</strong>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Total Harga: </Form.Label>
						<p>
							<strong>Rp. {numberWithCommas(totalHarga)}</strong>
						</p>
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>
							<strong>Jumlah: </strong>
						</Form.Label>
						<br />
						<Button
							variant="primary"
							size="sm"
							className="mr-2"
							onClick={() => handleMinus()}
						>
							<FontAwesomeIcon icon={faMinus} />
						</Button>
						{jumlah}
						<Button
							variant="primary"
							size="sm"
							className="ml-2"
							onClick={() => handlePlus()}
						>
							<FontAwesomeIcon icon={faPlus} />
						</Button>
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextArea1">
						<Form.Label>Keterangan: </Form.Label>
						<Form.Control
							as="textarea"
							rows="3"
							name="keterangan"
							placeholder="contoh: pedas, nasi double"
							value={keterangan}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						SIMPAN
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="danger"
					onClick={() => handleDelete(keranjangDetail.id)}
				>
					<FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalComp;
