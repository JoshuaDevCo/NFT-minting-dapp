import { useContext } from "react";
import { ErrorContext, TextContext } from "../App";

export default function ErrorNotify() {
	const { showError } = useContext(ErrorContext);
	const { text } = useContext(TextContext);

	return (
		<div className="error">
			<div className="errorMessage" id={showError ? "errOn" : "errOff"}>
				{text}
			</div>
		</div>
	);
}
