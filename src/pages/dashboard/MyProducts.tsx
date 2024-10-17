import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { LuSearch } from "react-icons/lu";
import { AddProduct } from "../../components/products/AddProduct";
import InputIcon from "../../components/ui-extended/input-icon";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { GetCategoriesSlice } from "@/store/slices/categories";
import {
	GetAllProductsSlice,
	GetMyProductsSlice,
} from "@/store/slices/products";
import { format } from "date-fns";
import { useState } from "react";
import { ProductType } from "@/types/product";
import { DeleteProduct } from "@/components/products/DeleteProduct";
import { EditProduct } from "@/components/products/EditProduct";
import { AddCategory } from "@/components/products/AddCategory";

const MyProducts: React.FC = () => {
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
	const getMyProductsQuery = GetMyProductsSlice(queryParams);
	const getCategoriesQuery = GetCategoriesSlice();

	const [activeProduct, setActiveProduct] = useState<ProductType>();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<>
			<div className="flex w-full items-center justify-between gap-2">
				<div className="flex items-center space-x-4">
					<InputIcon
						icon={<LuSearch />}
						position="left"
						value={queryParams.name}
						onChange={(e) =>
							setQueryParams({
								...queryParams,
								name: e.target.value,
							})
						}
					/>
					<Select
						value={queryParams.category}
						onValueChange={(value) =>
							setQueryParams({ ...queryParams, category: value })
						}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{!getCategoriesQuery.isLoading &&
									getCategoriesQuery?.data &&
									getCategoriesQuery.data.map((category) => (
										<SelectItem value={category._id}>
											{category.name}
										</SelectItem>
									))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center space-x-4">
					<AddCategory params={queryParams} />
					<AddProduct params={queryParams} />
				</div>
			</div>

			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>My Products</CardTitle>
					<CardDescription>
						Manage your products and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="hidden w-[100px] sm:table-cell">
									<span className="sr-only">Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Category</TableHead>
								<TableHead className="hidden md:table-cell">
									Price
								</TableHead>
								<TableHead className="hidden md:table-cell">
									Total Sales
								</TableHead>
								<TableHead className="hidden md:table-cell">
									In Stock
								</TableHead>
								<TableHead className="hidden md:table-cell">
									Created at
								</TableHead>
								<TableHead>
									<span className="sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{!getMyProductsQuery.isLoading &&
								getMyProductsQuery?.data?.map((product) => (
									<TableRow>
										<TableCell className="hidden sm:table-cell">
											<img
												alt={product.name + " image"}
												className="aspect-square rounded-md object-cover"
												height="64"
												src={product.image}
												width="64"
											/>
										</TableCell>
										<TableCell className="font-medium">
											{product.name}
										</TableCell>
										<TableCell className="font-medium">
											{product.category.name}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											${product.price}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{product.totalSales}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{product.totalInStock}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{format(
												product.createdAt,
												"yyyy-MM-dd"
											)}
											{/* 2023-07-12 10:42 AM */}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">
															Toggle menu
														</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>
														Actions
													</DropdownMenuLabel>
													<DropdownMenuItem
														onClick={() => {
															setShowEditModal(
																true
															);
															setActiveProduct(
																product
															);
														}}
													>
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => {
															setShowDeleteModal(
																true
															);
															setActiveProduct(
																product
															);
														}}
													>
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</CardContent>
				{/* <CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1-10</strong> of <strong>32</strong>{" "}
						products
					</div>
				</CardFooter> */}
			</Card>
			<DeleteProduct
				product={activeProduct}
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
				params={queryParams}
			/>
			<EditProduct
				product={activeProduct}
				showEditModal={showEditModal}
				setShowEditModal={setShowEditModal}
			/>
		</>
	);
};

export default MyProducts;
