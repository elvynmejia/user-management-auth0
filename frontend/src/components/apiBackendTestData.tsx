import useTestProtectedApi from '../hooks/useTestProtectedApi';

const ApiBackendTestData = (props: any) => {
  const { userId } = props;

  const { isLoading, apiData, serverError } = useTestProtectedApi(userId);
  console.log({ apiData });

  if (isLoading) {
    return <div>loading ...</div>
  }

  if (serverError) {
    return <div>Try realoding the page.</div>
  }

  return (
    <div className="App">
      <p>API backend Ok</p>
      <pre>{JSON.stringify(apiData)}</pre>
    </div>
  )
}

export default ApiBackendTestData;
