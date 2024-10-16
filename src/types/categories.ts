import { z } from "zod";

export const AddCategorySchema = z.object({
	name: z
		.string({
			required_error: "Product name is required",
		})
		.trim()
		.min(1, { message: "Product name cannot be empty" }),

	description: z.string().optional(),
});

export type AddCategoryType = z.infer<typeof AddCategorySchema>;

export interface CategoryType {
	_id: string;
	name: string;
}
