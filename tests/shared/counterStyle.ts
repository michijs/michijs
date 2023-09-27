import { useStyleSheet } from "../../src";

export const counterStyle = useStyleSheet({
  ":host(:disabled)": {
    backgroundColor: "gray",
  },
  ":host(:user-invalid)": {
    border: "1px solid red",
  },
  ":host": {
    display: "inline-flex",
    flexDirection: "row",
    '@media (max-width: 600px)': {
      color: 'blue'
    }
  },
  span: {
    minWidth: "60px",
    textAlign: "center",
  },
});
