import ProductCard from "@/components/products/ProductCard";
import { LuSearch } from "react-icons/lu";
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
import { GetAllProductsSlice } from "@/store/slices/products";
import {
	GetCategoriesSlice,
	GetCategorySlice,
} from "@/store/slices/categories";
import { SetStateAction, useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import { ProductType } from "@/types/product";

const Products: React.FC = () => {
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
	const getAllProductsQuery = GetAllProductsSlice(queryParams);
	const getCategoriesQuery = GetCategoriesSlice();

	const [showAddToCart, setShowAddToCart] = useState(false);
	const [activeProduct, setActiveProduct] = useState<ProductType>();

	useEffect(() => {
		getAllProductsQuery.refetch();
		getCategoriesQuery.refetch();
	}, []);

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
										<SelectItem
											value={category._id}
											key={category._id}
										>
											{category.name}
										</SelectItem>
									))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<section className="flex flex-wrap gap-4">
				{!getAllProductsQuery.isLoading &&
					getAllProductsQuery?.data?.map((product, i) => (
						<ProductCard
							key={i}
							product={product}
							setShowAddToCart={setShowAddToCart}
							setActiveProduct={setActiveProduct}
						/>
					))}
			</section>
			<AddToCart
				product={activeProduct}
				showDeleteModal={showAddToCart}
				setShowDeleteModal={setShowAddToCart}
			/>
		</>
	);
};

export default Products;
