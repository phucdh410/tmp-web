export interface ICConfirmProps {
  title: string;
  content?: string;
  onProceed?: () => Promise<any> | void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}
