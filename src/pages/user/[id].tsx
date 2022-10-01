import React from "react";
import { useRouter } from "next/router";

export default function userdetail() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { id } = router.query;

  return <div>userdetail {id}</div>;
}
