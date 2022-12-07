import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ShoppingCart from '../assets/images/ShoppingCart.png';

const carouselImage = [
	'https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
	'https://images.unsplash.com/photo-1655745653127-4d6837baf958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	'https://images.unsplash.com/photo-1516527653392-602455dd9cf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
];

const Home = () => {
	return (
		<div>
			<div className="flex flex-row justify-between">
				<label className="p-5 font-serif text-2xl font-semibold">
					Fashion Store
				</label>{' '}
				<img
					className="w-8 h-8 m-4"
					src={ShoppingCart}
					alt="ShoppingCart"
				/>
			</div>
			<div className="p-5">
				<Carousel
					autoPlay
					interval={5000}
					transitionTime={500}
					infiniteLoop
					showThumbs={false}
					dynamicHeight={false}>
					{carouselImage?.map((item, index) => {
						return (
							<div key={index}>
								<img src={item} alt="Carousel Image" />
							</div>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
};

export default Home;
