import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import validator from 'validator';
import { updateUser } from '../redux/user';
import { PasswordStatus, User } from '../types';
import { hashUserPassword } from '../utils/hashFunction';
import { passwordValidation } from '../services/UserService';

const UpdateUserProfile = () => {
	const dispatch = useAppDispatch();
	const user: User = useAppSelector(state => state.user.user);
	const [id, setId] = useState('');
	const [email, setEmail] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [fullName, setFullName] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [oldPasswordErr, setOldPasswordErr] = useState('');
	const [newPasswordErr, setNewPasswordErr] = useState('');
	const [fullNameErr, setFullNameErr] = useState('');
	const [newPasswordReErr, setNewPasswordReErr] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setEmail(user.email);
		setFullName(user.fullName);
		setId(user._id);
	}, [user]);

	const checkReEnterPassword = (value: string): void => {
		if (newPassword !== value) {
			setNewPasswordReErr(`Password doesn't match`);
		} else {
			setNewPasswordReErr('');
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

	const onChangePasswordValidation = (value: string) => {
		const isPasswordStrong = validator.isStrongPassword(value, {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		});

		if (isPasswordStrong) {
			setNewPasswordErr('');
		} else {
			setNewPasswordErr(
				'Password must have minimum 8 characters with at least one uppercase, lowercase and special character.',
			);
		}

		setNewPassword(value);
	};

	const onPressUpdateDetails = async (): Promise<void> => {
		if (!fullName && fullName === '') {
			setFullNameErr('Enter FullName');
		} else if (!email && email === '') {
			setEmailErr('Enter email');
		} else {
			const updatedUser: User = {
				_id: user._id,
				fullName: fullName,
				email: email,
				isActive: user.isActive,
				password: '',
			};

			dispatch(updateUser(user._id, updatedUser));
		}
	};

	const onPressUpdatePassword = async (): Promise<void> => {
		if (!oldPassword && oldPassword === '') {
			setNewPasswordErr('Enter Old Password');
		} else if (!newPassword && newPassword === '') {
			setNewPasswordErr('Enter New Password');
		} else {
			const hashedOldPassword: string = await hashUserPassword(
				oldPassword,
			);
			const hashedPassword: string = await hashUserPassword(newPassword);
			const response: PasswordStatus = await passwordValidation(
				hashedOldPassword,
				hashedPassword,
			);

			if (response.IsPasswordNotSame) {
				const updatedUser: User = {
					_id: user._id,
					fullName: user.fullName,
					email: user.email,
					isActive: user.isActive,
					password: hashedPassword,
				};
				dispatch(updateUser(user._id, updatedUser));
				setErrorMessage('');
			} else {
				setErrorMessage(response.message);
			}
		}
	};

	return (
		<div className={updateUserProfileStyles.mainContainer}>
			<div className={updateUserProfileStyles.container}>
				<div className={updateUserProfileStyles.formContainer}>
					<h1 className={updateUserProfileStyles.title}>
						Update User Profile
					</h1>
					<div>
						<input
							type="text"
							className={updateUserProfileStyles.input}
							value={fullName}
							placeholder="Full Name"
							onChange={event =>
								setFullName(event.target.value.trim())
							}
						/>
						{fullNameErr && (
							<span className={updateUserProfileStyles.errorText}>
								{fullNameErr}
							</span>
						)}
						<input
							type="text"
							className={updateUserProfileStyles.input}
							value={email}
							placeholder="Email"
							onChange={event =>
								onChangeEmailValidation(
									event.target.value.trim(),
								)
							}
						/>
						{emailErr && (
							<span className={updateUserProfileStyles.errorText}>
								{emailErr}
							</span>
						)}
						<button
							type="submit"
							className={updateUserProfileStyles.button}
							onClick={onPressUpdateDetails}>
							Update Details
						</button>
					</div>
					<div>
						<input
							type="password"
							className={updateUserProfileStyles.input}
							value={oldPassword}
							placeholder="Old Password"
							onChange={event =>
								setOldPassword(event.target.value.trim())
							}
						/>
						{oldPasswordErr && (
							<span className={updateUserProfileStyles.errorText}>
								{oldPassword}
							</span>
						)}
						<input
							type="password"
							className={updateUserProfileStyles.input}
							value={newPassword}
							placeholder="New Password"
							onChange={event =>
								onChangePasswordValidation(
									event.target.value.trim(),
								)
							}
						/>
						{newPasswordErr && (
							<span className={updateUserProfileStyles.errorText}>
								{newPasswordErr}
							</span>
						)}
						<input
							type="password"
							className={updateUserProfileStyles.input}
							name="confirm_password"
							placeholder="Confirm New Password"
							onChange={event =>
								checkReEnterPassword(event.target.value.trim())
							}
						/>
						{newPasswordReErr && (
							<span className={updateUserProfileStyles.errorText}>
								{newPasswordReErr}
							</span>
						)}
						<button
							type="submit"
							className={updateUserProfileStyles.button}
							onClick={onPressUpdatePassword}>
							Update Password
						</button>
						{errorMessage && (
							<div
								className={
									updateUserProfileStyles.passwordErrorLabel
								}>
								{errorMessage}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const updateUserProfileStyles = {
	mainContainer: 'bg-grey-lighter min-h-screen flex flex-col',
	container:
		'container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2',
	formContainer: 'bg-white px-6 py-8 rounded shadow-md text-black w-full',
	title: 'mb-8 text-3xl text-center',
	input: 'block border border-grey-light w-full p-3 rounded mt-4',
	button: 'text-white mt-4 bg-blue-600 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-600 font-medium rounded-sm text-sm w-full px-5 mb-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600',
	errorText:
		'block mb-2 ml-1 text-xs font-medium text-red-700 dark:text-red-500 mt-1 mb-4 italic',
	passwordErrorLabel:
		'block mb-2 ml-1 text-sm font-medium text-red-700 dark:text-red-500 mt-1 mb-4 ',
};

export default UpdateUserProfile;
