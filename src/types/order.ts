import { z } from "zod";
import { AddCartSchema } from "./cart";

export const CreateOrderSchema = z.object({
	items: z.array(AddCartSchema),
	total: z.number(),
});

export type CreateOrderType = z.infer<typeof CreateOrderSchema>;
