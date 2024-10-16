import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/types/product";
import { Badge } from "../ui/badge";
import { GetCartSlice } from "@/store/slices/cart";
import { useNavigate } from "react-router";

const ProductCard: React.FC<{
	product: ProductType;
	setShowAddToCart: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveProduct: React.Dispatch<
		React.SetStateAction<ProductType | undefined>
	>;
}> = ({ product, setShowAddToCart, setActiveProduct }) => {
	const getCartQuery = GetCartSlice();
const navigate = useNavigate()
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>{product.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="space-y-2.5">
					<img
						src={product.image}
						alt={product.name + " image"}
						className="rounded-lg shadow-sm"
					/>
					<p>${product.price}</p>
					<Badge variant="secondary" className="capitalize">
						{product.category.name}
					</Badge>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				{!getCartQuery.isLoading &&
					!getCartQuery?.data?.items.find(
						(item) => item.product._id === product._id
					) && (
						<Button
							type="button"
							onClick={() => {
								setShowAddToCart(true);
								setActiveProduct(product);
							}}
						>
							Add to Cart
						</Button>
					)}

				{!getCartQuery.isLoading &&
					getCartQuery?.data?.items.find(
						(item) => item.product._id === product._id
					) && (
						<Button
							type="button"
							onClick={() => {
								navigate("/dashboard/cart")
							}}
						>
							View in Cart
						</Button>
					)}
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
