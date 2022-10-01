import React from "react";
import TestComponent from "component/TestComponent";

export default function Belajar() {
  const listData = [
    { id: 1, name: "Alvin" },
    { id: 2, name: "Johanes" },
  ];

  return (
    <div>
      <TestComponent
        nama="Alvin"
        subject="Belajar ReactJS"
        urutan={10}
        listData={listData}
        mode="register"
      />
    </div>
  );
}
