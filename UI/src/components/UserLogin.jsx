import { useState, useEffect } from "react";

const UserLogin = ({ socket }) => {
	const [email, setEmail] = useState("");

	const login = () => {
		const userEmail = document.getElementById("email").value;
		setEmail(userEmail);
		socket.emit("login", { email: userEmail });
	};

	useEffect(() => {
		if (!socket) return;
		socket.on("otpSent", () => {
			const otp = prompt("Please Enter The OTP That Sent To Your Email.");
			socket.emit("otpVerification", { otp, email });
		});

		socket.on("otpFailed", () => {
			alert("OTP Failed");
		});

		socket.on("otpSuccess", (data) => {
			alert("OTP Success");
			localStorage.setItem("token", data.token);
		});
	}, [socket, email]);

	return (
		<>
			<p>Please Enter Your Email</p>
			<label htmlFor="email">Email</label>
			<input type="email" id="email" />
			<button onClick={login}>Login</button>
		</>
	);
};

export default UserLogin;
