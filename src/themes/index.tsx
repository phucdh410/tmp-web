import { CalendarMonthOutlined } from "@mui/icons-material";
import { Components, createTheme, Theme } from "@mui/material";
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
  },
  typography: {
    fontSize: 16,
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
          color: "red",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
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
    MuiOutlinedInput: {
      defaultProps: {
        autoComplete: "off",
        autoCapitalize: "off",
        autoCorrect: "off",
        autoSave: "off",
      },
    },
    MuiDatePicker: {
      defaultProps: {
        components: {
          OpenPickerIcon: CalendarMonthOutlined,
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
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
    black: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "page-title": true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    wrapper: true;
  }
}
//#endregion
