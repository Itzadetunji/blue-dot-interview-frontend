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
import { AddCartSlice } from "@/store/slices/cart";
import { AddCartSchema, AddCartType } from "@/types/cart";
import { ProductType } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddToCart: React.FC<{
	product?: ProductType;
	showDeleteModal: boolean;
	setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ product, showDeleteModal, setShowDeleteModal }) => {
	const addCartMutation = AddCartSlice();
	const queryClient = useQueryClient();

	const {
		handleSubmit,
		getValues,
		watch,
		setValue,
		reset,
	} = useForm<AddCartType>({
		resolver: zodResolver(AddCartSchema),
	});

	// Handler for the plus button
	const increaseQuantity = () => {
		if (product && +getValues("quantity") < product.totalInStock) {
			setValue("quantity", +getValues("quantity") + 1);
		}
	};

	// Handler for the minus button
	const decreaseQuantity = () => {
		if (+getValues("quantity") > 0) {
			setValue("quantity", +getValues("quantity") - 1);
		}
	};

	const onSubmit: SubmitHandler<AddCartType> = async (data) => {
		addCartMutation.mutate(data, {
			onSuccess: () => {
				toast.success("Product Added To Cart 🎉");
				queryClient.invalidateQueries({
					queryKey: ["my-cart"],
				});
				setTimeout(() => {
					setShowDeleteModal(false);
				}, 1000);
			},
			onError: (error) => {
				toast.error("Product could not be added to cart 🤕");
				console.log(error);
			},
		});
	};

	React.useEffect(() => {
		reset({
			productId: product?._id,
			quantity: 0,
		});
	}, [product]);

	return (
		<Dialog
			open={showDeleteModal}
			onOpenChange={(value) => {
				if (!addCartMutation.isPending) setShowDeleteModal(value);
			}}
		>
			<DialogContent className="flex-1 sm:max-w-[425px]">
				<form
					className="flex flex-1 flex-col space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<DialogHeader>
						<DialogTitle>Add Product To Cart</DialogTitle>
						<DialogDescription>
							Add {product?.name} to cart
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col space-y-2">
						<h2>Select Quantity</h2>
						<div className="flex items-center space-x-4">
							<Button
								type="button"
								variant="outline"
								onClick={decreaseQuantity}
								disabled={watch("quantity") === 0}
							>
								-
							</Button>

							<span>{watch("quantity")}</span>

							<Button
								type="button"
								variant="outline"
								onClick={increaseQuantity}
								disabled={
									product &&
									watch("quantity") >= product.totalInStock
								}
							>
								+
							</Button>
						</div>
						<p className="mt-2 text-sm">
							In Stock: {product?.totalInStock ?? "0"}
						</p>
					</div>

					<DialogFooter className="ml-auto flex !flex-row-reverse gap-x-2 space-x-0">
						<Button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={addCartMutation.isPending}
						>
							Add to Cart
						</Button>
						<DialogClose>
							<Button
								type="button"
								variant="outline"
								disabled={addCartMutation.isPending}
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

export default AddToCart;
