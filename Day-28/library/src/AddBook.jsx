import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'app'
import {
  Button,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const AddBook = ({ open, handleClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      author: Yup.string().required('Author is required'),
      isbn: Yup.string().required('ISBN number is required'),
      publicationDate: Yup.date().required('Publication date is required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Book</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          fullWidth
          label="ISBN"
          name="isbn"
          value={formik.values.isbn}
          onChange={formik.handleChange}
          error={formik.touched.isbn && Boolean(formik.errors.isbn)}
          helperText={formik.touched.isbn && formik.errors.isbn}
        />
        <TextField
          fullWidth
          label="Publication Date"
          name="publicationDate"
          type="date"
          value={formik.values.publicationDate}
          onChange={formik.handleChange}
          error={formik.touched.publicationDate && Boolean(formik.errors.publicationDate)}
          helperText={formik.touched.publicationDate && formik.errors.publicationDate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={formik.handleSubmit} color="primary">
          Add Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBook;