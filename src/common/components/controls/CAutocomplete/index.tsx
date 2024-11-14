import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { filterVietnameseData } from "@funcs/filter-search";
import { AutoAwesome, ExpandMore } from "@mui/icons-material";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  createFilterOptions,
  FilterOptionsState,
  Paper,
  PaperProps,
  TextField,
} from "@mui/material";
import { CSpinnerLoading } from "@others";
import classNames from "classnames";

import { CButton } from "../CButton";
import { CFormControl } from "../CFormControl";

import { ALL_OPTION } from "./constants";
import {
  IAutocompleteOption,
  ICAutocompleteProps,
  ICAutocompleteRef,
} from "./types";
import { VirtualListBox } from "./VirtualComponents";

export const CAutocomplete = forwardRef<ICAutocompleteRef, ICAutocompleteProps>(
  (
    {
      value,
      onChange,
      className,
      disableClearable = true,
      options: _options = [],
      placeholder,
      fullWidth = true,
      get = "id",
      display = "label",
      error = false,
      errorText = "",
      hoverable = false,
      disablePortal = false,
      optionAll = false,
      creatable = false,
      onCreateClick,
      multiple = false,
      noOptionsText = "Không có lựa chọn",
      renderOption,
      easyCreate,
      hidePopupIcon = false,
      getOptionDisabled,
      loading,
      loadingText,
      loadMore,
      isDirtyOptions,
      virtual,
      ...props
    },
    ref
  ) => {
    //#region Data
    const inputRef = useRef<HTMLInputElement>(null);
    const popperRef = useRef<HTMLDivElement | null>(null);

    const [firstTimeOpen, setFirstTimeOpen] = useState(true);

    const options = useMemo<IAutocompleteOption[]>(() => {
      if (optionAll) {
        return [ALL_OPTION, ..._options];
      } else return _options;
    }, [_options, optionAll]);

    const currentValue = useMemo(() => {
      if (value === null) {
        return null;
      }
      if (multiple) {
        const result = options.filter((opt) => value.includes(opt[get]));
        return result;
      }
      if (typeof value === "string" || typeof value === "number") {
        const found = options.find((opt) => opt[get] === value);
        return found ?? null;
      } else if (typeof value === "object") {
        const found = options.find((opt) => opt[get] === value[get]);
        return found ?? null;
      }
    }, [value, options, get, multiple]);
    //#endregion

    //#region Event
    // const isOptionEqualToValue = (option: IAutocompleteOption, value: any) => {
    //   if (typeof value !== "object") {
    //     return option[get] === value;
    //   } else {
    //     return option[get] === value[get];
    //   }
    // };

    const getOptionLabel = useCallback(
      (option: IAutocompleteOption) => {
        return option[display] ?? option;
      },
      [display]
    );

    const onClose = (
      event: React.SyntheticEvent,
      reason: AutocompleteCloseReason
    ) => {
      props?.onBlur?.();
    };

    const onAutocompleteChange = (
      event: React.SyntheticEvent,
      selectedOption: IAutocompleteOption | IAutocompleteOption[] | null,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<IAutocompleteOption> | undefined
    ) => {
      if (multiple) {
        const result = (selectedOption as IAutocompleteOption[]).map(
          (e) => e[get]
        );
        onChange?.(result ?? [], event, selectedOption, reason, details);
      } else {
        onChange?.(
          (selectedOption as IAutocompleteOption)?.[get] ?? null,
          event,
          selectedOption as IAutocompleteOption,
          reason,
          details
        );
      }

      // if (hoverable && !multiple) setOpen(false);
    };

    const onBlur = () => {
      props.onBlur?.();
    };

    const onMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
      // console.log("Mouse enter");
      inputRef.current?.focus();
    };

    const onMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
      if (popperRef.current && inputRef.current) {
        const popperRect = popperRef.current.getBoundingClientRect();
        const inputRect = inputRef.current.getBoundingClientRect();
        const { clientX: x, clientY: y } = event;

        const isOutsidePopper =
          x < popperRect.left ||
          x > popperRect.right ||
          y < popperRect.top ||
          y > popperRect.bottom;

        const isOutsideInput =
          x < inputRect.left ||
          x > inputRect.right ||
          y < inputRect.top ||
          y > inputRect.bottom;

        //note: Check if the mouse is outside both popper and input
        if (isOutsidePopper && isOutsideInput) {
          // console.log("Mouse leave");
          inputRef.current.blur();
        } else {
          // console.log("Con trỏ nằm trong div");
        }
      }
    };

    const filterOptions = (
      options: IAutocompleteOption[],
      state: FilterOptionsState<IAutocompleteOption>
    ) => {
      if (firstTimeOpen) return options;
      return filterVietnameseData(options, state.inputValue, display);
    };

    const onInputChange = useCallback(
      (
        event: React.SyntheticEvent,
        value: string,
        reason: AutocompleteInputChangeReason
      ) => {
        if (hoverable) {
          if (reason === "reset") setFirstTimeOpen(true);
          else if (reason === "input") setFirstTimeOpen(false);
        }
      },
      [hoverable]
    );

    const onKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" && inputRef.current) {
        await easyCreate?.(inputRef.current.value);
        if (!multiple) inputRef.current.blur();
      }
    };

    const onCreatableButtonMouseDown = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
      },
      []
    );

    const onCreateButtonClick = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (inputRef.current && easyCreate) {
        await easyCreate(inputRef.current.value);
        if (!multiple) inputRef.current.blur();
      } else if (onCreateClick) {
        const inputValue = inputRef.current?.value;
        onCreateClick(event, inputValue);
        if (!multiple) inputRef.current?.blur();
      }
    };

    const PaperComponent = useCallback(
      //Wrap this with useCallback empty dependencies to paper not re-render when select item
      ({ children, ...props }: PaperProps) => (
        <Paper {...props}>
          {children}
          {creatable && (
            <CButton
              endIcon={<AutoAwesome />}
              fullWidth
              className={classNames("creatable-autocomplete-button")}
              onMouseDown={onCreatableButtonMouseDown}
              onClick={onCreateButtonClick}
            >
              Thêm mới
            </CButton>
          )}
        </Paper>
      ),
      []
    );

    //note: Vì có những options quá dơ (trùng label)
    //note: dẫn đến key của các option đang lấy label trùng nhau
    //note: sẽ gây ra lỗi JSX/TSX quá trình render option
    const renderOptionForDirtyOptions = (
      props: React.HTMLAttributes<HTMLLIElement> & {
        key: any;
      },
      option: IAutocompleteOption
    ) => {
      return (
        <li
          {...props}
          key={`${option[get ?? "id"]}-${
            new Date().getTime() - Math.random() * 100
          }`}
        >
          {option[display ?? "label"]}
        </li>
      );
    };
    //#endregion

    //#region Render
    return (
      <CFormControl error={error} errorText={errorText} fullWidth={fullWidth}>
        <Autocomplete
          {...props}
          onClose={onClose}
          loading={loading}
          openOnFocus
          loadingText={loadingText}
          onBlur={onBlur}
          multiple={multiple}
          blurOnSelect={!multiple}
          disableCloseOnSelect={multiple}
          value={currentValue}
          popupIcon={loading ? <CSpinnerLoading /> : <ExpandMore />}
          fullWidth={fullWidth}
          className={classNames(
            "c-autocomplete",
            hidePopupIcon && "hide-popup-icon",
            className
          )}
          disableClearable={disableClearable}
          options={options}
          onChange={onAutocompleteChange}
          getOptionLabel={getOptionLabel}
          noOptionsText={noOptionsText}
          renderOption={
            isDirtyOptions ? renderOptionForDirtyOptions : renderOption
          }
          // isOptionEqualToValue={isOptionEqualToValue}
          getOptionDisabled={getOptionDisabled}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={inputRef}
              placeholder={placeholder}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {/* {loading ? <CSpinnerLoading /> : null} */}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
              error={error}
            />
          )}
          //?: Customize for creatable
          PaperComponent={PaperComponent}
          //?: Customize for creatable

          //?: Customize for hoverable to open dropdown
          filterOptions={hoverable ? filterOptions : createFilterOptions()}
          disablePortal={hoverable ?? disablePortal}
          onMouseEnter={hoverable ? onMouseEnter : undefined}
          onMouseLeave={hoverable ? onMouseLeave : undefined}
          slotProps={{
            listbox: {
              onScroll:
                loadMore && loadMore.hasMore
                  ? (event) => {
                      const { scrollTop, scrollHeight, clientHeight } =
                        event.target as HTMLUListElement;

                      if (scrollTop + clientHeight >= scrollHeight) {
                        loadMore.fetchMore();
                      }
                    }
                  : undefined,
            },
            popper: hoverable ? { onMouseLeave, ref: popperRef } : undefined,
          }}
          //?: Customize for hoverable to open dropdown

          slots={{
            listbox: virtual ? VirtualListBox : undefined,
          }}
        />
      </CFormControl>
    );
    //#endregion
  }
);
