"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface FormState {
    fields: any;
    loading: boolean;
    responseMessage: string | null;
    isSuccess: boolean;
    isError: boolean;
    isErrorMessage: any
    isDataLoading: boolean
}

const initialState: FormState = {
    fields: [],
    loading: false,
    responseMessage: null,
    isSuccess: false,
    isError: false,
    isErrorMessage: null,
    isDataLoading: false
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {

        updateFieldValue(state, action) {
            const { index, value } = action.payload;
            state.fields[index].value = value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(formData.pending, (state) => {
                state.loading = true;
                state.isError = false;
                state.isErrorMessage = null;
            })
            .addCase(formData.fulfilled, (state, action) => {
                state.loading = false;
                state.fields = action.payload;
            })
            .addCase(formData.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.isErrorMessage = action.payload;
            })

            .addCase(newFormData.pending, (state) => {
                state.isDataLoading = true;
                state.isError = false;
                state.isErrorMessage = null;
            })
            .addCase(newFormData.fulfilled, (state, action) => {
                state.isDataLoading = false;
                state.responseMessage = action.payload;
            })
            .addCase(newFormData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.isError = true;
                state.isErrorMessage = action.payload;
            });
    },
});


export const formData = createAsyncThunk(
    "FORMDATA",
    async () => {
        try {
            const response = await axios.get("https://ulventech-react-exam.netlify.app/api/form");
            return response.data.data;
        } catch (error: any) {
            console.log(error)
        }
    });

export const newFormData = createAsyncThunk(
    "NEWFORMDATA",
    async (newData: any) => {
        try {
            const response = await axios.post("https://ulventech-react-exam.netlify.app/api/form", newData);
            return response.data;
        } catch (error: any) {
            console.log("Error submitting form:", error.response?.data);
            return
        }
    }
);


export const { updateFieldValue } = formSlice.actions;
export default formSlice.reducer;
