import { createSlice } from "@reduxjs/toolkit";

import { tagsArr, tagsIndex, tags } from "../utils/tags.util";
import {
  MAX_SEARCH_OPTIONS,
  modals,
  occasions,
  occModalMap,
} from "../utils/modals.util";

const defaultModals = occasions.reduce((acc, oc) => {
  acc[oc] = occModalMap[oc] || [];
  return acc;
}, {});

const initialState = {
  categories: occasions,
  activeCategory: 0,
  disabledCategories: [],
  activeModals: defaultModals,
  modals,
  searchOptions: [],
  activeTags: [],
  relatedTags: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setCategoryActive: (state, action) => {
      const catIndex = occasions.findIndex((oc) => oc === action.payload);
      if (
        catIndex > -1 &&
        catIndex < occasions.length &&
        !state.disabledCategories.includes(action.payload)
      ) {
        state.activeCategory = catIndex;
      }

      return state;
    },
    searchQuery: (state, action) => {
      const searchQuery = action.payload;
      const res = tagsIndex.search(searchQuery);

      state.searchOptions = res
        .map((item) => tagsArr[item.ref])
        .splice(0, MAX_SEARCH_OPTIONS);

      return state;
    },
    clearSearchOptions: (state) => {
      state.searchOptions = [];
      return state;
    },
    addActiveTag: (state, action) => {
      const tag = action.payload;

      if (!state.activeTags.includes(tag)) {
        state.activeTags.push(tag);

        //check for related tags
        if (!state.relatedTags) state.relatedTags = [];

        const relatedTags = [
          ...state.relatedTags,
          ...(tags[tag]?.related || []),
        ];

        const tagsFreq = [];
        new Set(relatedTags).forEach((t) => {
          tagsFreq.push([t, relatedTags.filter((tg) => tg === t).length]);
        });

        state.relatedTags = tagsFreq
          .sort((a, b) => a[1] - b[1])
          .map((t) => t[0])
          .filter((t) => !state.activeTags.includes(t))
          .splice(0, 8);

        const weightedModals = {};
        state.activeTags.forEach((t) => {
          tags[t]?.modals?.forEach((m) => {
            if (!weightedModals.hasOwnProperty(m[0])) weightedModals[m[0]] = 1;
            weightedModals[m[0]] += m[1];
          });
        });

        const activeModals = Object.keys(weightedModals)
          .map((m) => [m, weightedModals[m]])
          .sort((a, b) => a[1] - b[1])
          .map((m) => m[0]);

        state.disabledCategories = [];

        state.activeModals = occasions.reduce((acc, oc) => {
          acc[oc] = activeModals.filter((m) => occModalMap[oc].includes(m));
          if (acc[oc].length === 0) state.disabledCategories.push(oc);
          return acc;
        }, {});

        if (state.disabledCategories.includes(occasions[state.activeCategory]))
          state.activeCategory = occasions.findIndex(
            (oc) => !state.disabledCategories.includes(oc)
          );

        return state;
      }

      return state;
    },
    removeActiveTag: (state, action) => {
      const tag = action.payload;
      const index = state.activeTags.indexOf(tag);

      if (index < -1) return state;
      // remove irrelevant tags
      state.relatedTags.push(...state.activeTags.splice(index, 1));

      if (state.activeTags.length === 0) {
        state.relatedTags = null;
        state.activeCategory = 0;
        state.disabledCategories = [];
        state.activeModals = defaultModals;
        return state;
      }

      state.relatedTags = state.relatedTags.splice(0, 8);

      const weightedModals = {};
      state.activeTags.forEach((t) => {
        tags[t]?.modals?.forEach((m) => {
          if (!weightedModals.hasOwnProperty(m[0])) weightedModals[m[0]] = 1;
          weightedModals[m[0]] += m[1];
        });
      });

      const activeModals = Object.keys(weightedModals)
        .map((m) => [m, weightedModals[m]])
        .sort((a, b) => a[1] - b[1])
        .map((m) => m[0]);

      state.disabledCategories = [];

      state.activeModals = occasions.reduce((acc, oc) => {
        acc[oc] = activeModals.filter((m) => occModalMap[oc].includes(m));
        if (acc[oc].length === 0) state.disabledCategories.push(oc);
        return acc;
      }, {});

      if (state.disabledCategories.includes(occasions[state.activeCategory]))
        state.activeCategory = occasions.findIndex(
          (oc) => !state.disabledCategories.includes(oc)
        );
    },
  },
});

export const {
  setCategoryActive,
  searchQuery,
  clearSearchOptions,
  addActiveTag,
  removeActiveTag,
} = rootSlice.actions;

export default rootSlice.reducer;
