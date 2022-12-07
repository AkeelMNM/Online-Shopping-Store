import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ShoppingCart from '../assets/images/ShoppingCart.png';
import { HomeCard } from '../components';

const carouselImage = [
	'https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
	'https://images.unsplash.com/photo-1655745653127-4d6837baf958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	'https://images.unsplash.com/photo-1516527653392-602455dd9cf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
];

interface BestSellerCardProps {
	name: string;
	image: string;
	price: number;
	onPress: () => void;
}

const BestSellerCard = (props: BestSellerCardProps) => {
	return (
		<div onClick={props.onPress} className="group">
			<div className="aspect-w-1 aspect-h-1 w-1/3 overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
				<img
					src={props.image}
					className="h-full w-full object-cover object-center group-hover:opacity-75"
				/>
			</div>
			<h3 className="mt-4 text-sm text-gray-700">{props.name}</h3>
			<p className="mt-1 text-lg font-medium text-gray-900">
				${props.price}
			</p>
		</div>
	);
};

const Home = () => {
	return (
		<div>
			<div className="flex flex-row justify-between">
				<label className="p-5 font-serif text-4xl font-semibold">
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
			<div className="flex flex-row justify-between p-10">
				<HomeCard
					title="Support Local"
					description="All the materials are come from local producers. Together we can create a strong and better community."
					image="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
				/>
				<HomeCard
					title="High quality"
					description="Martials are high quality proves to last many years."
					image="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
				/>
				<HomeCard
					title="Eco friendly"
					description="Rest assures product and materiels used will never harm our environment."
					image="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
				/>
			</div>
			<div className="flex flex-col place-items-center">
				<label className="p-5 font-serif text-2xl font-semibold">
					Best Seller
				</label>
				<div className="flex flex-row p-10">
					<BestSellerCard
						name="Support Local"
						image="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
						onPress={() => {}}
						price={35}
					/>
				</div>
			</div>
			<div className="flex flex-col place-items-center">
				<label className="p-5 font-serif text-2xl font-semibold">
					Trusted by our partners
				</label>
			</div>
		</div>
	);
};

export default Home;
