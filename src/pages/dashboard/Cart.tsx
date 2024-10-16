import React, { useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClearCartSlice, GetCartSlice } from "@/store/slices/cart";
import { ClearCart } from "@/components/cart/ClearCart";
import { CheckoutProducts } from "@/components/cart/Checkout";
import { Badge } from "@/components/ui/badge";

interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: {
		_id: string;
		name: string;
	};
	image: string;
	totalInStock: number;
}

interface CartItem {
	product: Product;
	quantity: number;
	_id: string;
}

interface Cart {
	_id: string;
	user: string;
	items: CartItem[];
	updatedAt: string;
	__v: number;
}

const MyCart: React.FC = () => {
	const getCartQuery = GetCartSlice();
	const [showClearCartModal, setShowClearCartModal] = useState(false);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);

	const total =
		(!getCartQuery?.isLoading &&
			getCartQuery?.data?.items.reduce(
				(sum, item) => sum + item.product.price * item.quantity,
				0
			)) ||
		0;

	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center justify-between">
				<h1 className="mb-4 text-2xl font-bold">Your Cart</h1>

				<ClearCart
					showClearCartModal={showClearCartModal}
					setShowClearCartModal={setShowClearCartModal}
				/>
			</div>
			{!getCartQuery?.isLoading &&
			getCartQuery?.data?.items.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					{!getCartQuery?.isLoading &&
						getCartQuery?.data?.items.map((item) => (
							<Card key={item._id} className="mb-4">
								<CardContent className="p-4">
									<div className="flex items-center space-x-4">
										<img
											src={item.product.image}
											alt={item.product.name}
											width={100}
											height={100}
											className="rounded-md"
										/>
										<div className="flex flex-1 flex-col space-y-1">
											<CardTitle>
												{item.product.name}
											</CardTitle>
											<p className="text-sm text-gray-500">
												{item.product.description}
											</p>
											<p className="text-sm font-semibold">
												${item.product.price.toFixed(2)}
											</p>
											<Badge
												variant="secondary"
												className="w-fit capitalize"
											>
												{item.product.category.name}
											</Badge>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					<div className="mt-4 flex items-center justify-between">
						<p className="text-xl font-bold">
							Total: ${total?.toFixed(2)}
						</p>

						<CheckoutProducts
							total={total}
							showCheckoutModal={showCheckoutModal}
							setShowCheckoutModal={setShowCheckoutModal}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default MyCart;
