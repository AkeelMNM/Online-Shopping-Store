import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hook';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../redux/user';
import { User } from '../types';
//import { hashUserPassword } from '../utils/hashFunction';

const Register = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullName, setFullName] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [fullNameErr, setFullNameErr] = useState('');
	const [passwordReErr, setPasswordReErr] = useState('');

	const checkReEnterPassword = (value: string): void => {
		if (password !== value) {
			setPasswordReErr(`Password doesn't match`);
		} else {
			setPasswordReErr('');
		}
	};

	const onPressCreateAccount = async (): Promise<void> => {
		if (!fullName && fullName === '') {
			setFullNameErr('Enter FullName');
		} else if (!email && email === '') {
			setEmailErr('Enter email');
		} else if (!password && password === '') {
			setPasswordErr('Enter Password');
		} else {
			const hashedPassword: string = '';//await hashUserPassword(password);

			const user: User = {
				fullName: fullName,
				email: email,
				isActive: true,
				password: hashedPassword
			};
			dispatch(addUser(user));
			navigate('/');
		}
	};

	return (
		<div className={registerStyles.mainContainer}>
			<div className={registerStyles.container}>
				<div className={registerStyles.formContainer}>
					<h1 className={registerStyles.title}>Create Account</h1>
					<input
						type="text"
						className={registerStyles.input}
						value={fullName}
						placeholder="Full Name"
						onChange={event => setFullName(event.target.value)}
					/>
					{fullNameErr && (
						<span className={registerStyles.errorText}>
							{fullNameErr}
						</span>
					)}
					<input
						type="text"
						className={registerStyles.input}
						value={email}
						placeholder="Email"
						onChange={event => setEmail(event.target.value.trim())}
					/>
					{emailErr && (
						<span className={registerStyles.errorText}>
							{emailErr}
						</span>
					)}
					<input
						type="password"
						className={registerStyles.input}
						value={password}
						placeholder="Password"
						onChange={event =>
							setPassword(event.target.value.trim())
						}
					/>
					{passwordErr && (
						<span className={registerStyles.errorText}>
							{passwordErr}
						</span>
					)}
					<input
						type="password"
						className={registerStyles.input}
						name="confirm_password"
						placeholder="Confirm Password"
						onChange={event =>
							checkReEnterPassword(event.target.value.trim())
						}
					/>
					{passwordReErr && (
						<span className={registerStyles.errorText}>
							{passwordReErr}
						</span>
					)}
					<button
						type="submit"
						className={registerStyles.button}
						onClick={onPressCreateAccount}>
						Create Account
					</button>
					<div className={registerStyles.termsLabel}>
						By signing up, you agree to the{' '}
						<a className={registerStyles.termsText} href="#">
							Terms of Service
						</a>{' '}
						and{' '}
						<a className={registerStyles.termsText} href="#">
							Privacy Policy
						</a>
					</div>
				</div>
				<div className={registerStyles.loginLabel}>
					Already have an account?{' '}
					<a className={registerStyles.loginLink} href="/">
						Log in
					</a>
					.
				</div>
			</div>
		</div>
	);
};

const registerStyles = {
	mainContainer: 'bg-grey-lighter min-h-screen flex flex-col',
	container:
		'container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2',
	formContainer: 'bg-white px-6 py-8 rounded shadow-md text-black w-full',
	title: 'mb-8 text-3xl text-center',
	input: 'block border border-grey-light w-full p-3 rounded mt-4',
	button: 'text-white mt-4 bg-blue-600 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-600 font-medium rounded-sm text-sm w-full px-5 mb-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600',
	termsLabel: 'text-center text-sm text-grey-dark mt-4',
	termsText: 'no-underline border-b border-grey-dark text-grey-dark',
	loginLabel: 'text-sm font-semibold mt-2 pt-1 mb-0',
	loginLink:
		'text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out',
	errorText:
		'block mb-2 ml-1 text-xs font-medium text-red-700 dark:text-red-500 mt-1 mb-4 italic',
};

export default Register;
