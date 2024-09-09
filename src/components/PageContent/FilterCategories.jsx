import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Flex, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { setCategoryActive } from "../../redux/root.slice";

const { Text } = Typography;

const FilterCategories = ({ categories, setCategoryActive }) => {
  
  const [scrollWidth, setScrollWidth] = useState(
    (window.innerWidth - 260) * 0.45
  );
  const [scrollPos, setScrollPos] = useState(0);
  const chipContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setScrollWidth((window.innerWidth - 260) * 0.45);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: "calc(100% - 227.49px)", position: "relative" }}>
      <div
        className="filter-cat-container"
        style={{ width: "calc(100% - 32px)", overflow: "hidden" }}
      >
        <Flex
          style={{
            height: "max-content",
            width: "max-content",
            padding: "0 32px",
            transform: `translate(-${scrollPos}px, 0)`,
            transition: "all 0.3s ease",
          }}
          gap={8}
          ref={chipContainerRef}
        >
          {categories.map((item) => (
            <div
              key={item.name}
              style={{
                padding: "8px 16px",
                backgroundColor: item.disabled ? "#ededed" : "#fcfcfc",
                border: "1px solid",
                borderColor: item.active ? "#1677ff" : "#d9d9d9",
                borderRadius: 32,
                cursor: "pointer",
                width: "max-content",
              }}
              onClick={() => {
                !item.disabled && setCategoryActive(item.name);
              }}
            >
              <Text
                disabled={item.disabled}
                style={{ color: item.active ? "#1677ff" : "#000000d1" }}
              >
                {item.name}
              </Text>
            </div>
          ))}
        </Flex>
      </div>
      <Button
        icon={<LeftOutlined />}
        style={{
          display: scrollPos === 0 ? "none" : "flex",
          position: "absolute",
          height: "100%",
          border: "none",
          color: "#666",
          background:
            "linear-gradient(0.25turn, rgb(234, 239, 243) 66%, transparent)",
          left: 0,
          top: 0,
          width: 48,
          paddingRight: 16,
          boxShadow: "none",
        }}
        onClick={() => {
          if (scrollPos === 0) return;
          setScrollPos((pos) => pos - Math.min(scrollWidth, pos));
        }}
      />
      <Button
        icon={<RightOutlined />}
        style={{
          display:
            scrollPos + window.innerWidth - 292 >=
            chipContainerRef.current?.scrollWidth
              ? "none"
              : "flex",
          position: "absolute",
          height: "100%",
          border: "none",
          color: "#666",
          background:
            "linear-gradient(0.25turn, transparent, rgb(234, 239, 243) 34%)",
          right: 0,
          top: 0,
          width: 48,
          paddingLeft: 16,
          boxShadow: "none",
        }}
        onClick={() => {
          if (
            chipContainerRef.current &&
            chipContainerRef.current.scrollWidth
          ) {
            if (
              scrollPos >=
              chipContainerRef.current.scrollWidth - window.innerWidth + 292
            )
              return;
            setScrollPos(
              (pos) =>
                pos +
                Math.min(
                  scrollWidth,
                  chipContainerRef.current.scrollWidth -
                    window.innerWidth +
                    292 -
                    pos
                )
            );
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories
      .map((cat, i) => ({
        name: cat,
        active: state.activeCategory === i,
        disabled: state.disabledCategories.includes(cat),
      }))
      .sort((a, b) => a.disabled - b.disabled),
  };
};

export default connect(mapStateToProps, { setCategoryActive })(
  FilterCategories
);
