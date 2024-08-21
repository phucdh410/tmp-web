import { useSelector as useReduxSelector } from "react-redux";

import { IRootState } from "@redux/index";

export const useSelector = useReduxSelector.withTypes<IRootState>();
