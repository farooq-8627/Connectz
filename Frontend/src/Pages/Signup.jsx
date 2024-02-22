import { useState } from "react";
import BtnContinue from "../Components/BtnContinue";

export default function SignUp() {
	let [formData, setFormData] = useState({
		fullName: "",
		userName: "",
		email: "",
		password: "",
		conformPassword: "",
		gender: ["Male", "Female"],
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
			fullName: "",
			userName: "",
			email: "",
			password: "",
			conformPassword: "",
			gender: ["Male", "Female"],
		});
	};
	return (
		<div className="main-body-div">
			<div className="content-body-div">
				<h2 className="connectz-head">CONNECTZ</h2>
				<p className="text-md my-2">Create an account with us</p>
				<form action="" className="w-full" onSubmit={handleSubmit}>
					<input
						type="text"
						name="fullName"
						id="fullName"
						value={formData.fullName}
						onChange={handleInpChange}
						className="inp-box"
						placeholder="Full Name"
					/>
					<input
						type="text"
						name="userName"
						id="userName"
						value={formData.userName}
						onChange={handleInpChange}
						className="inp-box"
						placeholder="Username"
					/>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleInpChange}
						className="inp-box"
						placeholder="Email"
					/>
					<div className="flex max-[420px]:flex-col lg:flex-row justify-between">
						<input
							type="password"
							name="password"
							id="password"
							value={formData.password}
							onChange={handleInpChange}
							className="inp-box mr-1"
							placeholder="Password"
						/>
						<input
							type="password"
							name="conformPassword"
							id="conformPassword"
							value={formData.conformPassword}
							onChange={handleInpChange}
							className="inp-box"
							placeholder="Conform Password"
						/>
					</div>
					<div className="mt-2">
						<span className="text-md mx-2 mr-8">Gender</span>
						<input
							type="radio"
							name="gender"
							id="male"
							value={formData.gender[0]}
							onChange={handleInpChange}
						/>
						<label htmlFor="male" className="mx-2 mr-4">
							Male
						</label>
						<input
							type="radio"
							name="gender"
							id="female"
							value={formData.gender[1]}
							onChange={handleInpChange}
						/>
						<label htmlFor="female" className="mx-2">
							Female
						</label>
					</div>
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
				<span className="mt-4 text-sm"> Already have an account</span>
				<a href="" className="text-sm text-blue-900 hover:underline">
					Log in
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
