import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
// import { useState } from "react";
import Box from "@mui/material/Box";
import DropDown from "./DropDown";
export default function Navbar() {
	// const [anchorEl, setAnchorEl] = useState(null);
	// const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	let community = [
		{ label: "App Development", id: 1 },
		{ label: "Frontend", id: 2 },
		{ label: "Backend", id: 3 },
		{ label: "Full Stack", id: 4 },
		{ label: "AI-ML", id: 5 },
		{ label: "Data Science", id: 6 },
		{ label: "Cloud Computing", id: 7 },
		{ label: "Cyber Security", id: 8 },
		{ label: "Hacking", id: 9 },
	];
	let profileMenu = [
		{ label: "Login", id: 1 },
		{ label: "Profile", id: 2 },
		{ label: "Messages", id: 3 },
	];

	return (
		<>
			<div className="w-full main-bg flex items-center justify-between p-1 px-4">
				<div className="flex items-center">
					<Typography sx={{ display: { xs: "none", md: "flex" } }}>
						<a
							display={"md"}
							href="/"
							className="text-lg text-white font-['Gugi','sans-serif'] mr-8"
						>
							CONNECTZ
						</a>
					</Typography>
					<DropDown array={community} name={`Interests`} />
				</div>
				<div className="search flex items-center bg-white text-sky-700 flex-row-reverse md:w-1/3  rounded-full">
					<button className="absolute p-2">
						<SearchIcon />
					</button>
					<input
						type="text"
						name="search"
						id=""
						placeholder="Search"
						className="p-2 w-full rounded-full border-2 placeholder:text-[#a1a1aa] font-normal "
					/>
				</div>
				<div className="flex justify-center items-center">
					<Box sx={{ display: "flex" }}>
						<DropDown
							array={profileMenu}
							name={<AccountCircle />}
							sx={{ marginLeft: "1rem" }}
						/>
					</Box>
				</div>
			</div>
		</>
	);
}
