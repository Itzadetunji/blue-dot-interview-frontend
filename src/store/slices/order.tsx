import { APIVersion1AddToCart, APIVersion1CreateOrder } from "@/http/v1";
import { AddCartResponseType, AddCartType } from "@/types/cart";
import { CreateOrderType } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

export const CreateOrderSlice = () => {
	return useMutation<AddCartResponseType, Error, CreateOrderType>({
		mutationFn: APIVersion1CreateOrder,
	});
};
