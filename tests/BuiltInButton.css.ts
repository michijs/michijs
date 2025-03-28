import { useStyleSheet } from "@michijs/michijs";

export const buttonStyle = useStyleSheet((tags) => ({
  [tags]: {
    display: "block",
    backgroundColor: "darkred",
    width: "fit-content",
    height: "fit-content",
    minWidth: "40px",
    minHeight: "40px",
  },
}));
