import { ICTableHeader, TCTableHeaders } from "./types";

const traverseTree = <T>(
  nodes: TCTableHeaders<T>,
  level = 0,
  result: TCTableHeaders<T>[] = []
): TCTableHeaders<T>[] => {
  if (!result[level]) result[level] = [];

  nodes.forEach((node) => {
    result[level].push(node);

    if (node.children) {
      traverseTree(node.children, level + 1, result);
    }
  });

  return result;
};

const calculateColSpan = <T>(node: ICTableHeader<T>): number => {
  if (!node.children) return 1;
  return node.children.reduce(
    (colSpan, child) => colSpan + calculateColSpan(child),
    0
  );
};

/**
 * Transform initial headers (nested) to handle headers have row span
 * @param originalHeaders The original headers base on ICTableHeader with nested children
 * @returns Return headers prop into a list headers for rendering headers multiline
 */
export const transformHeaders = <T>(
  originalHeaders: ICTableHeader<T>[]
): TCTableHeaders<T>[] => {
  const result = traverseTree<T>(originalHeaders);
  result.forEach((levelNodes, levelIndex) => {
    levelNodes.forEach((node) => {
      node.colSpan = calculateColSpan(node);
      if (node.children) {
        node.rowSpan = 1;
      } else {
        node.rowSpan = result.length - levelIndex;
      }
    });
  });
  return result;
};

/**
 * Generate a random key for rendering elements in JSX/TSX
 * @param stuff This is maybe a key or value or anythings
 * @returns Return a string with structure ex:`stuff-99999-123456`
 */
export const generateKeyJSX = (stuff?: any) => {
  return stuff
    ? `${stuff?.toString()}-${Math.floor(
        Math.random() * 99999
      )}-${new Date().getTime()}`
    : `${Math.floor(Math.random() * 99999)}-${new Date().getTime()}`;
};

/**
 * Converts a hex color to an RGBA color with a specified alpha value.
 * @param hex - The hex color string (e.g., "#RRGGBB" or "#RGB").
 * @param alpha - The desired alpha value (0 to 1).
 * @returns The RGBA color string.
 */
export const addAlphaToHexColor = (hex: string, alpha: number): string => {
  // Remove the hash if it's there
  hex = hex.replace(/^#/, "");

  // Expand shorthand hex (e.g., "03F") to full form (e.g., "0033FF")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert to RGB values
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Return as RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
