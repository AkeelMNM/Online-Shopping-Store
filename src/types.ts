export type Product = {
	id: string;
	category: string[];
	title: string;
	isBestSeller: boolean;
	variants: Variant[];
};

export type Variant = {
	id: string;
	size: string;
	color: string;
	price: string;
	stock: number;
	discount: string;
	image: string;
};

export type CartItem = {
	_id?: string;
	userId: string;
	productId: string;
	variantId: string;
	title: string;
	size: string;
	color: string;
	quantity: number;
	price: number;
	isFreeShipping: boolean;
	image: string;
};

export type Invoice = {
	fullName: string;
	address: string;
	city: string;
	province: string;
	mobileNo: string;
};

export type Content = {
	carouselContent: ContentType[];
	qualityContent: ContentType[];
};

export type ContentType = {
	type: string;
	image: string;
};

export type User = {
	_id?: string;
	fullName: string;
	email: string;
	password: string;
	isActive: boolean;
};

export type Login = {
	_id: string;
	isActive: boolean;
	isVerified: boolean;
	jwtToken: string;
};
