import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const AddAuthor = ({ open, handleClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      birthDate: '',
      biography: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      birthDate: Yup.date().required('Birth date is required'),
      biography: Yup.string().required('Biography is required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Author</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          label="Birth Date"
          name="birthDate"
          type="date"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
          helperText={formik.touched.birthDate && formik.errors.birthDate}
        />
        <TextField
          fullWidth
          label="Biography"
          name="biography"
          multiline
          rows={4}
          value={formik.values.biography}
          onChange={formik.handleChange}
          error={formik.touched.biography && Boolean(formik.errors.biography)}
          helperText={formik.touched.biography && formik.errors.biography}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={formik.handleSubmit} color="primary">
          Add Author
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAuthor;