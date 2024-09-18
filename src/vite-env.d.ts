/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.lottie" {
  const content: json;
  export default content;
}
