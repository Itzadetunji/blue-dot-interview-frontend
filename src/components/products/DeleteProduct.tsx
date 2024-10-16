import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { DeleteProductSlice } from "@/store/slices/products";
import { ProductType } from "@/types/product";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const DeleteProduct: React.FC<{
	product?: ProductType;
	showDeleteModal: boolean;
	setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	params: {
		name?: string;
		category?: string;
		minPrice?: number;
		maxPrice?: number;
	};
}> = ({ product, showDeleteModal, setShowDeleteModal, params }) => {
	const deleteProductMutation = DeleteProductSlice();
	const queryClient = useQueryClient();

	const onSubmit = async () => {
		deleteProductMutation.mutate(
			{ id: product?._id ?? "" },
			{
				onSuccess: () => {
					toast.success("Product Deleted 🎉");
					queryClient.invalidateQueries({
						queryKey: ["all-products", params],
					});
					queryClient.invalidateQueries({
						queryKey: ["my-products", params],
					});
					setTimeout(() => {
						setShowDeleteModal(false);
					}, 1000);
				},
				onError: (error) => {
					toast.error("Product could not be deleted 🤕");
					console.log(error);
				},
			}
		);
	};

	return (
		<Dialog
			open={showDeleteModal}
			onOpenChange={(value) => {
				if (!deleteProductMutation.isPending) setShowDeleteModal(value);
			}}
		>
			<DialogContent className="flex-1 sm:max-w-[425px]">
				<form
					className="flex flex-1 flex-col space-y-4"
					onSubmit={onSubmit}
				>
					<DialogHeader>
						<DialogTitle>Delete Product</DialogTitle>
						<DialogDescription>
							Delete {product?.name}
						</DialogDescription>
					</DialogHeader>
					<h2>
						Are you sure you want to delete this product?{" "}
						<b>This action cannot be undone!</b>
					</h2>
					<DialogFooter className="ml-auto flex !flex-row-reverse gap-x-2 space-x-0">
						<Button
							type="button"
							variant="destructive"
							onClick={onSubmit}
							disabled={deleteProductMutation.isPending}
						>
							Delete
						</Button>
						<DialogClose>
							<Button
								type="button"
								variant="outline"
								disabled={deleteProductMutation.isPending}
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
