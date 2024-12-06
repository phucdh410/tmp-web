import { Link } from "@mui/material";
import classNames from "classnames";

import { ICFileProps } from "./types";

export const CFile = ({
  fileName,
  url,
  usingImageFromIcoolStaff = false,
}: ICFileProps) => {
  return (
    <Link
      className={classNames("c-link")}
      href={
        usingImageFromIcoolStaff
          ? `${import.meta.env.VITE_ICOOL_STAFF_API}/view-medias/${url}`
          : url
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {fileName}
    </Link>
  );
};
