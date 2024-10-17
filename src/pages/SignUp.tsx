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
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterUserSchema, RegisterUserType } from "@/types";
import { LoginUserSlice, RegisterUserSlice } from "@/store/slices/auth";
import useUserStore from "@/store/useUserStore";
import toast from "react-hot-toast";
import { setCookie } from "@/utils/cookies";

const SignUp: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterUserType>({
		resolver: zodResolver(RegisterUserSchema),
	});

	const registerUserMutaion = RegisterUserSlice();
	const setUser = useUserStore((s) => s.setUser);
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<RegisterUserType> = async (data) => {
		registerUserMutaion.mutate(data, {
			onSuccess: (data) => {
				setUser(data.data);
				toast.success("Account Created Successfully 🎉");
				setCookie("access-token", data.data.token, 7);
				setTimeout(() => {
					navigate("/dashboard/shop");
				}, 1000);
			},
			onError: (error) => {
				console.error(error);
				toast.error("This email is already in use 🤕");
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
						<CardTitle className="text-2xl">Sign up</CardTitle>
						<CardDescription>
							Enter your details to sign up
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="fullName">Full Name</Label>
								<Input
									placeholder="Pauline"
									{...register("fullName")}
								/>
								{errors.fullName && (
									<small className="mt-1.5 text-sm text-red-500">
										{errors.fullName.message}
									</small>
								)}
							</div>
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
								type="submit"
								className="w-full"
								onClick={handleSubmit(onSubmit)}
								disabled={registerUserMutaion.isPending}
							>
								Sign up
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Have an account?{" "}
							<Link to="/" className="underline">
								Sign In
							</Link>
						</div>
					</CardContent>
				</Card>
			</form>
		</main>
	);
};

export default SignUp;
