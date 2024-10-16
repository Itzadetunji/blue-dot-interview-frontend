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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetCategoriesSlice } from "@/store/slices/categories";
import {
	CreateProductSlice,
	UpdateProductSlice,
} from "@/store/slices/products";
import { AddProductSchema, AddProductType, ProductType } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const EditProduct: React.FC<{
	product?: ProductType;
	showEditModal: boolean;
	setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ product, showEditModal, setShowEditModal }) => {
	const getCategoriesQuery = GetCategoriesSlice();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<AddProductType>({
		resolver: zodResolver(AddProductSchema),
	});

	const updateProductMutation = UpdateProductSlice();
	const queryClient = useQueryClient();

	const onSubmit: SubmitHandler<AddProductType> = async (data) => {
		updateProductMutation.mutate(
			{ ...data, id: product?._id ?? "" },
			{
				onSuccess: () => {
					toast.success("Product Updated 🎉");
					queryClient.invalidateQueries({
						queryKey: ["all-products"],
					});
					setTimeout(() => {
						setShowEditModal(false);
						reset();
					}, 1000);
				},
				onError: (error) => {
					toast.error("Product could not be updated 🤕");
					console.log(error);
				},
			}
		);
	};

	React.useEffect(() => {
		reset({
			category: product?.category._id,
			description: product?.description,
			image: product?.image,
			name: product?.name,
			price: product?.price,
			totalInStock: product?.totalInStock,
		});
	}, [product]);

	return (
		<Dialog
			open={showEditModal}
			onOpenChange={(value) => {
				if (!updateProductMutation.isPending) setShowEditModal(value);
			}}
		>
			<DialogContent className="flex-1 sm:max-w-[425px]">
				<form
					className="flex flex-1 flex-col space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<DialogHeader>
						<DialogTitle>Add Product</DialogTitle>
						<DialogDescription>
							Enter New Product Details Here
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name *</Label>
							<Input {...register("name")} />
							{errors.name && (
								<small className="mt-1.5 text-sm text-red-500">
									{errors.name.message}
								</small>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="name">Description</Label>
							<Input {...register("description")} />
							{errors.description && (
								<small className="mt-1.5 text-sm text-red-500">
									{errors.description.message}
								</small>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="name">Price *</Label>
							<Input
								type="number"
								{...register("price", { valueAsNumber: true })}
							/>
							{errors.price && (
								<small className="mt-1.5 text-sm text-red-500">
									{errors.price.message}
								</small>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="name">Category *</Label>
							<Select
								disabled={getCategoriesQuery.isLoading}
								value={watch("category")}
								onValueChange={(value) =>
									setValue("category", value)
								}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Category</SelectLabel>
										{!getCategoriesQuery.isLoading &&
											getCategoriesQuery?.data &&
											getCategoriesQuery.data.map(
												(category) => (
													<SelectItem
														value={category._id}
													>
														{category.name}
													</SelectItem>
												)
											)}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="name">Image</Label>
							<Input {...register("image")} />
							{errors.image && (
								<small className="mt-1.5 text-sm text-red-500">
									{errors.image.message}
								</small>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="name">Stock Value *</Label>
							<Input
								type="number"
								{...register("totalInStock", {
									valueAsNumber: true,
								})}
							/>
							{errors.totalInStock && (
								<small className="mt-1.5 text-sm text-red-500">
									{errors.totalInStock.message}
								</small>
							)}
						</div>
					</div>
					<DialogFooter>
						<DialogClose>
							<Button
								variant="outline"
								disabled={updateProductMutation.isPending}
							>
								Close
							</Button>
						</DialogClose>
						<Button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={
								getCategoriesQuery.isLoading ||
								updateProductMutation.isPending
							}
						>
							Save changes
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
