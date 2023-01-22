export type Product = {
	id: string;
	category: string[];
	title: string;
	isBestSeller: boolean;
	variants: Variant[];
};

type Variant = {
	id: string;
	size: string;
	color: string;
	price: string;
	stock: number;
	discount: string;
	image: string;
};

export type CartItem = {
	id: string,
	color: string,
	size: string,
	price: string,
	quantity: number
}
