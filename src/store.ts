import { reactive } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { UserData } from "./types";

// type User = {
//     data?: UserData;
//     isLoggedIn: boolean;
// };

type Store = {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: UserData | Record<string, never>;
    token: string | null;
    error: null;
    setAuthStatus: (status: boolean) => void;
    getAccessToken: () => Promise<string>;
};

export const store = reactive<Store>({
    isLoading: true,
    isAuthenticated: false,
    user: {},
    token: null,
    error: null,
    setAuthStatus(status: boolean) {
        this.isAuthenticated = status;
    },
    async getAccessToken() {
        if (this.token) {
            return this.token;
        }
        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        if (token) {
            this.token = token;
            return token;
        }

        return "";
    },
});
