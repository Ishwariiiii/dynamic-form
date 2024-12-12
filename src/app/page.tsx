"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { formData, newFormData } from "./redux/formSlice";
import {
  FormControl,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Box,
  Typography,
  FormLabel,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

const FormDataPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { fields, loading, responseMessage } = useSelector(
    (state: RootState) => state.form
  );

  const [inputData, setInputData] = useState<Record<string, string>>({});
  const [schema, setSchema] = useState<Record<string, any>>({});

  useEffect(() => {
    if (fields.length > 0) {
      const initialData: Record<string, string> = {};
      const initialSchema: Record<string, any> = {};

      fields.forEach((ele: any) => {
    
        initialData[ele.fieldName] = ele.value || ""; 
        if (ele.type === "text" || ele.type === "select" || ele.type === "multiline") {
          initialSchema[ele.fieldName] = Yup.string().trim().required(`${ele.fieldName} is required`);
        } else if (ele.type === "email") {
          initialSchema[ele.fieldName] = Yup.string().email().required(`${ele.fieldName} is required`);
        } else if (ele.type === "number") {
          initialSchema[ele.fieldName] = Yup.number().positive().required(`${ele.fieldName} is required`);
        }
      });

      setInputData(initialData);
      setSchema(initialSchema);
    }
  }, [fields]);

  useEffect(() => {
    dispatch(formData());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: inputData, 
    validationSchema: Yup.object(schema),
    onSubmit: (values) => {
      dispatch(newFormData(values));
    },
  });

  const renderInputField = (item: any) => {
    switch (item.type) {
      case "select":
        return (
          <>
            <FormControl fullWidth>
              <Select
                value={formik.values[item.fieldName] || ""}
                name={item.fieldName}
                onChange={formik.handleChange}
                sx={{ width: "100%" }}
              >
                {Array.isArray(item.options) && item.options.length > 0 ? (
                  item.options.map((option: string, idx: number) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">
                    <em>No options available</em>
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            {formik.touched[item.fieldName] && formik.errors[item.fieldName] && (
              <div style={{ color: "red" }}>{formik.errors[item.fieldName]}</div>
            )}
          </>
        );
      case "multiline":
        return (
          <>
            <TextareaAutosize
              value={formik.values[item.fieldName] || ""}
              name={item.fieldName}
              minRows={4}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontFamily: "Roboto, sans-serif",
              }}
              onChange={formik.handleChange}
            />
            {formik.touched[item.fieldName] && formik.errors[item.fieldName] && (
              <div style={{ color: "red" }}>{formik.errors[item.fieldName]}</div>
            )}
          </>
        );

      default:
        return (
          <>
            <TextField
              value={formik.values[item.fieldName] || ""}
              name={item.fieldName}
              type={item.type}
              onChange={formik.handleChange}
              fullWidth
            />
            {formik.touched[item.fieldName] && formik.errors[item.fieldName] && (
              <div style={{ color: "red" }}>{formik.errors[item.fieldName]}</div>
            )}
          </>
        );
    }
  };

  return (
    <>
      {loading ? (
        <div>LOADING...</div>
      ) : (
        <Box
          sx={{
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center" }}
          >
            Form
          </Typography>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {fields?.map((item: any, index: number) => (
              <Box key={index}>
                <FormLabel sx={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}>
                  {item.fieldName}
                </FormLabel>
                {renderInputField(item)}
              </Box>
            ))}
            <Button
              size="large"
              onClick={formik.handleSubmit}
              variant="contained"
              color="primary"
              sx={{
                marginTop: "20px",
                alignSelf: "center",
                padding: "10px 20px",
                borderRadius: "20px",
              }}
            >
              Submit Data
            </Button>
          </FormControl>
          <Box
            sx={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#e8f5e9",
              borderRadius: "8px",
              color: "#2e7d32",
              maxHeight: "200px",
              overflow: "auto",
              wordWrap: "break-word",
            }}
          >
            {responseMessage && (
              <div>
                <Typography sx={{ marginTop: "4vh" }}>
                  {JSON.stringify(responseMessage)}
                </Typography>
              </div>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default FormDataPage;