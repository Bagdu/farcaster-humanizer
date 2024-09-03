import React from 'react';

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

export const Button = ({ children, ...otherProps }: Props) => (
  <button style={styles.Button} {...otherProps}>
    { children }
  </button>
);

const styles = {
  Button: {
    display: "inline-block",
    color: "#e7e7e7",
    backgroundColor: "#712CF9",
    fontSize: "1em",
    margin: "1em",
    padding: "0.25em 1em",
    borderRadius: "3px",
  }
}
export default Button;

