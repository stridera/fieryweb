import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";
import moment from "moment";

const url = "/characters";

const slice = createSlice({
  name: "characters",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    charactersRequested: (characters, action) => {
      characters.loading = true;
    },

    charactersReceived: (characters, action) => {
      characters.list = action.payload;
      characters.loading = false;
      characters.lastFetch = Date.now();
    },

    charactersRequestFailed: (characters, action) => {
      characters.loading = false;
    },

    characterAdded: (characters, action) => {
      characters.list.push(action.payload);
    },
  },
});

export const { characterAdded, charactersReceived, charactersRequested, charactersRequestFailed } = slice.actions;
export default slice.reducer;

// Action Creators

export const loadCharacters = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.characters;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: charactersRequested.type,
      onSuccess: charactersReceived.type,
      onError: charactersRequestFailed.type,
    })
  );
};

export const addCharacter = (character) =>
  apiCallBegan({
    url,
    method: "post",
    data: character,
    onSuccess: characterAdded.type,
  });

export const getUnresolvedCharacters = createSelector(
  (state) => state.entities.characters,
  (state) => state.entities.projects,
  (characters, projects) => characters.list.filter((character) => !character.resolved)
);
