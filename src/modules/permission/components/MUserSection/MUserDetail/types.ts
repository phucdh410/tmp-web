export interface IMUserDetailRef {
  refetch: () => void;
  submit: () => Promise<void>;
  reset: () => void;
}

export interface IMUserDetailProps {}
