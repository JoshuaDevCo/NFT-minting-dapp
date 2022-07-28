import { useState, createContext } from "react";
import "./CSS/Styles.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ErrorNotify from "./Components/ErrorMsg";

export const WalletContext = createContext();
export const LoggedInContext = createContext();
export const ErrorContext = createContext();
export const TextContext = createContext();

export default function App() {
	const [walletAddress, setWalletAddress] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [showError, setShowError] = useState(false);
	const [text, setText] = useState("");

	return (
		<div>
			<WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
				<LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
					<ErrorContext.Provider value={{ showError, setShowError }}>
						<TextContext.Provider value={{ text, setText }}>
							<Navbar />
							<ErrorNotify />

							<Routes>
								<Route exact path="/" element={<Home />} />
								<Route path="/about" element={<About />} />
							</Routes>
						</TextContext.Provider>
					</ErrorContext.Provider>
				</LoggedInContext.Provider>
			</WalletContext.Provider>
		</div>
	);
}
