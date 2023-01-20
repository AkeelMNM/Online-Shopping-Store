const API_NAME: string = process.env.API_ADDRESS || '';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_NAME}/product`, {
            method: 'GET'
        });

        const responseData = await response.json();
        console.log('products fetched', responseData);

        return responseData || [];
    } catch (error) {
        console.error(error);
    }
};

export const getProduct = (id: string) => { };
