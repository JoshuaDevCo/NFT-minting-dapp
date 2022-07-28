import img1 from "../Images/9.png";
import img2 from "../Images/6.png";
import img3 from "../Images/10.png";
import img4 from "../Images/15.png";
import img5 from "../Images/openSea.png";

export default function Info() {
	return (
		<div>
			<div className="aboutInfo">
				<div className="details1">
					16 Emojis created with the ERC721 standard, living on the Rinkeby
					blockchain!
				</div>
				<div className="details2">Check us out on OpenSea!</div>
			</div>

			<div className="socials">
				<a
					href="https://testnets.opensea.io/collection/the-emojis"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						className="click"
						src={img5}
						alt="OpenSea"
						height={80}
						width={80}
					/>
				</a>
			</div>
			<div className="images">
				<img
					className="space"
					src={img1}
					alt="Emoji"
					height={200}
					width={200}
				/>
				<img
					className="space"
					src={img2}
					alt="Emoji"
					height={200}
					width={200}
				/>
				<img
					className="space"
					src={img3}
					alt="Emoji"
					height={200}
					width={200}
				/>
				<img
					className="space"
					src={img4}
					alt="Emoji"
					height={200}
					width={200}
				/>
			</div>
			<div className="spaceBottom"></div>
		</div>
	);
}
