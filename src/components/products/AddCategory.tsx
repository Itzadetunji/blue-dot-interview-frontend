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
import {
	CreateCategorySlice,
	GetCategoriesSlice,
} from "@/store/slices/categories";
import { AddCategorySchema, AddCategoryType } from "@/types/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const AddCategory: React.FC<{
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
	} = useForm<AddCategoryType>({
		resolver: zodResolver(AddCategorySchema),
	});

	const addCategoryMutation = CreateCategorySlice();
	const queryClient = useQueryClient();

	const onSubmit: SubmitHandler<AddCategoryType> = async (data) => {
		addCategoryMutation.mutate(data, {
			onSuccess: () => {
				toast.success("Category Added 🎉");
				queryClient.invalidateQueries({
					queryKey: ["all-products", params],
				});
				queryClient.invalidateQueries({
					queryKey: ["my-products", params],
				});
				queryClient.invalidateQueries({
					queryKey: ["all-categories"],
				});
				setTimeout(() => {
					setShow(false);
					reset();
				}, 1000);
			},
			onError: (error) => {
				toast.error("Category could not be added 🤕");
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
						if (!addCategoryMutation.isPending) setShow(true);
					}}
				>
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Category
					</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="flex-1 sm:max-w-[425px]">
				<form
					className="flex flex-1 flex-col space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<DialogHeader>
						<DialogTitle>Add Category</DialogTitle>
						<DialogDescription>
							Enter New Category Details Here
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
					</div>
					<DialogFooter className="ml-auto flex !flex-row-reverse gap-x-2 space-x-0">
						<Button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={
								getCategoriesQuery.isLoading ||
								addCategoryMutation.isPending
							}
						>
							Save changes
						</Button>
						<DialogClose>
							<Button
								variant="outline"
								type="button"
								disabled={addCategoryMutation.isPending}
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
