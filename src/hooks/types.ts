export interface IUseAuth {
  signIn: (email: string) => Promise<void | string>;
  signOut: () => void;
  error: string;
  isLoading: boolean;
}
