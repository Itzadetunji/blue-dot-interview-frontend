import { z } from "zod";
import { ProductType } from "./product";

export const AddCartSchema = z.object({
	productId: z.string(),
	quantity: z.number(),
});

export type AddCartType = z.infer<typeof AddCartSchema>;

export interface AddCartResponseType {
	_id: string;
	user: string;
	items: [
		{
			product: string;
			quantity: number;
			_id: string;
		},
	];
	updatedAt: Date | string;
	__v: 0;
}

export interface CartType {
	_id: string;
	user: string;
	items: {
		product: ProductType;
		quantity: number;
		_id: string;
	}[];
	updatedAt: Date | string;
	__v: 0;
}
