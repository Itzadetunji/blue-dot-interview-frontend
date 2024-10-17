import {
	APIVersion1Login,
	APIVersion1Logout,
	APIVersion1Register,
} from "@/http/v1";
import { LoginUserType, RegisterUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { User } from "../useUserStore";
import { AxiosResponse } from "axios";

export const RegisterUserSlice = () => {
	return useMutation<AxiosResponse<User>, Error, RegisterUserType>({
		mutationFn: APIVersion1Register,
	});
};

export const LoginUserSlice = () => {
	return useMutation<AxiosResponse<User>, Error, LoginUserType>({
		mutationFn: APIVersion1Login,
	});
};

export const LogoutUserSlice = () => {
	return useMutation<unknown, Error>({
		mutationFn: APIVersion1Logout,
	});
};
