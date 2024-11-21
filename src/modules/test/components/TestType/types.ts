interface IBaseProps {
  prop1: string;
  prop2: number;
  prop3?: string;
}

interface AutoPaginate {
  autoPaginate: true;
  pagination?: never;
}

interface Pagination {
  autoPaginate?: false;
  pagination?: string[];
}

type ChoicePagi = AutoPaginate | Pagination;

interface NonVirtual {
  height?: string | number;
  virtual?: false;
}

interface Virtual {
  height: string | number;
  virtual: true;
}

type ChoiceVirtual = NonVirtual | Virtual;

// export type ITestProps = (IBaseProps & Virtual) | (IBaseProps & NonVirtual);
export type ITestProps = IBaseProps & ChoiceVirtual & ChoicePagi;
