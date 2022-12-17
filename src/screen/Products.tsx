import React, { useState } from 'react';
import { Checkbox, ProductCard, ProductModal } from '../components';
import Shirt from '../assets/images/Shirt.png';
import { Product } from '../interfaces';

const Products = () => {
    const [modalVisibility, setModalVisibility] = useState<Boolean>(true);
    const [product, setProduct] = useState<Product>();
    const onSelectGender = (value: string) => { };

    const onSelectCategory = (value: string) => {
        //TO DO: this function need to store the selected value in array not single value
    };

    const onSelectTrends = (value: string) => { };

    const onPressFilter = () => { };

    const onPressProduct = () => { };

    const onPressModal = (item: Product) => {
        setProduct(item);
        setModalVisibility(true);
    }

    return (
        <div className="h-full">
            <div className="grid grid-cols-5 pt-5">
                <div className="col-span-1 px-2">
                    <div className="bg-white shadow-md rounded px-8 pb-2 mb-4 pt-4">
                        <button
                            onClick={onPressFilter}
                            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-sm text-sm px-2 py-1 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40">
                            Filter Products
                        </button>
                        <h3 className="mb-4 pt-2 font-semibold">Gender</h3>
                        <ul className="w-48 text-sm font-medium bg-white dark:text-white">
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Men'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg  border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Women'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Unisex'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                        </ul>
                        <h3 className="mb-4 pt-5 font-semibold">Category</h3>
                        <ul className="w-48 text-sm font-medium bg-white dark:text-white">
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Long Sleeve'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg  border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Slim Fit'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Short Sleeve'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Short'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Summer'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Polo'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Dress'}
                                    onSelect={onSelectGender}
                                />
                            </li>
                        </ul>
                        <h3 className="mb-4 pt-5 font-semibold">Trends</h3>
                        <ul className="w-48 text-sm font-medium bg-white dark:text-white">
                            <li className="w-full rounded-t-lg border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Best Seller'}
                                    onSelect={onSelectTrends}
                                />
                            </li>
                            <li className="w-full rounded-t-lg  border-gray-200 dark:border-gray-600">
                                <Checkbox
                                    value={'Hot This Month'}
                                    onSelect={onSelectTrends}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-4 px-2 overflow-auto h-screen">
                    <div className="grid grid-cols-4 gap-4 justify-between bg-white rounded relative pt-2 px-2 ">
                        <ProductCard
                            name="Casual Slim Fit Shirt"
                            image={Shirt}
                            onPress={onPressProduct}
                            price={35}
                        />
                        <ProductCard
                            name="Casual Slim Fit Shirt"
                            image={Shirt}
                            onPress={onPressProduct}
                            price={35}
                        />
                    </div>
                </div>
            </div>
            <ProductModal visible={modalVisibility} />
        </div>
    );
};

export default Products;
