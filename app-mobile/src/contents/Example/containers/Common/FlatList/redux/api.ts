import { get } from '@utils/api';

export const fetchProducts = (queryString: string) => get(`/properties?${queryString}`);

export const fetchProductById = (id: number) => get(`/properties/${id}`);
