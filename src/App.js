import React from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";

import "./styles.css";
import "./styles-custom.css";

const MyStyledInput = styled.input`
  padding: 0.5sem;
  border: 1px solid #eee;
  /* ... */
`;

const MyStyledTextArea = MyStyledInput.withComponent("textarea");

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const yupSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 chars or less")
    .required("First Name is Required"),
  lastName: Yup.string()
    .max(15, "Must be 15 chars or less")
    .required("Last name is Required."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Last name is Required.")
});

const SignUp = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={yupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" className="form-input" placeholder="Jane" />
        <ErrorMessage name="firstName" />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" />
        <br />
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="message">Message</label>
        <Field name="message" type="textarea" className="form-input" />
        <br />
        <label htmlFor="colors">Pick a color</label>
        <Field name="colors" as="select" className="my-select">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="white">White</option>
        </Field>
        <br />

        <label htmlFor="website">Website</label>
        <Field name="website" as={MyStyledInput} placeholder="google.com" />
        <br />

        <label htmlFor="moreText">more tex</label>
        <Field
          name="moreText"
          as={MyStyledTextArea}
          placeholder="post a message"
        />
        <br />

        <MyTextInput
          label="hobbies"
          name="hobbies"
          type="text"
          placeholder="more hobbies"
        />
        <br />

        <MyCheckbox name="accepted terms">
          I accept the terms and conditions
        </MyCheckbox>
        <br />

        <MySelect label="Job Type" name="jobType">
          <option value="">Select a Job type</option>
          <option value="designer">Designer</option>
          <option value="developer">Developer</option>
          <option value="product">Product Manager</option>
          <option value="others">Others</option>
        </MySelect>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

const App = () => {
  return (
    <div>
      <SignUp />
    </div>
  );
};
export default App;
