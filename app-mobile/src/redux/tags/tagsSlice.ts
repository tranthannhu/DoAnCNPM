import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { get } from "@utils/api";
import { RootState } from "../reducers";

export const getListTags = createAsyncThunk('getListTags', async () => {
  const response = await get('/jobs/tags/all');
  return response.data;
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    data: [],
    loading: false,
    error: null as null | SerializedError,
    filter: {},
    currentTag: { name: '', id: '' },
    index: 0,
    page: 1,
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload.s;
    },
    setCurrentTag(state, action) {
      console.log(action.payload);
      state.currentTag = action.payload;
    },
    setIndex(state, action) {
      console.log(action.payload);
      state.index = action.payload;
    },
    setPage(state, action) {
      console.log(action.payload);
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListTags.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getListTags.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListTags.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
})

export default tagsSlice.reducer;
export const { setFilter, setCurrentTag, setIndex, setPage } = tagsSlice.actions;