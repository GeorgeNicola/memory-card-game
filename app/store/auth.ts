// import type { User } from "@prisma/client";

// // @ts-ignore
// import { ActionTree, MutationTree, GetterTree } from "vuex";

// export interface UserState {
//   user: User | null;
//   token: string | null;
// }

// export const state = (): UserState => ({
//   user: null,
//   token: null,
// });

// export const getters: GetterTree<UserState, any> = {
//   isAuthenticated: (state: UserState): boolean => !!state.token,
// };

// export const mutations: MutationTree<UserState> = {
//   setUser(state: UserState, user: User | null) {
//     state.user = user;
//   },
//   setToken(state: UserState, token: string | null) {
//     state.token = token;
//   },
// };

// export const actions: ActionTree<UserState, any> = {
//   async login(
//     { commit }: { commit: Function },
//     credentials: { email: string; password: string },
//   ) {
//     const user = await $fetch("/api/login", {
//       method: "POST",
//       body: {
//         email: credentials.email,
//         password: credentials.password,
//       },
//     });

//     commit("setUser", user);
//     commit("setToken", user.userId.toString());

//     if (import.meta.client) {
//       localStorage.setItem("authToken", user.userId.toString());
//       localStorage.setItem("user", JSON.stringify(user));
//     }
//   },

//   async register(name: string, email: string, password: string) {
//     const newUser = await $fetch("/api/register", {
//       method: "POST",
//       body: {
//         name: name,
//         email: email,
//         password: password,
//       },
//     });

//     if (!newUser) {
//       throw new Error("Registration failed");
//     }

//     navigateTo("/login");
//   },

//   initAuth({ commit }: { commit: Function }) {
//     if (import.meta.client) {
//       const savedToken = localStorage.getItem("authToken");
//       const savedUser = localStorage.getItem("user");

//       if (savedToken && savedUser) {
//         commit("setToken", savedToken);
//         try {
//           commit("setUser", JSON.parse(savedUser));
//         } catch (e) {
//           console.error("Failed to parse user");
//         }
//       }
//     }
//   },

//   logout({ commit }: { commit: Function }) {
//     commit("setUser", null);
//     commit("setToken", null);

//     if (import.meta.client) {
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       navigateTo("/login");
//     }
//   },
// };
