import React from 'react';

type HomeCardProps = {
	image: string;
	title: string;
	description: string;
}

const HomeCard = ({ image, title, description }: HomeCardProps) => {
	return (
		<div className="max-w-sm bg-white rounded-t-lg dark:bg-gray-800">
			<img className="rounded-t-lg" src={image} alt={title} />

			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
					{title}
				</h5>

				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
					{description}
				</p>
			</div>
		</div>
	);
};

export { HomeCard };
