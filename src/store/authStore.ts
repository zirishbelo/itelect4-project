import { create } from "zustand";
import { persist } from "zustand/middleware";
// The shape of the store: its data AND the functions that change it
interface AuthState {
    token: string | null;
    userName: string | null;
    setSession: (token: string, userName: string) => void;
    logout: () => void;
}
const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            userName: null,
            setSession: (token, userName) => set({ token, userName }),
            logout: () => set({ token: null, userName: null }),
        }),
        {
            name: "itelect4-auth",
            // the localStorage key it writes to
            partialize: (state) => ({
                token: state.token,
                userName: state.userName,
            }),
        }
    )
);

export default useAuthStore;
