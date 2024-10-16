import {
	APIVersion1CreateProduct,
	APIVersion1DeleteProduct,
	APIVersion1GetAllProducts,
	APIVersion1GetMyProducts,
	APIVersion1GetProduct,
	APIVersion1UpdateProduct,
} from "@/http/v1";
import { AddProductType, ProductType } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import {} from "axios";
import React from "react";

export const CreateProductSlice = () => {
	return useMutation<ProductType, Error, AddProductType>({
		mutationFn: APIVersion1CreateProduct,
	});
};

export const GetAllProductsSlice = (
	params?: {
		name?: string;
		category?: string;
		minPrice?: number;
		maxPrice?: number;
	},
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<ProductType[], Error>({
		queryKey: ["all-products", params],
		queryFn: () => APIVersion1GetAllProducts(params),
		retry: 2,
	});

	React.useEffect(() => {
		onError(getRequestQuery.error);
	}, [getRequestQuery.isError]);

	return getRequestQuery;
};

export const GetMyProductsSlice = (
	params?: {
		name?: string;
		category?: string;
		minPrice?: number;
		maxPrice?: number;
	},
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<ProductType[], Error>({
		queryKey: ["my-products", params],
		queryFn: () => APIVersion1GetMyProducts(params),
		retry: 2,
	});

	React.useEffect(() => {
		onError(getRequestQuery.error);
	}, [getRequestQuery.isError]);

	return getRequestQuery;
};

export const GetProductSlice = (
	id: string,
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<ProductType, Error>({
		queryKey: ["product-" + id],
		queryFn: () => APIVersion1GetProduct({ id }),
	});

	React.useEffect(() => {
		onError(getRequestQuery.error);
	}, [getRequestQuery.isError]);

	return getRequestQuery;
};

export const UpdateProductSlice = () => {
	return useMutation<ProductType, Error, AddProductType & { id: string }>({
		mutationFn: APIVersion1UpdateProduct,
	});
};

export const DeleteProductSlice = () => {
	return useMutation<ProductType, Error, { id: string }>({
		mutationFn: APIVersion1DeleteProduct,
	});
};
