import crypto from "crypto";
import { ethers } from "ethers";
import abi from "../../abi/abi.json"

const generateCredentialHandler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const hash = crypto.createHash("sha256").update(req.body.fileName).digest("hex");
            console.log("Generated file hash:", hash);

            const provider = new ethers.JsonRpcProvider(
                "https://ethereum-sepolia-rpc.publicnode.com"
            );

            const adminPrivateKey =
                "67772e1968ce8f9e0c48db1394bd7a4544357087dcbb3b0d86f55972d1da0c06";
            const adminAccountAddress =
                "0x577B88d1C38C488172D2Ca9ea94572f515e254Ec";


            const wallet = new ethers.Wallet(adminPrivateKey, provider);
            const account0 = {
                address: adminAccountAddress,
                signer: wallet
            };

            const contractAddress = "0x71a62Caa0685b8c97FBA249B6CEf4f2CcbD2180D";

            const contract = new ethers.Contract(contractAddress, abi, account0.signer);

            const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours expiration time

            try {
                const transaction = await contract.issueCredential(
                    req.body.walletAddress,
                    ethers.getBytes('0x' + hash),
                    expiresAt
                );

                const receipt = await transaction.wait();
                console.log("Credential issued. Transaction receipt:", receipt.logs);

                return res.status(200).json({
                    message: "Credential generated successfully",
                    fileHash: receipt.logs[0].topics[1],
                });
            } catch (error) {
                console.error("Error during transaction:", error);
                return res.status(500).json({
                    message: "Transaction failed",
                    error: error.message,
                });
            }
        } catch (error) {
            return res.status(500).json({ error: "Error generating hash" + error });
        }
    } else {

    }
};

export default generateCredentialHandler;
