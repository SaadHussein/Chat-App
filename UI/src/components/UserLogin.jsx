import { useState, useEffect } from "react";
import useAppStore from "../stores/appStore";

const UserLogin = ({ socket }) => {
	const [email, setEmail] = useState("");
	const { setModal } = useAppStore();

	const login = (e) => {
		e.preventDefault();
		const userEmail = document.getElementById("email").value;
		setEmail(userEmail);
		socket.emit("login", { email: userEmail });
	};

	useEffect(() => {
		if (!socket) return;
		socket.on("otpSent", () => {
			const userEmail = document.getElementById("email").value;
			setModal({
				show: true,
				children: (
					<>
						<label
							htmlFor="YourOTP"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
						>
							Please Enter The OTP That Sent To Your Email.
						</label>
						<input
							type="text"
							id="YourOTP"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="OTP"
							required
						/>
					</>
				),
				onClick: () => {
					const otpValue = document.getElementById("YourOTP").value;
					socket.emit("otpVerification", { otp: otpValue, email: userEmail });
					setModal({
						show: false,
					});
				},
			});
		});

		socket.on("otpFailed", () => {
			alert("OTP Failed");
		});
	}, [socket]);

	return (
		<>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in or Create an account.
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2 mb-4">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="button"
							onClick={login}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLogin;
