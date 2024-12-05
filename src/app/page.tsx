"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { formData } from './redux/formSlice';
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material';

const UserListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { fields, loading, isError, isErrorMessage } = useSelector((state: RootState) => state.form);

  useEffect(() => {
    dispatch(formData());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>User List</h1>
      {loading ? (<p>Loading...</p>) : isError ? (<p>{isErrorMessage}</p>) : (<form>
        {fields?.map((field, index) => (
          <FormControl key={index} fullWidth margin="normal" error={!!field.error}>
            {/* <InputLabel htmlFor={field.fieldName}>First name</InputLabel> */}
            <TextField
              label={field.fieldName}
              type={field.type}
              value={field.value}
            />
            {field.error && <FormHelperText>{field.error}</FormHelperText>}
          </FormControl>
        ))}
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </form>
      )}
    </div>
  );
};

export default UserListPage;
