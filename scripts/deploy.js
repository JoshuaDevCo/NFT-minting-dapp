const hre = require("hardhat");

async function main() {
	const Emojis = await hre.ethers.getContractFactory("Emojis");
	const emojis = await Emojis.deploy();

	await emojis.deployed();

	console.log("Contract deployed to", emojis.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
