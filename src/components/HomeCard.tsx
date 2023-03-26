import React from 'react';

type HomeCardProps = {
	image: string;
	title: string;
	description: string;
};

const HomeCard = ({ image, title, description }: HomeCardProps) => {
	return (
		<div className={homeCardStyles.mainContainer}>
			<img className={homeCardStyles.image} src={image} alt={title} crossOrigin="anonymous" />
			<div className={homeCardStyles.container}>
				<h5 className={homeCardStyles.title}>{title}</h5>
				<p className={homeCardStyles.desc}>{description}</p>
			</div>
		</div>
	);
};

const homeCardStyles = {
	mainContainer:
		'max-w-sm bg-white rounded-t-lg dark:bg-gray-800 mb-5 lg:ml-2',
	image: 'rounded-t-lg',
	container: 'p-5',
	title: 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center',
	desc: 'mb-3 font-normal text-gray-700 dark:text-gray-400',
};

export { HomeCard };
