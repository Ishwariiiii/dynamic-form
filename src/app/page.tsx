// "use client"
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from './redux/store';
// import { formData } from './redux/formSlice';
// import { Button, FormControl, FormHelperText,  TextField } from '@mui/material';

// const UserListPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { fields, loading, isError, isErrorMessage } = useSelector((state: RootState) => state.form);

//   useEffect(() => {
//     dispatch(formData());
//   }, [dispatch]);

//   return (
//     <div className="container">
//       <h1>User List</h1>
//       {loading ? (<p>Loading...</p>) : isError ? (<p>{isErrorMessage}</p>) : (<form>
//         {fields?.map((field, index) => (
//           <FormControl key={index} fullWidth margin="normal" error={!!field.error}>
//             <TextField
//               label={field.fieldName}
//               type={field.type}
//               value={field.value}
//             />
//             {field.error && <FormHelperText>{field.error}</FormHelperText>}
//           </FormControl>
//         ))}
//         <Button type="submit" fullWidth variant="contained">
//           Submit
//         </Button>
//       </form>
//       )}
//     </div>
//   );
// };

// export default UserListPage;




"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { formData } from "./redux/formSlice";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";

const UserListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fields, loading, isError, isErrorMessage } = useSelector(
    (state: RootState) => state.form
  );

  // Local state to manage form data
  const [formValues, setFormValues] = useState({});
  const [submittedData, setSubmittedData] = useState();

  useEffect(() => {
    dispatch(formData());
  }, [dispatch]);

  // Initialize form values based on fetched fields
  useEffect(() => {
    if (fields) {
      const initialValues = fields.reduce((preValue, field) => ({ ...preValue, [field.fieldName]: field.value}),{}
      );
      setFormValues(initialValues);
    }
  }, [fields]);
  

  // Handle input change
  const handleInputChange = (fieldName: string, value: string) => {
    setFormValues({...formValues,[fieldName]:value})
  };

  // Handle form submission
  const saveFormData = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedData(formValues); // Set submitted data
  };

  return (
    <div className="container">
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{isErrorMessage}</p>
      ) : (
        <form onSubmit={saveFormData}>
          {fields?.map((field, index) => (
            <FormControl key={index} fullWidth margin="normal" error={!!field.error}>
              <TextField
                label={field.fieldName}
                type={field.type}
                value={field.value}
                onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
              />
              {field.error && <FormHelperText>{field.error}</FormHelperText>}
            </FormControl>
          ))}
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
          {submittedData && (
            <div className="submitted-data">
              <h2>Submitted Data</h2>
              <p>{JSON.stringify(submittedData)}</p>
            </div>
          )}

        </form>
      )}
    </div>
  );
};

export default UserListPage;

