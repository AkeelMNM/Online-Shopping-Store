import { User, Login } from '../types';

const API_NAME: string = process.env.USER_API_ADDRESS || '';

export const loginUser = async (
	email: string,
	password: string,
): Promise<Login> => {
	try {
		const response = await fetch(`${API_NAME}/user/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const responseData = await response.json();

		return responseData || {};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const fetchUser = async (userId: string): Promise<User> => {
	try {
		const response = await fetch(`${API_NAME}/user?=${userId}`, {
			method: 'GET',
		});

		const responseData = await response.json();
		console.log('user fetched', responseData);

		return responseData || [];
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const storeUser = async (user: User): Promise<User> => {
	try {
		const response = await fetch(`${API_NAME}/user`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		console.log(response);

		const responseData = await response.json();

		return responseData || {};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateUser = async (id: string, user: User): Promise<User> => {
	try {
		const response = await fetch(`${API_NAME}/user?=${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const responseData = await response.json();

		return responseData || {};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const removeUser = async (id: string): Promise<void> => {
	try {
		const response = await fetch(`${API_NAME}/user?=${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const responseData = await response.json();

		return responseData || {};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
