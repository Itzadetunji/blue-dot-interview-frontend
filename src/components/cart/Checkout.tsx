import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ClearCartSlice, GetCartSlice } from "@/store/slices/cart";
import { CreateOrderSlice } from "@/store/slices/order";
import { DeleteProductSlice } from "@/store/slices/products";
import { CreateOrderType } from "@/types/order";
import { ProductType } from "@/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const CheckoutProducts: React.FC<{
	total: number;
	showCheckoutModal: boolean;
	setShowCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ total, showCheckoutModal, setShowCheckoutModal }) => {
	const getCartQuery = GetCartSlice();
	const [queryParams, setQueryParams] = useState<{
		name?: string;
		category?: string;
		minPrice?: number;
		maxPrice?: number;
	}>({
		name: undefined,
		category: undefined,
		minPrice: undefined,
		maxPrice: undefined,
	});
	const checkoutMutation = CreateOrderSlice();
	const queryClient = useQueryClient();

	const onSubmit = async () => {
		const data = {
			items:
				getCartQuery.data?.items.map((item) => ({
					productId: item._id,
					quantity: item.quantity,
				})) || [],
			total,
		} as CreateOrderType;

		checkoutMutation.mutate(data, {
			onSuccess: () => {
				toast.success("Order Created  🎉", { duration: 4000});
				
				queryClient.invalidateQueries({
					queryKey: ["my-cart"],
				});
				queryClient.invalidateQueries({
					queryKey: ["my-products", queryParams],
				});
				queryClient.invalidateQueries({
					queryKey: ["all-products", queryParams],
				});
				setTimeout(() => {
					setShowCheckoutModal(false);
				}, 1000);
			},
			onError: (error) => {
				toast.error("Order could not be created 🤕");
				console.log(error);
			},
		});
	};

	return (
		<Dialog
			open={showCheckoutModal}
			onOpenChange={(value) => {
				if (!checkoutMutation.isPending) setShowCheckoutModal(value);
			}}
		>
			{!getCartQuery.isLoading && !!getCartQuery?.data?.items.length && (
				<DialogTrigger>
					<Button
						onClick={() => {
							setShowCheckoutModal(true);
						}}
					>
						Checkout
						<ShoppingCart className="ml-2 h-4 w-4" />
					</Button>
				</DialogTrigger>
			)}

			<DialogContent className="flex-1 sm:max-w-[425px]">
				<form
					className="flex flex-1 flex-col space-y-4"
					onSubmit={onSubmit}
				>
					<DialogHeader>
						<DialogTitle>Checkout</DialogTitle>
					</DialogHeader>
					<h2>Are you sure you want to checkout?</h2>
					<DialogFooter className="ml-auto flex !flex-row-reverse gap-x-2 space-x-0">
						<Button
							type="button"
							onClick={onSubmit}
							disabled={checkoutMutation.isPending}
						>
							Checkout
						</Button>
						<DialogClose>
							<Button
								type="button"
								variant="outline"
								disabled={checkoutMutation.isPending}
							>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
