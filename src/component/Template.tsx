import { Breadcrumb, Layout, Menu } from "antd";
import { PieChartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";

import Link from "next/link";
import type { MenuProps } from "antd";
import store from "store";

interface IProps {
  children: React.ReactNode;
}

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/">Dahsboard</Link>, "Dahsboard", <PieChartOutlined />),
  getItem("Transaksi", "subMenuItem", <ShoppingCartOutlined />, [
    getItem(<Link href="transaction">List</Link>, "transactionList"),
  ]),
];

export default function Template(props: IProps) {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();
  const useStore = store();
  const { token } = useStore;

  console.log("useStore", useStore);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const { children } = props;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="logo"
          style={{ height: 32, margin: 16, backgroundColor: "grey" }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
