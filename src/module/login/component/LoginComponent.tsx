import { Button, Form as FromAntd } from "antd";
import { Field, Form } from "react-final-form";

import Input from "component/Input";
import React from "react";
import { RightSquareTwoTone } from "@ant-design/icons";

interface IProps {
  onSubmit: (value: { username: string; password: string }) => void;
  isLoading: boolean;
}

export default function LoginComponent(props: IProps) {
  const { onSubmit, isLoading } = props;

  // console.log("onSubmit", onSubmit);

  return (
    <div>
      <Form onSubmit={onSubmit}>
        {(propsForm) => {
          // console.log("propsForm", propsForm.handleSubmit);
          //   console.log(propsForm.active);
          return (
            <div>
              <FromAntd
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={propsForm.handleSubmit}
              >
                <Field
                  name="username"
                  component={Input}
                  label="Username"
                  placeholder="Input username here"
                />
                <Field
                  name="password"
                  component={Input}
                  label="Password"
                  placeholder="Your password here"
                  inputType="password"
                />
                <FromAntd.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    <RightSquareTwoTone />
                    Submit
                  </Button>
                </FromAntd.Item>
              </FromAntd>
            </div>
          );
        }}
      </Form>
    </div>
  );
}
