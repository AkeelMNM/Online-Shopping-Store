import React from 'react';
import Profile from '../assets/images/Profile.png';
import { User } from '../types';

type UserSettingsDropMenuProps = {
	isOpen: boolean;
	onPressLogOut: () => void;
	onPressHandleDropDown: () => void;
	userData: User;
	onPressSettings: () => void;
	onPressProfile: () => void;
};

const UserSettingsDropMenu = ({
	isOpen,
	onPressLogOut,
	onPressHandleDropDown,
	userData,
	onPressSettings,
	onPressProfile,
}: UserSettingsDropMenuProps) => {
	return (
		<div className={settingsStyles.mainContainer}>
			<button
				onClick={onPressHandleDropDown}
				className={settingsStyles.button}
				type="button">
				<img
					className={settingsStyles.image}
					src={Profile}
					alt="user photo"
				/>
			</button>
			<div
				className={`${isOpen ? 'block' : 'hidden'} ${
					settingsStyles.dropDownContainer
				} `}>
				<div className={settingsStyles.userDetails}>
					<div>{userData.fullName}</div>
					<div className={settingsStyles.emailText}>
						{userData.email}
					</div>
				</div>
				<ul className={settingsStyles.listContainer}>
					<li>
						<a
							onClick={onPressProfile}
							className={settingsStyles.listText}>
							Profile
						</a>
					</li>
					<li>
						<a
							onClick={onPressSettings}
							className={settingsStyles.listText}>
							Settings
						</a>
					</li>
				</ul>
				<div className={settingsStyles.logOutContainer}>
					<a
						onClick={onPressLogOut}
						className={settingsStyles.logOutText}>
						Sign out
					</a>
				</div>
			</div>
		</div>
	);
};

const settingsStyles = {
	mainContainer: 'dropdown',
	button: 'flex mx-3 text-sm rounded-full md:mr-0',
	dropDownContainer:
		'z-10 bg-white divide-y divide-gray-100 right-0 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute',
	image: 'w-8 h-8 rounded-full',
	userDetails: 'px-4 py-3 text-sm text-gray-900 dark:text-white',
	emailText: 'font-medium truncate',
	listContainer: 'py-2 text-sm text-gray-700 dark:text-gray-200',
	listText:
		'block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer',
	logOutContainer: 'py-2',
	logOutText:
		'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer',
};

export { UserSettingsDropMenu };
