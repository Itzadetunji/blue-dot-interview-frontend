import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
	user: {
		id: string;
		fullName: string;
		email: string;
	};
	token: string;
}

interface UserStore {
	user: User | null;
	setUser: (user: User | null) => void;
	reset: () => void;
}

const initialState = {
	user: null,
};

const useUserStore = create<UserStore, [["zustand/persist", UserStore]]>(
	persist(
		(set) => ({
			...initialState,
			setUser: (user) => {
				if (user)
					set((state) => {
						console.log({ user: { ...state.user, ...user } });
						return { user: { ...state.user, ...user } };
					});
			},
			reset: () => set(initialState),
		}),
		{
			name: "user-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useUserStore;
