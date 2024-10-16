import { z } from "zod";
import mongoose from "mongoose";

export const AddProductSchema = z.object({
	name: z
		.string({
			required_error: "Product name is required",
		})
		.trim()
		.min(1, { message: "Product name cannot be empty" }),

	description: z.string().optional(),

	price: z
		.number({
			required_error: "Price is required",
		})
		.min(0, { message: "Price must be a non-negative number" }),

	category: z
		.string({
			required_error: "Category is required",
		})
		.refine((val) => mongoose.Types.ObjectId.isValid(val), {
			message: "Invalid category ID",
		}), // Validates category as a MongoDB ObjectId string

	image: z
		.string()
		.url({ message: "Image must be a valid URL" })
		.nullable()
		.optional(), // Validates if it's a valid URL string

	totalInStock: z
		.number({
			required_error: "Total stock is required",
		})
		.min(0, { message: "Total stock must be a non-negative number" }),
});

export type AddProductType = z.infer<typeof AddProductSchema>;

export interface ProductType {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: {
		_id: string;
		name: string;
	};
	image: string;
	totalInStock: number;
	totalSales: number;
	owner: string;
	createdAt: Date | string;
}
