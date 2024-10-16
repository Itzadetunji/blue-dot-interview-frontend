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
import { CreateProductSlice } from "@/store/slices/products";
import { AddProductSchema, AddProductType } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
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

export const AddProduct: React.FC<{
	params: {
		name?: string;
		category?: string;
		minPrice?: number;
		maxPrice?: number;
	};
}> = ({ params }) => {
	const [show, setShow] = useState(false);
	const getCategoriesQuery = GetCategoriesSlice();
	const {
		register,
		handleSubmit,
		setError,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<AddProductType>({
		resolver: zodResolver(AddProductSchema),
	});

	const createProductMutation = CreateProductSlice();
	const queryClient = useQueryClient();

	const onSubmit: SubmitHandler<AddProductType> = async (data) => {
		createProductMutation.mutate(data, {
			onSuccess: () => {
				toast.success("Product Added 🎉");
				queryClient.invalidateQueries({
					queryKey: ["all-products", params],
				});
				queryClient.invalidateQueries({
					queryKey: ["my-products", params],
				});
				setTimeout(() => {
					setShow(false);
					reset();
				}, 1000);
			},
			onError: (error) => {
				toast.error("Product could not be added 🤕");
				console.log(error);
			},
		});
	};

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					className="h-8 gap-1"
					onClick={() => {
						if (!createProductMutation.isPending) setShow(true);
					}}
				>
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Product
					</span>
				</Button>
			</DialogTrigger>

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
					<DialogFooter className="ml-auto flex !flex-row-reverse gap-x-2 space-x-0">
						<Button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={
								getCategoriesQuery.isLoading ||
								createProductMutation.isPending
							}
						>
							Save changes
						</Button>
						<DialogClose>
							<Button
								variant="outline"
								type="button"
								disabled={createProductMutation.isPending}
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
