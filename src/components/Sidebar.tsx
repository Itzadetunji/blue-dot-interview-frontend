import { ShoppingCart, Package, LogOut, Package2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetCartSlice } from "@/store/slices/cart";
import { cn } from "@/lib/utils";
import { LogoutUserSlice } from "@/store/slices/auth";
import useUserStore from "@/store/useUserStore";
import toast from "react-hot-toast";
import { deleteAllCookies } from "@/utils/cookies";

// Array to store the sidebar items
const sidebarItems = [
	{
		path: "/dashboard/shop",
		icon: Package2,
		label: "Shop",
	},
	{
		path: "/dashboard/my-products",
		icon: Package,
		label: "My Products",
	},
	{
		path: "/dashboard/cart",
		icon: ShoppingCart,
		label: "Cart",
	},
];

export const Sidebar = () => {
	const location = useLocation();
	const getCartQuery = GetCartSlice();
	const logoutUserMutation = LogoutUserSlice();
	const reset = useUserStore((s) => s.reset);
	const navigate = useNavigate();

	const logoutUser = () => {
		toast.loading("Logging out", { id: "logout" });
		logoutUserMutation.mutate(undefined, {
			onSuccess: () => {
				toast.success("Logout Successful 🎉", { id: "logout" });
				setTimeout(() => {
					navigate("/sign-in");
					reset();
					deleteAllCookies();
				}, 1000);
			},
			onError: () => {
				toast.success("Logout Unsuccessful 🤕", { id: "logout" });
			},
		});
	};

	return (
		<TooltipProvider>
			<aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex">
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
					{sidebarItems.map((item) => (
						<Tooltip key={item.label}>
							<TooltipTrigger asChild>
								<Link
									to={item.path}
									className={cn(
										`relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`,
										{
											"bg-accent text-accent-foreground":
												location.pathname === item.path,
											"text-muted-foreground":
												location.pathname !== item.path,
										}
									)}
								>
									<item.icon className="h-5 w-5" />
									<span className="sr-only">
										{item.label}
									</span>
									{item.path.includes("/dashboard/cart") && (
										<small className="absolute -right-1 -top-1 min-w-fit rounded-full bg-red-500 px-1 text-xxs text-white">
											{(!getCartQuery.isLoading &&
												getCartQuery.data?.items
													.length) ??
												0}
										</small>
									)}
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								{item.label}
							</TooltipContent>
						</Tooltip>
					))}
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to=""
								onClick={(e) => {
									e.preventDefault();
									logoutUser();
								}}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<LogOut className="h-5 w-5" />
								<span className="sr-only">Logout</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Logout</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	);
};
