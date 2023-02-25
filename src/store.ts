import { reactive } from "vue";
import { API_URL, getUser } from "./utils";

import { UserData } from "./types";

// type User = {
//     data?: UserData;
//     isLoggedIn: boolean;
// };

type Store = {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: UserData | Record<string, never>;
    error: null;
    setAuthStatus: (status: boolean) => void;
};

export const store = reactive<Store>({
    isLoading: true,
    isAuthenticated: false,
    user: {},
    error: null,
    setAuthStatus(status: boolean) {
        this.isAuthenticated = status;
    },
});
