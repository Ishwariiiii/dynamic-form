"use client"
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface FormState {
    fields: any[];
    loading: boolean;
    responseMessage: string | null;
    isSuccess: boolean;
    isError: boolean;
    isErrorMessage: string | null;
}

const initialState: FormState = {
    fields: [],
    loading: false,
    responseMessage: null,
    isSuccess: false,
    isError: false,
    isErrorMessage: null,
};



const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(formData.pending, (state) => {
                state.loading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = null;
            })
            .addCase(formData.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.isError = false;
                state.fields = action.payload;
            })
            .addCase(formData.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isSuccess = false;
                state.isError = true;
                state.isErrorMessage = action.payload;
            });
    },
});

export default formSlice.reducer;


export const formData = createAsyncThunk(
    'FORMDATA',
    async () => {
        try {
            const response = await axios.get(
                'https://ulventech-react-exam.netlify.app/api/form'
            );
            console.log(response, 'FOrmmm data');
            return response.data.data;
        } catch (error: any) {
            console.error(error);
        }
    }
);
// export const newFormData=createAsyncThunk(
//     "NEWFORMDATA",
//     async()=>{
//         try{
//             const response=await axios.post("https://ulventech-react-exam.netlify.app/api/form");
//             console.log(response,"update data")
//             // return response.data.data
//         }catch(error:any){
//             console.log(error)
//         }
//     }

// );