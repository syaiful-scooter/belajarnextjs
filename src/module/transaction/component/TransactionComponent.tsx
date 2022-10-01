import React from "react";
import { Table } from "antd";

interface IProps {
  dataTransaction: any[];
  column: any[];
  totalPage: number;
  currentPage: number;
  setCurrentPage: any;
  isLoadingTransaction: boolean;
}

export default function TransactionComponent({
  dataTransaction,
  column,
  totalPage,
  currentPage,
  setCurrentPage,
  isLoadingTransaction,
}: IProps) {
  return (
    <div>
      <Table
        loading={isLoadingTransaction}
        dataSource={dataTransaction}
        columns={column}
        pagination={{
          total: totalPage,
          current: currentPage,
          onChange: setCurrentPage,
        }}
      />
    </div>
  );
}
