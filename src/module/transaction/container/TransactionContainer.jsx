import React, { useState } from "react";

import Template from "component/Template";
import TransactionComponent from "../component/TransactionComponent";
import { fetchTransactionListAPI } from "service/transaction.api";
import { useQuery } from "@tanstack/react-query";

export default function TransactionContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: dataTransaction,
    isLoading: isLoadingTransaction,
    isRefetching: isRefetchingTransaction,
    fetchStatus: fetchStatusTransaction,
  } = useQuery([currentPage], fetchTransactionListAPI);
  //   console.log("dataTransaction", dataTransaction);
  //   const dataSource = [
  //     {
  //       key: "1",
  //       name: "Mike",
  //       age: 32,
  //       address: "10 Downing Street",
  //     },
  //     {
  //       key: "2",
  //       name: "John",
  //       age: 42,
  //       address: "10 Downing Street",
  //     },
  //   ];

  //   const columns = [
  //     {
  //       title: "Name",
  //       dataIndex: "name",
  //       key: "name",
  //     },
  //     {
  //       title: "Age",
  //       dataIndex: "age",
  //       key: "age",
  //     },
  //     {
  //       title: "Address",
  //       dataIndex: "address",
  //       key: "address",
  //     },
  //   ];

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoicenumber",
      key: "invoicenumber",
    },
    {
      title: "Merchcant",
      dataIndex: "merchant",
      key: "merchant",
    },
    {
      title: "Custommer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactiondate",
      key: "transactiondate",
    },
  ];

  return (
    <Template>
      {/* <TransactionComponent dataTransaction={dataSource} column={columns} /> */}
      <TransactionComponent
        dataTransaction={dataTransaction?.data || []}
        column={columns}
        totalPage={dataTransaction?.total || 0}
        setCurrentPage={setCurrentPage}
        isLoadingTransaction={
          fetchStatusTransaction !== "idle" &&
          (isLoadingTransaction || isRefetchingTransaction)
        }
      />
    </Template>
  );
}
