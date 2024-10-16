import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginUserSlice } from "@/store/slices/auth";
import useUserStore from "@/store/useUserStore";
import { LoginUserSchema, LoginUserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "@/utils/cookies";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginUserType>({
		resolver: zodResolver(LoginUserSchema),
	});

	const loginUserMutaion = LoginUserSlice();
	const setUser = useUserStore((s) => s.setUser);
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginUserType> = async (data) => {
		loginUserMutaion.mutate(data, {
			onSuccess: (data) => {
				setUser(data.data);
				toast.success("Login Successful 🎉");
				setCookie("access-token", data.data.token, 7);
				setTimeout(() => {
					navigate("/dashboard/shop");
				}, 1000);
			},
			onError: (error) => {
				console.error(error);
				toast.error("Invalid credentials 🤕");
			},
		});
	};

	return (
		<main className="relative flex flex-col md:h-[100dvh]">
			<form
				className="flex flex-1 items-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Card className="mx-auto w-full max-w-[480px] flex-1">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									placeholder="m@example.com"
									{...register("email")}
								/>
								{errors.email && (
									<small className="mt-1.5 text-sm text-red-500">
										{errors.email.message}
									</small>
								)}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									{...register("password")}
								/>
								{errors.password && (
									<small className="mt-1.5 text-sm text-red-500">
										{errors.password.message}
									</small>
								)}
							</div>
							<Button
								onClick={handleSubmit(onSubmit)}
								type="submit"
								className="w-full"
							>
								Login
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link to="/sign-up" className="underline">
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>
			</form>
		</main>
	);
};

export default SignIn;
