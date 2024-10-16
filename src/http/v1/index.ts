import { AxiosResponse } from "axios";
import $http from "../xhr";
import { LoginUserType, RegisterUserType } from "@/types";
import { AddProductType, ProductType } from "@/types/product";
import { User } from "@/store/useUserStore";
import { AddCategoryType, CategoryType } from "@/types/categories";
import { AddCartResponseType, AddCartType, CartType } from "@/types/cart";
import { CreateOrderType } from "@/types/order";

export const APIVersion1Register = async (
	data: RegisterUserType
): Promise<AxiosResponse<User>> => $http.post(`/auth/register`, data);

export const APIVersion1Login = async (
	data: LoginUserType
): Promise<AxiosResponse<User>> =>
	$http.post(`/auth/login`, data).then((res) => res.data);

export const APIVersion1Get = async (): Promise<
	AxiosResponse<Record<string, string>>
> => $http.get(`/auth/login`).then((res) => res.data);

// Products API
export const APIVersion1CreateProduct = async (
	data: AddProductType
): Promise<ProductType> =>
	$http.post(`/products`, data).then((res) => res.data);

export const APIVersion1GetAllProducts = async (params?: {
	name?: string;
	category?: string;
	minPrice?: number;
	maxPrice?: number;
}): Promise<ProductType[]> =>
	$http
		.get(`/products`, {
			params: {
				name: params?.name?.length ? params.name : undefined,
				category: params?.category?.length
					? params.category
					: undefined,
				minPrice: params?.minPrice ? params.minPrice : undefined,
				maxPrice: params?.maxPrice ? params.maxPrice : undefined,
			},
		})
		.then((res) => res.data);

export const APIVersion1GetProduct = async (data: {
	id: string;
}): Promise<ProductType> =>
	$http.get(`/products/${data.id}`).then((res) => res.data);

export const APIVersion1GetMyProducts = async (params?: {
	name?: string;
	category?: string;
	minPrice?: number;
	maxPrice?: number;
}): Promise<ProductType[]> =>
	$http
		.get(`/my-products`, {
			params: {
				name: params?.name?.length ? params.name : undefined,
				category: params?.category?.length
					? params.category
					: undefined,
				minPrice: params?.minPrice ? params.minPrice : undefined,
				maxPrice: params?.maxPrice ? params.maxPrice : undefined,
			},
		})
		.then((res) => res.data);

export const APIVersion1UpdateProduct = async (
	data: Partial<AddProductType> & { id: string }
): Promise<ProductType> =>
	$http
		.put(`/products/${data.id}`, { ...data, id: undefined })
		.then((res) => res.data);

export const APIVersion1DeleteProduct = async (data: {
	id: string;
}): Promise<ProductType> =>
	$http.delete(`/products/${data.id}`).then((res) => res.data);

// Categories API
export const APIVersion1CreateCategory = async (
	data: AddCategoryType
): Promise<AxiosResponse<CategoryType>> =>
	$http.post(`/categories`, data).then((res) => res.data);

export const APIVersion1GetCategories = async (): Promise<CategoryType[]> =>
	$http.get(`/categories`).then((res) => res.data);

export const APIVersion1GetCategory = async (data: {
	id: string;
}): Promise<AxiosResponse<CategoryType>> =>
	$http.get(`/categories/${data.id}`).then((res) => res.data);

export const APIVersion1UpdateCategory = async (
	data: Partial<AddCategoryType> & { id: string }
): Promise<AxiosResponse<CategoryType>> =>
	$http
		.put(`/categories/${data.id}`, { ...data, id: undefined })
		.then((res) => res.data);

export const APIVersion1DeleteCategory = async (data: {
	id: string;
}): Promise<AxiosResponse<CategoryType>> =>
	$http.delete(`/categories/${data.id}`).then((res) => res.data);

// Cart API
export const APIVersion1AddToCart = async (
	data: AddCartType
): Promise<AddCartResponseType> =>
	$http.post(`/cart`, data).then((res) => res.data);

export const APIVersion1GetCart = async (): Promise<CartType> =>
	$http.get(`/cart`).then((res) => res.data);

export const APIVersion1DeleteItemFromCart = async (data: {
	id: string;
}): Promise<CartType> =>
	$http.delete(`/cart/${data.id}`).then((res) => res.data);

export const APIVersion1ClearCart = async (): Promise<CartType> =>
	$http.delete(`/cart`).then((res) => res.data);

// Order API
export const APIVersion1CreateOrder = async (
	data: CreateOrderType
): Promise<AddCartResponseType> =>
	$http.post(`/orders`, data).then((res) => res.data);
