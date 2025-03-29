import * as CryptoJS from "crypto-js";
import Config from "../config";

export function TranslateCode(ip: string) {
	const hashed = CryptoJS.SHA256(Config.CODE_PREFIX + ip).toString(
		CryptoJS.enc.Hex
	);

	return hashed;
}

function generateRandomString(length: number): string {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}
	return result;
}

export function code() {
	return generateRandomString(6);
}
