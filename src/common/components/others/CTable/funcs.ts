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

//note: Handle table with nested headers
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

//note: Generate key for rendering elements in JSX/TSX
export const generateKeyJSX = (stuff?: any) => {
  return stuff
    ? `${stuff?.toString()}-${Math.floor(
        Math.random() * 99999
      )}-${new Date().getTime()}`
    : `${Math.floor(Math.random() * 99999)}-${new Date().getTime()}`;
};
