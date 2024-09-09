import { Typography } from "antd";
import React from "react";

const {Text} = Typography

const NavLink = ({ label, to, active }) => {
  return (
    <Text
      style={{
        height: "100%",
        boxSizing: "border-box",
        borderBottom: `3px solid ${active ? "#f97b14" : "transparent"}`,
        padding: 16,
      }}
    >
      {label}
    </Text>
  );
};

export default NavLink;
