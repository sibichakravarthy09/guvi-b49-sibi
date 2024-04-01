import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function AddAuthor() {
  const initialValues = {
    name: '',
    birthDate: '',
    biography: ''
  };

  const onSubmit = (values, actions) => {
    // Handle form submission (e.g., send data to backend)
    console.log(values);
    actions.resetForm();
  };

  const validate = (values) => {
    const errors = {};
    // Add your validation logic here
    return errors;
  };

  return (
    <div>
      <h2>Add Author</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            {/* Other form fields */}
            <button type="submit" disabled={isSubmitting}>Add Author</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddAuthor;
