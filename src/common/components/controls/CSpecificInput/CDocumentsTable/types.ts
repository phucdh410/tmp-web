import { Control, FieldValues } from "react-hook-form";

import { IDocumentInPayload } from "@interfaces/documents";

export interface IDocuments extends FieldValues {
  documents: IDocumentInPayload[];
}

export interface ICDocumentsTableProps<T extends IDocuments> {
  control: Control<T>;
  hideTitle?: boolean;
}
