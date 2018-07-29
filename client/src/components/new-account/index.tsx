import React from "react";
import { Formik, FormikProps } from "formik";
import styled from "styled-components";
import { ModalContent } from "../modal";
import { ModalHeader } from "../ui/text";
import FormInput from "../ui/form-input";
import { ModalButtonContainer } from "../ui/button-container";
import Button from "../ui/framed-button";
import * as yup from "yup";
import { Colors } from "../../util/constants";

export interface INewAccount {
  emailAddress: string;
  password: string;
}

interface INewAccountFormValues extends INewAccount {
  confirmPassword: string;
}

interface IProps {
  onCreateAccount(account: INewAccount): Promise<string>;
  onDismiss(): void;
}

const NewAccountModalContent = styled(ModalContent)`
  width: 400px;
`;

const Form = styled.form`
  padding: 0 1em;
`;

const Error = styled.div`
  color: ${Colors.Forms.ErrorText};
  font-size: 12px;
  font-weight: 500;
  margin: 0 2px 5px;
`;

const validationSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email("A valid email address is required.")
    .required("A valid email address is required."),
  password: yup.string().required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required("Password confirmation is required."),
});

const NewAccountForm: React.StatelessComponent<IProps> = props => (
  <Formik
    initialValues={{
      emailAddress: "",
      password: "",
      confirmPassword: "",
    }}
    isInitialValid={false}
    onSubmit={(
      values: INewAccountFormValues,
      formikProps: FormikProps<INewAccountFormValues>
    ) =>
      props
        .onCreateAccount({
          emailAddress: values.emailAddress,
          password: values.password,
        })
        .then(error => {
          if (error) {
            formikProps.setErrors({ emailAddress: error });
            return;
          }
          formikProps.setSubmitting(false);
          props.onDismiss();
        })
    }
    validationSchema={validationSchema}
    render={({
      handleSubmit,
      handleChange,
      errors,
      values,
      isSubmitting,
    }: FormikProps<INewAccountFormValues>) => (
      <NewAccountModalContent>
        <ModalHeader>Create a new account</ModalHeader>
        <Form onSubmit={handleSubmit}>
          {errors.emailAddress && <Error>{errors.emailAddress}</Error>}
          <FormInput
            placeholder="Email Address"
            type="email"
            name="emailAddress"
            autoComplete="email"
            onChange={handleChange}
            marginBottom="1em"
            value={values.emailAddress}
          />
          {errors.password && <Error>{errors.password}</Error>}

          <FormInput
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            marginBottom="1em"
            value={values.password}
          />
          {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}

          <FormInput
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            marginBottom="1em"
            value={values.confirmPassword}
          />
          <ModalButtonContainer>
            <Button type="submit" marginRight disabled={isSubmitting}>
              Create Account
            </Button>
            <Button type="button" onClick={props.onDismiss}>
              Close
            </Button>
          </ModalButtonContainer>
        </Form>
      </NewAccountModalContent>
    )}
  />
);

export default NewAccountForm;