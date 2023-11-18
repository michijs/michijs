import { useStyleSheet } from "../src";

export const buttonStyle = useStyleSheet({
  'button[is="built-in-button"]': {
    display: "block",
    backgroundColor: "darkred",
    width: "fit-content",
    height: "fit-content",
    minWidth: "40px",
    minHeight: "40px",
  },
});
