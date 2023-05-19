import { createStyleSheet } from "../../src";

export const counterStyle = createStyleSheet({
  ":host": {
    display: "inline-flex",
    flexDirection: "row",
    "(:disabled)": {
      backgroundColor: "gray",
    },
    "(:invalid)": {
      border: "1px solid red",
    },
    // '@media (max-width: 600px)': {
    //   color: 'blue'
    // }
  },
  span: {
    minWidth: "60px",
    textAlign: "center",
  },
});
