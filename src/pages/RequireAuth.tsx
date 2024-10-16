import { useLocation, Navigate, Outlet } from "react-router";
import useUserStore from "../store/useUserStore";

const RequireAuth: React.FC = () => {
	const location = useLocation();
	const user = useUserStore((s) => s.user);

	if (!user) {
		return <Navigate to="/sign-in" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default RequireAuth;
