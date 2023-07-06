export const useAdmin = () => {
  const accessToken = useCookie<string>("accessToken");

  const makeFetchersForIndexCard = <T>(
    pathFrontend: string,
    pathServer?: string
  ) => {
    pathFrontend = pathFrontend.toLowerCase();

    if (pathServer) {
      pathServer = pathServer.toLowerCase();
    } else {
      pathServer = pathFrontend;
    }

    const { fetchGet, fetchDelete } = useApi();
    const { refresh, data: entities } = useAsyncData<T[]>(
      pathFrontend,
      async () => await fetchGet(`/${pathServer}`)
    );

    const handleCreate = async () => {
      await navigateTo(`/admin/${pathFrontend}/create`);
    };

    const handleEdit = async (id: string) => {
      await navigateTo(`/admin/${pathFrontend}/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
      try {
        await fetchDelete(`/${pathServer}/${id}`);
        await refresh();
      } catch (exc) {
        console.error(exc);
      }
    };

    return {
      handleCreate,
      handleEdit,
      handleDelete,
      data: {
        refresh,
        entities,
      },
    };
  };

  return {
    accessToken,
    makeFetchersForIndexCard,
  };
};
