export interface SnackbarContextValue {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}