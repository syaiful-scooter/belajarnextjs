import { Col, Row } from "antd";
import Router, { useRouter } from "next/router";

import LoginComponent from "../component/LoginComponent";
import React from "react";
import { mutateLoginApi } from "service/auth.api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useStore from "store";

export default function LoginContainer() {
  const useStoreData = useStore();
  const router = useRouter();
  console.log(useStoreData);

  const LoginMutate = useMutation(mutateLoginApi, {
    onSuccess: (data) => {
      console.log("data", data);
      useStoreData.setToken(data.token);
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("nama atau pass salah ");
    },
  });

  const onSubmit = async (value: { username: string; password: string }) => {
    // console.log(value);
    LoginMutate.mutate(value);
  };

  return (
    <React.Fragment>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col span={12} style={{ marginTop: 40 }}>
          <LoginComponent
            onSubmit={onSubmit}
            isLoading={LoginMutate.isLoading}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
