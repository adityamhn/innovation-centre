"use client";

import React from "react";
import styles from "@/styles/pages/Login.module.scss";
import formStyles from "@/styles/components/Form.module.scss";
import { Form, Input, Row, message } from "antd";
import { emailRegex } from "@/services/constants";
import PrimaryButton from "@/components/common/PrimaryButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { userLoginRequest } from "@/services/auth.service";
import { loginUser } from "@/store/user.slice";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const dispatch = useDispatch();

  const userLoginMutation = useMutation(userLoginRequest, {
    onSuccess: (data) => {
      dispatch(loginUser(data.user));
      messageApi.success("Login successful! Redirecting...", 4, () => {
        router.push(`/dashboard`);
      });
    },
    onError: (error) => {
      messageApi.error(
        error?.response?.data?.message || "Something went wrong"
      );
    },
  });

  const handleLogin = async (values) => {
    await userLoginMutation.mutateAsync({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <>
      {contextHolder}
      <div className={styles.loginContainer}>
        <Form
          className={`${formStyles.formContainer} ${styles.authForm}`}
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            label="Email"
            className={`${formStyles.formItem}`}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                pattern: emailRegex,
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              className={`${formStyles.formInput}  ${styles.authEmailInput}`}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            className={`${formStyles.formItem}`}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Row align="middle">
              <Input.Password
                className={`${formStyles.formInput}  ${styles.authEmailInput}`}
                placeholder="Enter your password"
              />
              <PrimaryButton
                className={`${styles.loginButton}`}
                buttonType="text"
              >
                forgot password?
              </PrimaryButton>
            </Row>
          </Form.Item>

          <Row>
            <PrimaryButton
              className={`${formStyles.formButton} ${styles.loginButton}`}
              htmlType="submit"
              loading={userLoginMutation.isLoading}
            >
              Login
            </PrimaryButton>
            <Link href="/register">
              <PrimaryButton
                className={`${formStyles.formButton} ${styles.loginButton}`}
                buttonType="text"
              >
                create new account
              </PrimaryButton>
            </Link>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Login;
