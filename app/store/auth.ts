// import type { User } from "@prisma/client";

// // 1. Definim forma stării
// export interface AuthState {
//   user: User | null;
//   token: string | null;
// }

// // 2. Starea inițială
// export const state = (): AuthState => ({
//   user: null,
//   token: null,
// });

// // 3. Getters tipizați
// export const getters = {
//   isAuthenticated: (state: AuthState): boolean => !!state.token,
//   getUser: (state: AuthState): User | null => state.user,
// };

// // 4. Mutations tipizate
// export const mutations = {
//   SET_AUTH(state: AuthState, payload: { user: User; token: string }) {
//     state.user = payload.user;
//     state.token = payload.token;
//   },
//   CLEAR_AUTH(state: AuthState) {
//     state.user = null;
//     state.token = null;
//   },
// };

// // 5. Actions tipizate
// export const actions = {
//   initAuth({ commit }: { commit: Function }) {
//     console.log("Initializing auth from global state");
//     if (import.meta.client) {
//       const savedToken = localStorage.getItem("authToken");
//       const savedUser = localStorage.getItem("user");

//       if (savedToken && savedUser) {
//         try {
//           commit("SET_AUTH", {
//             token: savedToken,
//             user: JSON.parse(savedUser) as User,
//           });
//         } catch (e) {
//           console.error("Failed to parse user from storage");
//         }
//       }
//     }
//   },

//   async login(
//     { commit }: { commit: Function },
//     { email, password }: { email: string; password: string },
//   ) {
//     // Înlocuiește 'any' cu tipul de răspuns de la API-ul tău dacă este disponibil
//     const userData = await $fetch<User & { userId: string }>("/api/login", {
//       method: "POST",
//       body: { email, password },
//     });

//     const token = JSON.stringify(userData.userId);
//     commit("SET_AUTH", { user: userData, token });

//     if (import.meta.client) {
//       localStorage.setItem("authToken", token);
//       localStorage.setItem("user", JSON.stringify(userData));
//     }

//     return userData;
//   },

//   logout({ commit }: { commit: Function }) {
//     commit("CLEAR_AUTH");
//     if (import.meta.client) {
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       navigateTo("/login");
//     }
//   },
// };
