import lunr from "lunr";
import data from "./data.json";

export const { tags } = data;

export const tagsArr = Object.keys(tags || {});

export const tagsIndex = lunr(function () {
  this.ref("id");
  this.field("text");
  tagsArr.forEach((tag, i) => {
    this.add({ id: i, text: tag });
  });
});