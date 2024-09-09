import React from "react";
import { Flex, Select } from "antd";

import FilterCategories from "./FilterCategories";
import CardsCarousel from "./CardsCarousel";

const PageContent = () => {
  const handleChange = () => {};
  return (
    <Flex vertical style={{ padding: 16 }}>
      {/* <Dropdown /> */}
      <Flex gap={16} align="center" style={{padding: "16px 0", overflow: "hidden"}}>
        <Select
          defaultValue="rel_htl"
          size="large"
          onChange={handleChange}
          options={[
            { value: "rel_htl", label: "Relevence: High to Low" },
            { value: "rel_lth", label: "Relevence: Low to High" },
          ]}
        />
        <FilterCategories />
      </Flex>
      <CardsCarousel />
    </Flex>
  );
};

export default PageContent;
