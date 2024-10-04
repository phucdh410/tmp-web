export const defaultFormatter = (currentValue: any) =>
  !currentValue ? 0 : currentValue.toLocaleString();

export const defaultParser = (currentValue: any): number =>
  Number(currentValue.replace(/\D/g, ""));
