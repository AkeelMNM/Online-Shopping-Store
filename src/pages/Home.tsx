import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import _ from 'lodash';
import { HomeCard, ProductCard } from '../components';
import { fetchContents } from '../redux/general';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import { ContentType, Product } from '../types';
import { fetchBestSellerProducts } from '../redux/product';

const Home = () => {
	const dispatch = useAppDispatch();
	const carousel: ContentType[] = useAppSelector(
		state => state.general.carousel,
	);
	const quality: ContentType[] = useAppSelector(
		state => state.general.quality,
	);
	const bestSeller: Product[] = useAppSelector(
		state => state.product.bestSeller,
	);

	useEffect(() => {
		dispatch(fetchContents());
		dispatch(fetchBestSellerProducts());
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
					{carousel &&
						carousel.map((item, index) => {
							return (
								<div key={index}>
									<img
										src={item.image}
										alt="Carousel Image"
										crossOrigin="anonymous"
									/>
								</div>
							);
						})}
				</Carousel>
			</div>
			<div className={homeStyles.homeCardContainer}>
				<HomeCard
					title="Support Local"
					description="All the materials are come from local producers. Together we can create a strong and better community."
					image={_.get(quality, '[0].image', '')}
				/>
				<HomeCard
					title="High quality"
					description="Martials are high quality proves to last many years."
					image={_.get(quality, '[1].image', '')}
				/>
				<HomeCard
					title="Eco friendly"
					description="Rest assures product and materiels used will never harm our environment."
					image={_.get(quality, '[2].image', '')}
				/>
			</div>
			<div className={homeStyles.bestSellerContainer}>
				<label className={homeStyles.bestSellerText}>Best Seller</label>
				<div className={homeStyles.productCardContainer}>
					{bestSeller &&
						bestSeller.map((item, index) => {
							return (
								<ProductCard
									key={index}
									name={_.get(item, 'title', '')}
									image={_.get(item, 'variants[0].image', '')}
									onPress={onPressBestSeller}
									price={_.get(item, 'variants[0].price', '')}
								/>
							);
						})}
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
	homeCardContainer:
		'flex flex-col items-center xl:flex lg:flex xl:flex-row lg:flex-row xl:w-full lg:w-full xl:justify-between lg:justify-between p-10',
	bestSellerContainer: 'flex flex-col place-items-center',
	bottomContainer: 'flex flex-col place-items-center',
	bestSellerText: 'p-5 font-serif text-2xl font-semibold',
	productCardContainer:
		'grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-4 p-10',
	partnerText: 'p-5 font-serif text-2xl font-semibold',
};

export default Home;
