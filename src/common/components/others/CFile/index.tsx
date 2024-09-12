import { Link } from "@mui/material";
import classNames from "classnames";

import { ICFileProps } from "./types";

export const CFile = ({ fileName, url }: ICFileProps) => {
  return (
    <Link
      className={classNames("c-link")}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {fileName}
    </Link>
  );
};
