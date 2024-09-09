import React from "react";
import { Flex, Typography } from "antd";

const { Title, Text } = Typography;

function PageHaeader() {
  return (
    <Flex vertical gap={8} align="center" style={{ marginTop: 16 }}>
      <Title style={{ margin: 0 }}>Pick your occasion</Title>
      <Text>
        Make your occasion memorable using our AI-generated ideas, personally
        crafted for you.
      </Text>
    </Flex>
  );
}

export default PageHaeader;
