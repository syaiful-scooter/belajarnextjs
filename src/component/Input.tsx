import { Form, Input as InputAntd } from "antd";

import React from "react";

interface IProps {
  label?: string;
  placeholder?: string;
  input?: any;
  inputType?: "input" | "textarea" | "password";
}

export default function Input(props: IProps) {
  const { label, placeholder, inputType, input } = props;
  return (
    <Form.Item label={label}>
      {inputType === "textarea" ? (
        <InputAntd.TextArea placeholder={placeholder} {...input} />
      ) : inputType === "password" ? (
        <InputAntd.Password placeholder={placeholder} {...input} />
      ) : (
        <InputAntd placeholder={placeholder} {...input} />
      )}
    </Form.Item>
  );
}
