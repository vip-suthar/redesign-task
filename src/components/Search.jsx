import React from "react";
import { connect } from "react-redux";
import { AutoComplete, Flex, Tag, Typography } from "antd";

import {
  addActiveTag,
  clearSearchOptions,
  removeActiveTag,
  searchQuery,
} from "../redux/root.slice";

const { Text } = Typography;

function Search({
  tags,
  options,
  relatedTags,
  searchQuery,
  clearSearchOptions,
  addActiveTag,
  removeActiveTag,
}) {
  const onSearch = (val) => {
    searchQuery(val);
  };

  const onSelect = (val) => {
    addActiveTag(val);
  };

  const onClear = () => {
    clearSearchOptions();
  };
  return (
    <Flex
      vertical
      gap={8}
      justify="center"
      align="center"
      style={{ marginTop: 20 }}
    >
      <AutoComplete
        options={options}
        placeholder="Type something..."
        allowClear
        onClear={onClear}
        onSearch={onSearch}
        onSelect={onSelect}
        style={{
          width: 300,
        }}
        size={"large"}
      />
      <Flex
        gap={2}
        wrap
        style={{ maxWidth: "70%" }}
        align="center"
        justify="center"
      >
        {tags.map((tag, i) => (
          <Tag
            key={tag}
            closeIcon
            onClose={() => {
              removeActiveTag(tag);
            }}
          >
            {tag}
          </Tag>
        ))}
      </Flex>
      {relatedTags && (
        <Flex align="center" justify="center" style={{ maxWidth: "70%" }}>
          <Text style={{ marginRight: 8 }}>Related Tags:</Text>
          <Flex gap={2} wrap>
            {relatedTags.map((tag, i) => (
              <Tag
                key={tag}
                onClick={() => {
                  addActiveTag(tag);
                }}
                style={{ cursor: "pointer" }}
              >
                {tag}
              </Tag>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

const mapStateToProps = (state) => {
  return {
    options: state.searchOptions.map((opt) => ({ value: opt, key: opt })),
    tags: state.activeTags,
    relatedTags: state.relatedTags,
  };
};

export default connect(mapStateToProps, {
  searchQuery,
  clearSearchOptions,
  addActiveTag,
  removeActiveTag,
})(Search);
