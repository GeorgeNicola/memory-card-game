import { Store } from "vuex";
import { AuthState } from '~/store/auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<AuthState>;
  }
}

declare module 'vuex' {
  export function useStore<S = AuthState>(): Store<S>;
}
