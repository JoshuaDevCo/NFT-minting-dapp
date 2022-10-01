import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import { contract } from "../ABI";
import {
	ErrorContext,
	LoggedInContext,
	TextContext,
	WalletContext,
} from "../App";
import img5 from "../Images/openSea.png";

export default function Minter() {
	const { walletAddress } = useContext(WalletContext);
	const { loggedIn } = useContext(LoggedInContext);
	const { setShowError } = useContext(ErrorContext);
	const { setText } = useContext(TextContext);

	const [liveCount, setLiveCount] = useState(0);

	const liveMintCount = async () => {
		const mintCount = await contract.totalSupply();
		setLiveCount(mintCount.toString());
	};

	const mint = async () => {
		try {
			await contract.mint(walletAddress, {
				value: ethers.utils.parseEther((0.001).toString()),
			});
		} catch (error) {
			setShowError(true);
			setText("There was an error");
			const err1 = setTimeout(() => {
				setShowError(false);
			}, 2000);

			return () => clearTimeout(err1);
		}
	};

	useEffect(() => {
		liveMintCount();
	}, [loggedIn]);

	const notConnected = () => {
		return (
			<div>
				<div className="setBg">
					<div className="background">
						<div className="notConnected">
							You must connect your wallet and connect to the Goerli network to
							mint
						</div>
					</div>
				</div>

				<div className="setFooter">
					<a
						href="https://testnets.opensea.io/collection/the-emojis"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="click"
							src={img5}
							alt="OpenSea"
							height={50}
							width={50}
						/>
					</a>
				</div>
			</div>
		);
	};

	const connected = () => {
		return (
			<div>
				<div className="setBg">
					<div className="background">
						<div className="font">
							You can mint a max of one Emoji per wallet!
						</div>
						<button className="mintButton" onClick={mint}>
							Mint
						</button>
						<div className="count">{liveCount}/16</div>
					</div>
				</div>
				<div className="setFooter">
					<a
						href="https://testnets.opensea.io/collection/the-emojis"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="click"
							src={img5}
							alt="OpenSea"
							height={50}
							width={50}
						/>
					</a>
				</div>
			</div>
		);
	};

	return <div>{loggedIn ? connected() : notConnected()}</div>;
}
