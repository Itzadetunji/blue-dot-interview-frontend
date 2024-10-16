import { APIVersion1Login, APIVersion1Register } from "@/http/v1";
import { LoginUserType, RegisterUserType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { User } from "../useUserStore";

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

export const GetRequestSlice = (
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<
		AxiosResponse<Record<string, string>>,
		Error
	>({
		queryKey: ["query-key"],
		// queryFn: APIVersion1Login,
	});

	React.useEffect(() => {
		onError(getRequestQuery.error);
	}, [getRequestQuery.isError]);

	return getRequestQuery;
};
