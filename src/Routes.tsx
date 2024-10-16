import { Toaster } from "react-hot-toast";
import {
	BrowserRouter,
	Routes as BrowserRoutes,
	Route,
} from "react-router-dom";
import { MainLayout } from "./MainLayout";
import RequireAuth from "./pages/RequireAuth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyCart from "./pages/dashboard/Cart";
import MyProducts from "./pages/dashboard/MyProducts";
import Products from "./pages/dashboard/Products";

const Routes = () => {
	return (
		<BrowserRouter>
			<BrowserRoutes>
				<Route path="/" element={<SignIn />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />

				<Route element={<RequireAuth />}>
					<Route path="/dashboard" element={<MainLayout />}>
						<Route path="/dashboard/shop" element={<Products />} />
						<Route
							path="/dashboard/my-products"
							element={<MyProducts />}
						/>
						<Route path="/dashboard/cart" element={<MyCart />} />
					</Route>
				</Route>
			</BrowserRoutes>
			<ToastContainer />
		</BrowserRouter>
	);
};
const ToastContainer: React.FC = () => {
	return (
		<Toaster
			position="bottom-center"
			toastOptions={{
				style: {
					maxWidth: "1000px",
				},
			}}
		/>
	);
};

export default Routes;
