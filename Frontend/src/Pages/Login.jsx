import { useState } from "react";
import BtnContinue from "../Components/BtnContinue";
export default function Login() {
	let [formData, setFormData] = useState({
		userName: "",
		password: "",
	});

	const handleInpChange = (event) => {
		setFormData((currData) => {
			return { ...currData, [event.target.name]: event.target.value };
		});
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
		setFormData({
			userName: "",
			password: "",
		});
	};

	return (
		<div className="main-body-div">
			<div className="content-body-div">
				<h2 className="connectz-head">CONNECTZ</h2>
				<p className="text-md my-2">Log in to continue</p>
				<form action="/login" className="w-full" onSubmit={handleSubmit}>
					<input
						type="text"
						name="userName"
						id="userName"
						value={formData.userName}
						onChange={handleInpChange}
						className="inp-box"
						placeholder="Enter your username"
					/>
					<input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleInpChange}
						className="inp-box"
						placeholder="Password"
					/>
					<br />
					<BtnContinue />
				</form>
				<p className="text-sm mt-4 mb-2 text-gray-500">or continue with:</p>
				<button className="border-2 btn-style flex justify-center">
					<span>
						<img
							src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.541/google-logo.5867462c.svg"
							alt="Google"
							className="w-6 h-6 mr-2"
						/>
					</span>
					<span>Google</span>
				</button>
				<span className="mt-4 text-sm"> Don't you have an account?</span>
				<a href="" className="text-sm text-blue-900 hover:underline">
					Create an account
				</a>
				<div className="mt-4 flex flex-col items-center border-t border-neutral-300 w-full">
					<h2 className="text-md text-sky-700 font-['Gugi','sans-serif'] mt-2">
						CONNECTZ
					</h2>
					<div className="">
						<a href="" className="text-xs mr-4">
							Privacy Policy
						</a>
						<a href="" className="text-xs">
							User Notice
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
