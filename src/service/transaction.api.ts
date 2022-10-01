import instance from "./interceptor";

export const fetchTransactionListAPI = async (params: any) => {
  const page = params.queryKey[0];

  const { data } = await instance.get(
    `/transaction?page=${page}&per_page=10&status=process`
  );
  return data;
};
