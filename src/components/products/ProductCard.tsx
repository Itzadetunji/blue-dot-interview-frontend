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
	const navigate = useNavigate();

	return (
		<Card className="flex w-[350px] flex-col">
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>{product.description}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-1">
				<div className="flex flex-1 flex-col space-y-2.5">
					<img
						src={product.image}
						alt={product.name + " image"}
						className="flex-1 rounded-lg shadow-sm"
					/>
					<p>${product.price}</p>
					<Badge variant="secondary" className="w-fit capitalize">
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
								navigate("/dashboard/cart");
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
