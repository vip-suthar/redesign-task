import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Flex, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CardsCarousel = ({ activeModals }) => {
  const navigate = useNavigate();

  const [scrollWidth, setScrollWidth] = useState(
    (window.innerWidth - 32) * 0.45
  );
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScrollWidth(window.innerWidth * 0.45);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setScrollPos(0);
  }, [activeModals]);

  return (
    <div
      className="carousel-container"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Flex
        gap={16}
        style={{
          minWidth: "100%",
          transform: `translate(-${scrollPos}px, 0)`,
          transition: "all 0.3s ease",
          width: "max-content",
        }}
        // justify="center"
      >
        {activeModals.map((item) => (
          <Card
            key={item.type}
            hoverable
            style={{ width: 250 }}
            cover={
              <img
                alt="example"
                src={
                  "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                }
                height={150}
                style={{ resize: "contain" }}
              />
            }
            onClick={() => {
              navigate(item.url);
            }}
          >
            <Flex vertical gap={4}>
              <Text strong style={{ fontSize: 16 }}>
                {item.cardTitle}
              </Text>
              <Text type="secondary">
                {item.cardDescription}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>

      {activeModals.length * 266 + 16 > window.innerWidth && (
        <>
          <Button
            icon={<LeftOutlined />}
            className="carousel-btn prev-btn"
            style={{
              display: scrollPos === 0 ? "none" : "flex",
              position: "absolute",
              top: "50%",
              transform: "translate(0, -50%)",
              background: "#00000066",
              color: "#eaeff3",
              padding: "32px 16px",
              border: "none",
              left: 0,
            }}
            size="large"
            onClick={() => {
              if (scrollPos === 0) return;
              setScrollPos((pos) => pos - Math.min(scrollWidth, pos));
            }}
          />
          <Button
            icon={<RightOutlined />}
            className="carousel-btn next-btn"
            style={{
              display:
                scrollPos >= activeModals.length * 266 - window.innerWidth + 16
                  ? "none"
                  : "flex",
              position: "absolute",
              top: "50%",
              transform: "translate(0, -50%)",
              background: "#00000066",
              color: "#eaeff3",
              padding: "32px 16px",
              border: "none",
              right: 0,
            }}
            size="large"
            onClick={() => {
              if (
                scrollPos >=
                activeModals.length * 266 - window.innerWidth + 16
              )
                return;
              setScrollPos(
                (pos) =>
                  pos +
                  Math.min(
                    scrollWidth,
                    activeModals.length * 266 - window.innerWidth + 16 - pos
                  )
              );
            }}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeModals: state.activeModals[
      state.categories[state.activeCategory]
    ].map((modal) => state.modals[modal]),
  };
};

export default connect(mapStateToProps)(CardsCarousel);
