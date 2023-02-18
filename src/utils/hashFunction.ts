import sha256 from 'crypto-js/sha256';

export const hashUserPassword = async (password: string): Promise<string> => {
	const hash: string = sha256(password).toString();
	return hash;
};
