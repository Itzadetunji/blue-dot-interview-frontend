import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { GetCartSlice } from "./store/slices/cart";
import { GetCategoriesSlice } from "./store/slices/categories";
import {
	GetAllProductsSlice,
	GetMyProductsSlice,
} from "./store/slices/products";
import useUserStore from "./store/useUserStore";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const MainLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const user = useUserStore((s) => s.user);
	const getCartQuery = GetCartSlice();
	GetCategoriesSlice();
	GetAllProductsSlice();
	GetMyProductsSlice();

	React.useEffect(() => {
		if (
			location.pathname === "/dashboard" ||
			location.pathname === "/dashboard/"
		)
			navigate("/dashboard/shop");
	}, []);

	return (
		<div className="flex min-h-[100dvh] w-full flex-col bg-muted/40">
			<Sidebar />
			<div className="flex flex-col sm:gap-4 sm:pb-4 sm:pl-14">
				<header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4">
					<h1 className="text-xl font-bold">
						Hello {user?.user.fullName} 👋🏽
					</h1>
					<Link
						to="/dashboard/cart"
						className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:h-8 md:w-8`}
					>
						<ShoppingCart className="h-5 w-5" />
						<span className="sr-only">Checkout</span>

						<small className="absolute -right-1 -top-1 min-w-fit rounded-full bg-red-500 px-1 text-xxs text-white">
							{(!getCartQuery.isLoading &&
								getCartQuery.data?.items.length) ??
								0}
						</small>
					</Link>
				</header>
				<main className="grid flex-1 items-start gap-4 p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
