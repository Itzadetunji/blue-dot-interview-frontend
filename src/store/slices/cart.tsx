import {
  APIVersion1AddToCart,
  APIVersion1ClearCart,
  APIVersion1DeleteItemFromCart,
  APIVersion1GetCart
} from "@/http/v1";
import { AddCartResponseType, AddCartType, CartType } from "@/types/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

export const AddCartSlice = () => {
	return useMutation<AddCartResponseType, Error, AddCartType>({
		mutationFn: APIVersion1AddToCart,
	});
};

export const GetCartSlice = (
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<CartType, Error>({
		queryKey: ["my-cart"],
		queryFn: APIVersion1GetCart,
	});

	React.useEffect(() => {
		onError(getRequestQuery.error);
	}, [getRequestQuery.isError]);

	return getRequestQuery;
};

export const DeleteItemFromCartSlice = () => {
	return useMutation<CartType, Error, { id: string }>({
		mutationFn: APIVersion1DeleteItemFromCart,
	});
};

export const ClearCartSlice = () => {
	return useMutation<CartType, Error>({
		mutationFn: APIVersion1ClearCart,
	});
};
