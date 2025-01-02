import * as React from "react";
export default function Demo() {
	return (
		<div
			style={{
				position: "relative",
				paddingBottom: "100%",
				height: 0,
				marginBottom: "80px",
			}}
		>
			<iframe
				title="Demo"
				src="https://demo-smart-sessions.biconomy.io/"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					minHeight: "800px",
					border: "1px solid #eee",
					borderRadius: "8px",
				}}
				allow="clipboard-write"
			/>
		</div>
	);
}
