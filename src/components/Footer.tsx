import React from 'react';

const Footer = () => {
	return (
		<footer className={footerStyles.mainContainer}>
			<span className={footerStyles.rightsText}>
				© 2022 <a className={footerStyles.hoverText}>FashionStudio™</a>.
				All Rights Reserved.
			</span>
			<ul className={footerStyles.linkContainer}>
				<li>
					<a href="#" className={footerStyles.link}>
						About
					</a>
				</li>
				<li>
					<a href="#" className={footerStyles.link}>
						Privacy Policy
					</a>
				</li>
				<li>
					<a href="#" className={footerStyles.link}>
						Licensing
					</a>
				</li>
				<li>
					<a href="#" className={footerStyles.hoverText}>
						Contact
					</a>
				</li>
			</ul>
		</footer>
	);
};

const footerStyles = {
	mainContainer:
		'p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800',
	rightsText: 'text-sm text-gray-500 sm:text-center dark:text-gray-400',
	linkContainer:
		'flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0',
	link: 'mr-4 hover:underline md:mr-6',
	hoverText: 'hover:underline',
};

export { Footer };
