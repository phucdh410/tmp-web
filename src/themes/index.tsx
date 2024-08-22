import { CalendarMonthOutlined } from "@mui/icons-material";
import { Components, createTheme, Grow, Theme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

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
    success: {
      main: "#11B785",
      contrastText: "#fff",
    },
    primary: {
      main: "#117db7",
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
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
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
            },
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "&.c-table-body": {
            ".MuiTableRow-root:hover": {
              backgroundColor: "rgba(240, 240, 240)",
            },
            ".MuiTableRow-root.Mui-selected": {
              backgroundColor: "rgb(215 235 255)",
            },
            ".MuiTableRow-root.Mui-selected:hover": {
              backgroundColor: "rgb(179 217 255)",
            },
            ".MuiTableCell-root": {
              padding: "14px",
              fontSize: "16px",
              "&.action-cell": {
                padding: 0,
              },
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
      },
      styleOverrides: {
        root: {
          "&.c-autocomplete": {
            ".MuiOutlinedInput-root": {
              padding: 0,
              paddingRight: "39px",
            },
            input: {
              "&.MuiOutlinedInput-input": {
                height: "unset",
                padding: "12px 20px",
                lineHeight: "18.75px",
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
            "& input": {
              padding: "12px 20px",
              height: "unset",
              lineHeight: "18.75px",
            },
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
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {},
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
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
    MuiDatePicker: {
      defaultProps: {
        components: {
          OpenPickerIcon: CalendarMonthOutlined,
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
          "&.c-button": {
            letterSpacing: "0.01em",
            fontSize: "1rem",
          },
        },
        startIcon: {
          "#c-button-loading-icon": {
            height: "22px!important",
            width: "22px!important",
            color: "#848484",
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "header-page" },
          style: {
            textTransform: "uppercase",
            display: "block",
            textAlign: "center",
            fontWeight: 500,
            fontSize: "32px",
            lineHeight: "38px",
            whiteSpace: "pre-line",
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
      ],
    },
    MuiPaper: {
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
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    paginationBg?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
    black: true;
    paginationBg: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "header-page": true;
    "dialog-title": true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    "tool-card": true;
  }
}
//#endregion
