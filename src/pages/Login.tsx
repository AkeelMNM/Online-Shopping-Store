import React, { useState } from 'react';
import LoginImage from '../assets/images/Login.png';
import { useAppDispatch } from '../redux/hook';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { fetchUser } from '../redux/user';
import { loginUser } from '../services/UserService';
import { Login } from '../types';
import { hashUserPassword } from '../utils/hashFunction';

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [loginErr, setLoginErr] = useState('');

	const onPressLogin = async (): Promise<void> => {
		if (!email && email === '') {
			setEmailErr('Enter email');
		} else if (!password && password === '') {
			setPasswordErr('Enter Password');
		} else {
			const hashedPassword: string = await hashUserPassword(password);

			const login: Login = await loginUser(email, hashedPassword);

			if (login.isVerified) {
				dispatch(fetchUser(login._id));
				navigate('/home');
			} else {
				setLoginErr(login.message);
			}
		}
	};

	const onChangeEmailValidation = (value: string) => {
		if (validator.isEmail(value)) {
			setEmailErr('');
		} else {
			setEmailErr('Enter a valid email.');
		}

		setEmail(value);
	};

	return (
		<section className={loginStyles.mainContainer}>
			<div className={loginStyles.container}>
				<div className={loginStyles.gridContainer}>
					<div className={loginStyles.imageContainer}>
						<img
							src={LoginImage}
							className={loginStyles.image}
							alt="Sample image"
						/>
					</div>
					<div className={loginStyles.formContainer}>
						<label className={loginStyles.welcomeLabel}>
							Hello, Welcome to Fashion Store
						</label>
						<form className={loginStyles.form}>
							<div className={loginStyles.formDivision}>
								<input
									type="text"
									className={loginStyles.input}
									id="email"
									placeholder="Email address"
									value={email}
									onChange={event =>
										onChangeEmailValidation(
											event.target.value.trim(),
										)
									}
								/>
								{emailErr && (
									<span className={loginStyles.errorText}>
										{emailErr}
									</span>
								)}
							</div>
							<div className={loginStyles.formDivision}>
								<input
									type="password"
									className={loginStyles.input}
									id="password"
									placeholder="Password"
									value={password}
									onChange={event =>
										setPassword(event.target.value.trim())
									}
								/>
								{passwordErr && (
									<span className={loginStyles.errorText}>
										{passwordErr}
									</span>
								)}
							</div>
							{loginErr && (
								<span className={loginStyles.loginError}>
									{loginErr}
								</span>
							)}
							<div className={loginStyles.rememberMeContainer}>
								<div
									className={
										loginStyles.rememberMeCheckBoxDiv
									}>
									<input
										type="checkbox"
										className={
											loginStyles.rememberMeCheckBox
										}
										id="exampleCheck2"
									/>
									<label
										className={loginStyles.rememberMeLabel}>
										Remember me
									</label>
								</div>
								<a
									href="#!"
									className={loginStyles.forgotPassword}>
									Forgot password?
								</a>
							</div>
							<div className={loginStyles.buttonContainer}>
								<button
									type="button"
									onClick={onPressLogin}
									className={loginStyles.button}>
									Login
								</button>
								<p className={loginStyles.haveAccountLabel}>
									Don't have an account?{' '}
									<a
										href="/register"
										className={loginStyles.registerLabel}>
										Register
									</a>
								</p>
							</div>
							<div className={loginStyles.otherOptionContainer}>
								<p className={loginStyles.optionLabel}>Or</p>
							</div>
							<div className={loginStyles.signInOptionContainer}>
								<p className={loginStyles.signInOption}>
									Sign in with
								</p>
								<button
									type="button"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									className={loginStyles.signInOptionButton}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 320 512"
										className={
											loginStyles.signInOptionImage
										}>
										<path
											fill="currentColor"
											d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
										/>
									</svg>
								</button>
								<button
									type="button"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									className={loginStyles.signInOptionButton}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										className={
											loginStyles.signInOptionImage
										}>
										<path
											fill="currentColor"
											d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
										/>
									</svg>
								</button>
								<button
									type="button"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									className={loginStyles.signInOptionButton}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										className={
											loginStyles.signInOptionImage
										}>
										<path
											fill="currentColor"
											d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
										/>
									</svg>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

const loginStyles = {
	mainContainer: 'h-screen',
	container: 'px-6 h-full text-gray-800',
	gridContainer:
		'flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6',
	imageContainer:
		'grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0',
	image: 'w-full',
	welcomeLabel: 'pt-2 mt-2 font-sans text-2xl font-semibold',
	formContainer: 'xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0',
	form: 'mt-5',
	formDivision: 'mb-6',
	input: 'form-control block w-full px-4 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none',
	rememberMeContainer: 'flex justify-between items-center mb-6',
	rememberMeCheckBoxDiv: 'form-group form-check',
	rememberMeCheckBox:
		'form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer',
	rememberMeLabel: 'form-check-label inline-block text-gray-800',
	forgotPassword: 'text-gray-800',
	buttonContainer: 'text-center lg:text-left',
	button: 'inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out',
	haveAccountLabel: 'text-sm font-semibold mt-2 pt-1 mb-0',
	registerLabel:
		'text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out',
	otherOptionContainer:
		'flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5',
	optionLabel: 'text-center font-semibold mx-4 mb-0',
	signInOptionContainer:
		'flex flex-row items-center justify-center lg:justify-start',
	signInOption: 'text-lg mb-0 mr-4',
	signInOptionButton:
		'inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1',
	signInOptionImage: 'w-4 h-4',
	errorText:
		'block mb-2 text-sm font-medium text-red-700 dark:text-red-500 mt-1 italic',
	loginError:
		'block mb-4 font-medium text-red-700 dark:text-red-500 italic',
};

export default Login;
