import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";

function removeDiacritics(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function filterVietnameseData(
  dataArray: IAutocompleteOption[],
  searchValue: string,
  display = "label"
) {
  const normalizedSearchValue = removeDiacritics(searchValue.toLowerCase());

  return dataArray.filter((item) =>
    removeDiacritics(item[display].toLowerCase()).includes(
      normalizedSearchValue
    )
  );
}
