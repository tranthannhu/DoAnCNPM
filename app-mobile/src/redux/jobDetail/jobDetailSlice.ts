/* eslint-disable @typescript-eslint/naming-convention */
import { createAsyncThunk, createSlice, SerializedError, ThunkDispatch } from '@reduxjs/toolkit';
import { get, post } from '@utils/api';

export const favorite = createAsyncThunk('jobDetail/favorite', async (jobId: string, thunkAPI) => {
  const response = await post(`/jobs/${jobId}/favorites`);
  thunkAPI.dispatch(fetchJobDetailNoUpdate(jobId));
  return response;
})

const jobDetailSlice = createSlice({
  name: 'jobDetail',
  initialState: {
    loading: false,
    error: null as null | SerializedError,
    data: {} as any,
    datediff: ''
  },
  reducers: {
    jobDetail_loading(state) {
      state.loading = true;
    },
    jobDetail_success(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.datediff = countDateDiff(action.payload.createdat);
    },
    jobDetail_error(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(favorite.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(favorite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(favorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

export const {
  jobDetail_loading,
  jobDetail_success,
  jobDetail_error,
} = jobDetailSlice.actions;

export default jobDetailSlice.reducer;

export const fetchJobDetail = (jobId: string) => async (dispatch: any) => {
  dispatch(jobDetail_loading());
  const response = await get(`/jobs/getOne/recently/${jobId}`);
  dispatch(jobDetail_success(response.data));
}

export const fetchJobDetailNoUpdate = (jobId: string) => async (dispatch: any) => {
  dispatch(jobDetail_loading());
  const response = await get(`/jobs/getOne/${jobId}`);
  dispatch(jobDetail_success(response.data));
}

const countDateDiff = (createdat: string) => {
  let datediff;
  if (
    DateDiff.inMinutes(
      new Date(createdat).getTime(),
      new Date().getTime(),
    ) < 60
  ) {
    datediff = `${DateDiff.inMinutes(
      new Date(createdat).getTime(),
      new Date().getTime(),
    )} minutes ago`;
  } else if (
    DateDiff.inHours(
      new Date(createdat).getTime(),
      new Date().getTime(),
    ) < 24
  ) {
    datediff = `${DateDiff.inHours(
      new Date(createdat).getTime(),
      new Date().getTime(),
    )} hours ago`;
  } else {
    datediff = `${DateDiff.inDays(
      new Date(createdat).getTime(),
      new Date().getTime(),
    )} days ago`;
  }
  return datediff;
}

const DateDiff = {
  inHours(d1: number, d2: number) {
    return Math.floor((d2 - d1) / (3600 * 1000));
  },
  inMinutes(d1: number, d2: number) {
    return Math.floor((d2 - d1) / (60 * 1000));
  },
  inDays(d1: number, d2: number) {
    return Math.floor((d2 - d1) / (24 * 3600 * 1000));
  },
  inMonth(d1: number, d2: number) {
    return Math.floor((d2 - d1) / (30 * 24 * 3600 * 1000));
  },
};