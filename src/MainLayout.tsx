// components/MainLayout.tsx

import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { GetCartSlice } from "./store/slices/cart";
import { GetCategoriesSlice } from "./store/slices/categories";
import { GetAllProductsSlice, GetMyProductsSlice } from "./store/slices/products";
import useUserStore from "./store/useUserStore";

export const MainLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const user = useUserStore((s) => s.user);
	GetCartSlice();
	GetCategoriesSlice();
	GetAllProductsSlice()
	GetMyProductsSlice()

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
				<header className="flex h-14 items-center gap-4 border-b bg-background px-4">
					<h1 className="text-xl font-bold">
						Hello {user?.user.fullName} 👋🏽
					</h1>
				</header>
				<main className="grid flex-1 items-start gap-4 p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
