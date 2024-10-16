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
import { DeleteProductSlice } from "@/store/slices/products";
import { ProductType } from "@/types/product";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const ClearCart: React.FC<{
	showClearCartModal: boolean;
	setShowClearCartModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showClearCartModal, setShowClearCartModal }) => {
	const getCartQuery = GetCartSlice();
	const clearCartMutation = ClearCartSlice();
	const queryClient = useQueryClient();

	const onSubmit = async () => {
		clearCartMutation.mutate(undefined, {
			onSuccess: () => {
				toast.success("Cart Clearted  🎉");

				queryClient.invalidateQueries({
					queryKey: ["my-cart"],
				});
				setTimeout(() => {
					setShowClearCartModal(false);
				}, 1000);
			},
			onError: (error) => {
				toast.error("Cart could not be cleared 🤕");
				console.log(error);
			},
		});
	};

	return (
		<Dialog
			open={showClearCartModal}
			onOpenChange={(value) => {
				if (!clearCartMutation.isPending) setShowClearCartModal(value);
			}}
		>
			{!getCartQuery.isLoading && !!getCartQuery?.data?.items.length && (
				<DialogTrigger>
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							setShowClearCartModal(true);
						}}
					>
						Clear Cart
					</Button>
				</DialogTrigger>
			)}

			<DialogContent className="flex-1 sm:max-w-[425px]">
				<form
					className="flex flex-1 flex-col space-y-4"
					onSubmit={onSubmit}
				>
					<DialogHeader>
						<DialogTitle>Clear Cart</DialogTitle>
					</DialogHeader>
					<h2>
						Are you sure you want to clear your cart?{" "}
						<b>This action cannot be undone!</b>
					</h2>
					<DialogFooter className="ml-auto flex !flex-row-reverse gap-x-2 space-x-0">
						<Button
							type="button"
							variant="destructive"
							onClick={onSubmit}
							disabled={clearCartMutation.isPending}
						>
							Clear
						</Button>
						<DialogClose>
							<Button
								type="button"
								variant="outline"
								disabled={clearCartMutation.isPending}
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
