import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  modalOpen: boolean;
  disconnectedModalOpen: boolean;
  showTransaction: boolean;
  errMsg: string;
  tx: {
    hash: string;
    status: number;
  };
  approveTx: {
    hash: string;
    status: number;
  };
  destNetwork: boolean;
  destTx: {
    hash: string;
    status: number;
  };
}

export const initialState: initialStateInterface = {
  modalOpen: false,
  disconnectedModalOpen: false,
  showTransaction: false,
  errMsg: "",
  tx: {
    hash: "",
    status: 0,
  },
  approveTx: {
    hash: "",
    status: 0,
  },
  destNetwork: false,
  destTx: {
    hash: "",
    status: 0,
  },
};
const globals = createSlice({
  name: "globals",
  initialState,
  reducers: {
 
    setModalOpen(state, action) {
      state.modalOpen = action.payload;
    },
    setDisconnectedModalOpen(state, action) {
      state.disconnectedModalOpen = action.payload;
    },
    setShowTransaction: (state, action) => {
      state.showTransaction = action.payload;
    },
    setTx: (state, action) => {
      state.tx = action.payload;
    },
    setApproveTx: (state, action) => {
      state.approveTx = action.payload;
    },
    setDestNetwork: (state, action) => {
      state.destNetwork = action.payload;
    },
    setDestTx: (state, action) => {
      state.destTx = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errMsg = action.payload;
    },
  },
});

export default globals.reducer;
export const {
  setModalOpen,
  setDisconnectedModalOpen,
  setShowTransaction,
  setTx,
  setApproveTx,
  setDestNetwork,
  setDestTx,
  setErrorMsg,
} = globals.actions;
