import React from "react";
import { Flex } from "antd";
import NavLink from "./NavLink";
import logoImg from "./logo.png";

function Navbar() {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        position: "sticky",
        top: 0,
        padding: "0 16px",
        boxShadow: "2px 0 5px #cccccc99",
        borderBottom: "1px solid #d9d9d9",
        background: "#eaeff3",
        zIndex: 9,
      }}
    >
      <Flex gap={32} align="center">
        <img src={logoImg} alt="a" width={100} />
      </Flex>
      <Flex>
        <NavLink to={"/"} label={"Home"} active={true} />
        <NavLink to={"/browse"} label={"Browse"} active={false} />
        <NavLink to={"/blogs"} label={"Blogs"} active={false} />
        <NavLink to={"/faq"} label={"FAQ"} active={false} />
        <NavLink to={"/about"} label={"About"} active={false} />
      </Flex>
    </Flex>
  );
}

export default Navbar;
