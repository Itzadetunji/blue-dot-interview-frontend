import {
	APIVersion1CreateCategory,
	APIVersion1DeleteCategory,
	APIVersion1GetCategories,
	APIVersion1GetCategory,
	APIVersion1UpdateCategory,
} from "@/http/v1";
import { AddCategoryType, CategoryType } from "@/types/categories";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

export const CreateCategorySlice = () => {
	return useMutation<AxiosResponse<CategoryType>, Error, AddCategoryType>({
		mutationFn: APIVersion1CreateCategory,
	});
};

export const GetCategoriesSlice = (
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<CategoryType[], Error>({
		queryKey: ["all-categories"],
		queryFn: () => APIVersion1GetCategories(),
	});

	React.useEffect(() => {
		onError(getRequestQuery.error);
	}, [getRequestQuery.isError]);

	return getRequestQuery;
};

export const GetCategorySlice = (
	id: string,
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<AxiosResponse<CategoryType>, Error>({
		queryKey: ["category-" + id],
		queryFn: () => APIVersion1GetCategory({ id }),
	});

	React.useEffect(() => {
		onError(getRequestQuery.error);
	}, [getRequestQuery.isError]);

	return getRequestQuery;
};

export const UpdateCategorySlice = () => {
	return useMutation<
		AxiosResponse<CategoryType>,
		Error,
		Partial<AddCategoryType> & { id: string }
	>({
		mutationFn: APIVersion1UpdateCategory,
	});
};

export const DeleteCategorySlice = () => {
	return useMutation<AxiosResponse<CategoryType>, Error, { id: string }>({
		mutationFn: APIVersion1DeleteCategory,
	});
};
