import React, { useState, useContext } from "react";
import "../../styles/styles.scss";
import { Context } from "../store/appContext";
import { Formgroup } from "../component/formGroup";
import { useHistory } from "react-router-dom";

export const LoginModal = () => {
	const { actions } = useContext(Context);
	const [Modal, setModal] = useState(false);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	let history = useHistory();

	const login = async () => {
		const resp = await fetch(`https://3001-black-camel-fh347ukm.ws-eu18.gitpod.io/api/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email, password: password })
		});
		if (!resp.ok) setMessage("Wrong mail or password, try again!");
		else {
			const data = await resp.json();
			actions.setUserSession(data.localId, data.idToken);
			emptyFields();
			hideModal();
			history.push("/");
		}
	};
	const emptyFields = () => {
		setEmail("");
		setPassword("");
	};

	const showModal = () => {
		setModal(true);
	};

	const hideModal = () => {
		setModal(false);
	};
	return (
		<div>
			<div className={Modal ? "modal display-block" : "modal display-none"}>
				<section className="modal-main">
					<div className="bg-prin d-flex justify-content-stretch p-4 align-items-center">
						<h5 className="text-white font-prin flex-grow-1 p-0">Log In </h5>
						<button type="button" onClick={hideModal} className="btn">
							<i className="fas fa-times text-white" />
						</button>
					</div>
					<div className="p-4 bg-white d-flex flex-column justify-content-stretch align-items-center">
						<div className="text-dark">{message}</div>
						<Formgroup
							id="inputEmail"
							name="Email"
							type="text"
							placeholder="Enter your email here."
							set={setEmail}
							value={email}
						/>
						<Formgroup
							id="inputPassword"
							name="Password"
							type="password"
							placeholder="Enter your password here."
							set={setPassword}
							value={password}
						/>

						<button type="submit" className="btn bg-prin text-white rounded py-2 px-4" onClick={login}>
							Log in
						</button>
					</div>
				</section>
			</div>
			<button type="button" onClick={showModal} className="btn">
				Log In
			</button>
		</div>
	);
};