import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        setReferralCode: (state, action) => {
            if (state.user) {
                state.user.referralCode = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
});

export const { login, logout, updateUser, setReferralCode } = authSlice.actions;
export default authSlice.reducer;