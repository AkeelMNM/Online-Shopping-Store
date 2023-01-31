import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { HomeCard, ProductCard } from '../components';
import { fetchProducts } from '../redux/product';
import { useAppSelector, useAppDispatch } from '../redux/hook';

const carouselImage = [
	'https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
	'https://images.unsplash.com/photo-1655745653127-4d6837baf958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	'https://images.unsplash.com/photo-1516527653392-602455dd9cf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
];

const Home = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	const onPressBestSeller = (): void => {};

	return (
		<div className={homeStyles.mainContainer}>
			<div className={homeStyles.carouselContainer}>
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
			<div className={homeStyles.homeCardContainer}>
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
			<div className={homeStyles.bestSellerContainer}>
				<label className={homeStyles.bestSellerText}>Best Seller</label>
				<div className={homeStyles.productCardContainer}>
					<ProductCard
						name="Support Local"
						image="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
						onPress={onPressBestSeller}
						price={'$35'}
					/>
				</div>
			</div>
			<div className={homeStyles.bottomContainer}>
				<label className={homeStyles.partnerText}>
					Trusted by our partners
				</label>
			</div>
		</div>
	);
};

const homeStyles = {
	mainContainer: 'flex flex-col',
	carouselContainer: 'p-5',
	homeCardContainer: 'flex flex-row justify-between p-10',
	bestSellerContainer: 'flex flex-col place-items-center',
	bottomContainer: 'flex flex-col place-items-center',
	bestSellerText: 'p-5 font-serif text-2xl font-semibold',
	productCardContainer: 'flex flex-row p-10',
	partnerText: 'p-5 font-serif text-2xl font-semibold',
};

export default Home;
