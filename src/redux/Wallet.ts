import { createSlice } from "@reduxjs/toolkit";
import { ConnectOpts } from "net";

interface initialStateInterface {
  accountAddress?: string;
  provider?: any;
  signer?: any;
  networkId: number
}

export const initialState: initialStateInterface = {
  accountAddress: "",
  provider: null,
  signer: null,
  networkId: 0
};
const walletReducer = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAccountAddress: (state, action) => {
      state.accountAddress = action.payload;
    },
    setProvider: (state,action) => {
      state.provider = action.payload
    },
     setSigner: (state,action) => {
      state.signer = action.payload
    },
  },
});
export default walletReducer.reducer;
export const { setAccountAddress, setProvider, setSigner} = walletReducer.actions;
