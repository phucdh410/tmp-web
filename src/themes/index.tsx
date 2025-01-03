import { HighlightOff } from "@mui/icons-material";
import { Components, createTheme, Grow, Theme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const INPUT_BORDER_RADIUS = "8px";

//#region Breakpoints & Palette & Typography
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      baseContainer: 1306,
      xl: 1536,
      xxl: 1680,
      xxxl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#117db7",
      contrastText: "#fff",
    },
    success: {
      main: "#11B785",
      contrastText: "#fff",
    },
    warning: {
      main: "#B78911",
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
      contrastText: "#333333",
    },
    black: {
      main: "#333",
      contrastText: "#fff",
    },
    paginationBg: {
      main: "#edf5ff",
      contrastText: "#ffffff",
    },
    disabledInputText: {
      main: "rgb(140 140 140)",
    },
    disabledInputBackground: {
      main: "rgb(140 140 140 / 10%)",
    },
  },
  typography: {
    fontFamily: `"Roboto"`,
    fontSize: 14,
    htmlFontSize: 16,
    allVariants: {
      color: "#124874",
    },
  },
});
//#endregion

//#region Components
theme = createTheme(theme, {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#333333",
        },
        asterisk: {
          marginLeft: "5px",
          color: "red",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
          "&.c-form-helper-text": {
            paddingLeft: "10px",
            fontSize: 14,
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "initial",
          borderSpacing: "0 10px",
          marginTop: "-10px",
          "&[class*='scrolled-pin']": {
            "&.scrolled-pin-left .pin-left--last::after": {
              boxShadow: "inset 10px 0 8px -8px rgb(0 0 0/15%)",
            },
            "&.scrolled-pin-right .pin-right--first::after": {
              boxShadow: "inset -10px 0 8px -8px rgb(0 0 0/15%)",
            },
          },
          "&.dense": {
            marginTop: 0,
            borderSpacing: "unset",
            ".MuiTableRow-root": {
              boxShadow: "none",
            },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
          "&.Mui-selected": {
            ".MuiTableCell-root[class*='pin']": {
              background: "rgb(215 235 255)",
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "&.c-table-head": {
            ".MuiTableCell-root": {
              padding: "14px",
              backgroundColor: "#117db7",
              color: "white",
              fontWeight: 600,
              textTransform: "capitalize",
              fontSize: "16px",
              "&.select-cell": {
                padding: 0,
                minWidth: 60,
                ".MuiCheckbox-root": {
                  color: "white!important",
                  "&.Mui-disabled": {
                    color: "#b7b7b7 !important",
                  },
                },
              },
            },
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "&.c-table-body": {
            ".MuiTableRow-root:not(.c-row-empty):not(.disable-hover-row):hover":
              {
                "&:hover": {
                  backgroundColor: "rgba(240, 240, 240)",
                  ".MuiTableCell-root": {
                    backgroundColor: "inherit",
                  },
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "rgb(209 234 255)",
                  ".MuiTableCell-root": {
                    backgroundColor: "inherit",
                  },
                },
              },
            ".MuiTableRow-root.Mui-selected": {
              backgroundColor: "rgb(215 235 255)",
            },
            ".MuiTableRow-root.Mui-selected:hover": {
              backgroundColor: "rgb(164 209 255)",
            },
            ".MuiTableCell-root": {
              padding: "14px",
              fontSize: "16px",
              "&.action-cell,&.select-cell": {
                padding: 0,
              },
              "&.input-cell": {
                paddingBlock: "6px",
              },
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          "&.MuiTableCell-head.MuiTableCell-stickyHeader": {
            zIndex: 4,
            "&.pin-left,&.pin-right": {
              zIndex: 5,
            },
          },
          "&[class*='pin']": {
            position: "sticky",
            zIndex: 3,
            background: "white",
            "&.MuiTableCell-head": {
              background: theme.palette.primary.main,
              "&.MuiTableCell-stickyHeader.select-cell": {
                zIndex: 6,
              },
            },
            "&.pin-left--last,&.pin-right--first": {
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 30,
                transition: "220ms ease",
              },
            },
            "&.pin-left--last::after": {
              right: 0,
              transform: "translateX(100%)",
              //note: Sẽ được MuiTable ↑ xử lý để thêm shadow chỉ khi scroll
              // boxShadow: "inset 10px 0 8px -8px rgb(0 0 0/15%)",
            },
            "&.pin-right--first::after": {
              left: 0,
              transform: "translateX(-100%)",
              //note: Sẽ được MuiTable ↑ xử lý để thêm shadow chỉ khi scroll
              // boxShadow: "inset -10px 0 8px -8px rgb(0 0 0/15%)",
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: "off",
        autoCapitalize: "off",
        autoCorrect: "off",
        autoSave: "off",
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        blurOnSelect: true,
        ChipProps: {
          deleteIcon: <HighlightOff />,
        },
      },
      styleOverrides: {
        root: {
          "&.c-autocomplete": {
            ".MuiOutlinedInput-root": {
              padding: 0,
              paddingRight: "39px",
              borderRadius: INPUT_BORDER_RADIUS,
            },
            input: {
              "&.MuiOutlinedInput-input": {
                height: "unset",
                padding: "10px 20px",
                lineHeight: "22px",
              },
            },
            "&.hide-popup-icon": {
              ".MuiOutlinedInput-root": {
                paddingRight: 0,
              },
              ".MuiAutocomplete-endAdornment": {
                display: "none",
              },
            },
          },
        },
        tag: {
          color: theme.palette.primary.main,
          borderRadius: "5px",
          background: "#C4D9E4",
          fontWeight: 500,
          height: 28,
          ".MuiChip-label": {
            paddingLeft: 8,
          },
          "svg.MuiSvgIcon-root": {
            color: "inherit",
            fontSize: 20,
          },
        },
        paper: {
          //note: custom listbox không nhận được các css
          //note: từ theme provider, nên phải css chay
          //note: từ cấp paper xuống listbox và từng item
          ".MuiAutocomplete-listbox.virtual-listbox[role='listbox']": {
            listStyle: "none",
            margin: 0,
            padding: "8px 0",
            maxHeight: "40vh",
            overflow: "auto",
            position: "relative",
            ".MuiAutocomplete-option": {
              minHeight: "auto",
              display: "flex",
              overflow: "hidden",
              justifyContent: "flex-start",
              alignItems: "center",
              cursor: "pointer",
              paddingTop: "6px",
              boxSizing: "border-box",
              outline: "0",
              paddingBottom: "6px",
              paddingLeft: "16px",
              paddingRight: "16px",
              "&.Mui-focused": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              "&[aria-selected='true']": {
                backgroundColor: "rgba(17, 125, 183, 0.08)",
                "&.Mui-focused": {
                  backgroundColor: "rgba(17, 125, 183, 0.12)",
                },
              },
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        autoComplete: "off",
        autoCapitalize: "off",
        autoCorrect: "off",
        autoSave: "off",
      },
      styleOverrides: {
        root: {
          "&.c-input": {
            fontSize: 16,
            borderRadius: INPUT_BORDER_RADIUS,
            "&.MuiInputBase-multiline": {
              padding: "10px 20px",
            },
            "& input": {
              padding: "10px 20px",
              height: "unset",
              lineHeight: "22px",
            },
            // "&.c-number-input": {
            //   input: {
            //     textAlign: "right",
            //   },
            // },
          },
          "&:has(#pagination-go-to)": {
            background: theme.palette.paginationBg.main,
            borderRadius: "6px",
            input: {
              fontSize: 14,
              padding: "8px 12px",
              width: 50,
            },
          },
          "&.Mui-readOnly": {
            cursor: "default",
            input: {
              cursor: "default",
            },
          },
          "&.Mui-disabled": {
            color: theme.palette.disabledInputText.main,
            background: theme.palette.disabledInputBackground.main,
            "input,textarea": {
              color: "inherit",
              WebkitTextFillColor: theme.palette.disabledInputText.main,
            },
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: "#8f8f8f",
            opacity: 1,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.c-select": {
            borderRadius: INPUT_BORDER_RADIUS,
            ".MuiSelect-select": {
              paddingBlock: "10px",
              paddingLeft: "20px",
              lineHeight: "22px",
              minHeight: "unset",
              borderRadius: "inherit",
            },
          },
          "&:has(#pagination-page-size)": {
            background: theme.palette.paginationBg.main,
            borderRadius: "6px",
            div: {
              "&#pagination-page-size": {
                fontSize: 14,
                padding: "8px 12px",
                paddingRight: "8px",
              },
            },
            svg: {
              marginRight: "4px",
            },
          },
        },
      },
    },
    MuiDatePicker: {}, //! I DON'T KNOW WHY THIS NO LONGER SUPPORT STYLE OVERRIDES
    //! WE MUST STYLE FOR CHILD COMPONENT OF DATEPICKER
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          fontWeight: 800,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: "0.85rem",
          fontWeight: 500,
          "&.Mui-selected,&:focus.Mui-selected": {
            backgroundColor: "transparent",
            color: "#2a6aeb",
            border: "2px solid #2a6aeb",
            "&:hover": {
              backgroundColor: "rgb(230 246 255)",
            },
          },
        },
        today: {
          "&:focus": {
            backgroundColor: "transparent",
          },
          color: "red",
          border: "none",
          "&.MuiPickersDay-root:not(.Mui-selected)": {
            border: "none",
            "&:after": {
              content: "''",
              position: "absolute",
              borderRadius: "100%",
              height: "4px",
              width: "4px",
              bottom: "4px",
              backgroundColor: "red",
            },
          },
        },
        dayOutsideMonth: {
          color: "rgb(141 141 141 / 60%)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          "&.c-button": {
            letterSpacing: "0.01em",
            fontSize: "1rem",
            "&.creatable-autocomplete-button": {
              justifyContent: "start",
              backgroundColor: "#3382ff",
              "&:hover": {
                backgroundColor: "#009DFFFF",
              },
            },
            "&.highlight": {
              "&:hover": {
                backgroundColor: "#26b3ff",
                boxShadow: "0 0 10px 4px #26b3ff80",
              },
            },
          },
        },
        startIcon: {
          "#c-button-loading-icon": {
            height: "22px!important",
            width: "22px!important",
            color: "#848484",
          },
        },
        text: {
          "&.c-button": {
            whiteSpace: "nowrap",
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderWidth: "2px",
            "&.Mui-disabled": {
              borderWidth: "2px",
              background: "#f3f3f3",
            },
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "header-page" },
          style: {
            textTransform: "uppercase",
            display: "block",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "32px",
            lineHeight: "38px",
            whiteSpace: "pre-line",
            color: "#505050",
          },
        },
        {
          props: { variant: "dialog-title" },
          style: {
            textTransform: "uppercase",
            color: "white",
            background: theme.palette.primary.main,
            display: "block",
            fontWeight: 500,
            fontSize: 24,
            padding: "12px 30px",
          },
        },
        {
          props: { variant: "text-link" },
          style: {
            cursor: "pointer",
            color: theme.palette.primary.main,
            fontWeight: 500,
            "&:hover": {
              color: "#009cd8",
            },
          },
        },
      ],
    },
    MuiPaper: {
      // box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
      variants: [
        {
          props: { variant: "tool-card" },
          style: {
            background: "white",
            boxShadow: "0px 0px 18px 0px rgba(0, 0, 0, 0.10)",
          },
        },
      ],
    },
    MuiDialog: {
      defaultProps: {
        TransitionComponent: Grow,
      },
      styleOverrides: {
        root: {
          ".MuiBackdrop-root.MuiModal-backdrop": {
            backdropFilter: "blur(1px)",
            background: "#00000040",
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          "&.c-button-group": {
            "&.table-actions": {
              ".MuiButton-root": {
                width: "unset",
                lineHeight: "18.75px",
              },
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          "&.c-link": {
            textDecoration: "none",
            fontWeight: 500,
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          padding: "6px 10px",
          fontSize: "0.75rem",
        },
      },
    },
    MuiToggleButtonGroup: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          lineHeight: "unset",
          fontSize: "1rem",
          padding: "10px 16px",
        },
      },
    },
  } as Components<Omit<Theme, "components">>,
});
//#endregion

export default theme;

//#region Declare
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    baseContainer: true;
    xl: true;
    xxl: true;
    xxxl: true;
  }
  interface Palette {
    white: Palette["primary"];
    black: Palette["primary"];
    paginationBg: Palette["primary"];
    disabledInputText: Palette["primary"];
    disabledInputBackground: Palette["primary"];
    // newColor1: Palette["primary"];
    // newColor2: Palette["primary"];
    // newColor3: Palette["primary"];
    // newColor4: Palette["primary"];
    // newColor5: Palette["primary"];
    // newColor6: Palette["primary"];
    // newColor7: Palette["primary"];
    // newColor8: Palette["primary"];
    // newColor9: Palette["primary"];
    // newColor10: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    paginationBg?: PaletteOptions["primary"];
    disabledInputText?: PaletteOptions["primary"];
    disabledInputBackground?: PaletteOptions["primary"];
    // newColor1?: Palette["primary"];
    // newColor2?: Palette["primary"];
    // newColor3?: Palette["primary"];
    // newColor4?: Palette["primary"];
    // newColor5?: Palette["primary"];
    // newColor6?: Palette["primary"];
    // newColor7?: Palette["primary"];
    // newColor8?: Palette["primary"];
    // newColor9?: Palette["primary"];
    // newColor10?: Palette["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
    black: true;
    paginationBg: true;
    disabledInputText: true;
    disabledInputBackground: true;
    // newColor1: true;
    // newColor2: true;
    // newColor3: true;
    // newColor4: true;
    // newColor5: true;
    // newColor6: true;
    // newColor7: true;
    // newColor8: true;
    // newColor9: true;
    // newColor10: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    white: true;
    black: true;
    paginationBg: true;
    disabledInputText: true;
    disabledInputBackground: true;
    // newColor1: true;
    // newColor2: true;
    // newColor3: true;
    // newColor4: true;
    // newColor5: true;
    // newColor6: true;
    // newColor7: true;
    // newColor8: true;
    // newColor9: true;
    // newColor10: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "header-page": true;
    "dialog-title": true;
    "text-link": true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    "tool-card": true;
  }
}
//#endregion
