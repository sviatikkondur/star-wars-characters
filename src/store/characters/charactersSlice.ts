import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StarWarsCharacter } from "../../types/TCharacter";

const CHARACTERS_API = 'https://swapi.dev/api/people';

export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page: number, thunkApi) => {
    try {
      const apiUrl = `${CHARACTERS_API}?page=${page}`;
      const response = await axios.get<StarWarsCharacter[]>(apiUrl);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

interface ProductsState {
  loading: boolean;
  error: null | string;
  products: null | StarWarsCharacter[];
}

const initialState = {
  loading: true,
  error: null,
  products: null,
} as ProductsState;

const charactersSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCharacters.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCharacters.fulfilled, (state, action: PayloadAction<StarWarsCharacter[]> ) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(getCharacters.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default charactersSlice.reducer;