import { useStyleSheet } from "@michijs/michijs";

export const counterStyle = useStyleSheet({
  ':host': {
    "(:disabled)": {
      backgroundColor: "gray",
    },
    "(:user-invalid)": {
      border: "1px solid red",
    },
    display: "inline-flex",
    flexDirection: "row",
    "@media (max-width: 600px)": {
      color: "blue",
    },
  },
  span: {
    minWidth: "60px",
    textAlign: "center",
  },
});
