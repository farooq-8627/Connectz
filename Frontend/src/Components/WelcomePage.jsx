export default function WelcomePage() {
	return (
		<div
			className="bg-cover bg-center h-96 w-full flex items-center"
			style={{
				backgroundImage: "url('./chat_interface.png')",
			}}
		>
			<div className="w-fit ml-12">
				<h2 className="text-3xl">
					Welcome to <span className="connectz-head">Connectz</span>
				</h2>
				<p>An app where you can connect people professionally</p>
			</div>
		</div>
	);
}
