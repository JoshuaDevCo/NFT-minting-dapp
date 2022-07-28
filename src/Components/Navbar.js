import { useState, useEffect, useContext } from "react";
import { provider, signer } from "../ABI";
import { Link } from "react-router-dom";
import {
	ErrorContext,
	LoggedInContext,
	TextContext,
	WalletContext,
} from "../App";
/*eslint-disable*/
export default function Navbar() {
	const { walletAddress, setWalletAddress } = useContext(WalletContext);
	const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
	const { setShowError } = useContext(ErrorContext);
	const { setText } = useContext(TextContext);

	const [buttonText, setButtonText] = useState("Connect wallet");
	const [isOpen, setIsOpen] = useState(false);

	const connectNetwork = async () => {
		const chainId = 4; //rinkeby
		if (window.ethereum.networkVersion !== chainId) {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x4" }],
			});

			userAddress();
			setLoggedIn(true);
		}
	};

	const connectWallet = async () => {
		if (window.ethereum) {
			await provider.send("eth_requestAccounts", []);
			connectNetwork();

			window.ethereum.on("accountsChanged", function () {
				userAddress();
			});

			window.ethereum.on("networkChanged", function () {
				window.location.reload();
			});
		} else {
			setButtonText("Connect Wallet");
			setShowError(true);
			setText("Please install MetaMask");

			const err2 = setTimeout(() => {
				setShowError(false);
			}, 2000);

			return () => clearTimeout(err2);
		}
	};

	const userAddress = async () => {
		const signerAddress = await signer.getAddress();
		setWalletAddress(signerAddress);
		setButtonText(walletAddress.substring(0, 6) + "...");
	};

	useEffect(() => {
		connectWallet();
	}, []);

	useEffect(() => {
		userAddress();
	}, [walletAddress, loggedIn]);

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}
	const [windowSize, setWindowSize] = useState(getWindowSize());

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	const toggleSmall = () => {
		if (isOpen === true && windowSize.innerWidth >= 600) {
			setIsOpen(false);
		}
	};

	const bigScreen = () => {
		return (
			<nav className="navbar">
				<div className="toggle" onClick={() => setIsOpen(true)}>
					<div className="bars">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div className="navbarLeft">
					<Link className="home" to="/">
						Home
					</Link>

					<Link className="about" to="/about">
						About
					</Link>
				</div>
				<button className="connectButton" onClick={connectWallet}>
					{buttonText}
				</button>
			</nav>
		);
	};

	const smallScreen = () => {
		return (
			<nav className="newNav">
				<div
					className="toggle"
					onClick={() => setIsOpen(false)}
					{...toggleSmall()}
				>
					<div className="x">X</div>
					<div className="bars" id={isOpen ? "off" : "on"}>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>

				<div className="navBarLeft2">
					<Link className="home2" to="/">
						Home
					</Link>

					<Link className="about2" to="/about">
						About
					</Link>
				</div>
				<div className="button2">
					<button className="connectButton2" onClick={connectWallet}>
						{buttonText}
					</button>
				</div>
			</nav>
		);
	};
	return <div>{!isOpen ? bigScreen() : smallScreen()}</div>;
}
