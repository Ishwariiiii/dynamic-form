"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { formData, newFormData, updateFieldValue } from "./redux/formSlice";
import {Button,FormControl,InputLabel,MenuItem,Select,TextareaAutosize,TextField,Box} from "@mui/material";

const FormDataPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { fields, loading, isError, isErrorMessage, responseMessage } = useSelector(
    (state: RootState) => state.form
  );
  // console.log(fields, "all data");

  useEffect(() => {
    dispatch(formData());
  }, [dispatch]);

  const handleFieldChange = (index: number, value: string | number) => {
    dispatch(updateFieldValue({ index, value }));
  };

  const handleSubmit = () => {
    const updatedFields = [...fields];
    const newData: Record<string, any> = {};
    updatedFields.forEach((field: any) => {
      newData[field.fieldName] = field.value;
    });

    console.log("Submitting payload:", newData)

    dispatch(newFormData(newData));
  };

  return (
    <Box
      className="container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >

      <h1>Dynamic Form</h1>
      {loading ? (
        <p>Loading....</p>
      ) : isError ? (
        <p style={{ color: "red" }}>{isErrorMessage}</p>
      ) : (
        <Box
          className="form-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '600px',
            padding: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          {fields?.map((field: any, index: number) => {
            return (
              <div key={index} className="field-container">
                {field.type === "text" || field.type === "email" || field.type === "number" ? (
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label={field.fieldName}
                      type={field.type}
                      value={field.value}
                      onChange={(e) => handleFieldChange(index, e.target.value)}
                      required
                    />
                  </FormControl>
                ) : field.type === "select" ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{field.fieldName}</InputLabel>
                    <Select
                      value={field.value}
                      label={field.fieldName}
                      onChange={(e) => handleFieldChange(index, e.target.value)}
                      required
                    >
                      {field.options.map((item: any) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : field.type === "multiline" ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{field.fieldName}</InputLabel>
                    <TextareaAutosize
                      minRows={4}
                      defaultValue={field.value}
                      onChange={(e) => handleFieldChange(index, e.target.value)}
                      style={{ width: "100%", border: "1px solid gray" }}
                    />
                  </FormControl>
                ) : null}
              </div>
            );
          })}
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Box>
      )}
      {responseMessage && (
        <div>
          <p>{JSON.stringify(responseMessage)}</p>
        </div>
      )}
    </Box>
  );
};

export default FormDataPage;
