import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { get, post } from '@utils/api';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { RootState } from '../reducers';

export const fetchCV = createAsyncThunk('apply/fetchCV', async () => {
  console.log('co fetchCV')
  const response = await get(`/apply/cv`);
  console.log(response.data)
  return response.data;
})

export const uploadCV = createAsyncThunk('apply/uploadCV', async (document: any, thunkAPI) => {
  console.log('zo uploadCV')
  const file = new FormData();
  file.append('file', document);
  const result: any = await axios.post(
    `${API_URL}/apply/upload`,
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    },
  );
  console.log(result);
  const response = await post(
    `/apply/cv`,
    {
      name: document.name,
      cvURL: result.data.data.url,
    },
  );
  console.log('kq upcv', response);
  if (response.data) {
    thunkAPI.dispatch(fetchCV());
    thunkAPI.dispatch(setpickerValue(response.data.id));
  }
  else thunkAPI.rejectWithValue(response);
})

export const applyCV = createAsyncThunk('apply/applyCV', async (jobId: string, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  const response = await post(
    `/apply/${jobId}`,
    {
      cvId: state.apply.pickerValue
    }
  );
  return response;
})

const applySlice = createSlice({
  name: 'apply',
  initialState: {
    pickerValue: '',
    pickItem: [],
    isFetchingCV: false,
    isUploadingCV: false,
    isApplyingCV: false,
    error: null as null | SerializedError
  },
  reducers: {
    hideError(state) {
      state.error = null
    },
    setpickerValue(state, action: PayloadAction<string>) {
      state.pickerValue = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCV.fulfilled, (state, { payload }) => {
      state.isFetchingCV = false;
      state.pickItem = payload;
    });
    builder.addCase(fetchCV.pending, (state) => {
      state.isFetchingCV = true;
    });
    builder.addCase(fetchCV.rejected, (state, action) => {
      state.isFetchingCV = false;
      state.error = action.error;
    });

    builder.addCase(uploadCV.fulfilled, (state) => {
      state.isUploadingCV = false;
    });
    builder.addCase(uploadCV.pending, (state) => {
      state.isUploadingCV = true;
    });
    builder.addCase(uploadCV.rejected, (state, action) => {
      state.isUploadingCV = false;
      state.error = action.error;
    });
    
    builder.addCase(applyCV.fulfilled, (state) => {
      state.isApplyingCV = false;
    });
    builder.addCase(applyCV.pending, (state) => {
      state.isApplyingCV = true;
    });
    builder.addCase(applyCV.rejected, (state, action) => {
      state.isApplyingCV = false;
      state.error = action.error;
    });
  }
});

export default applySlice.reducer;
export const { hideError, setpickerValue } = applySlice.actions;