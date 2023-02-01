import useGetUserDetails from "../hooks/useGetUserDetails";

const UserProfile = (props: any) => {
  const { userId } = props;
  const {isLoading, apiData, serverError } = useGetUserDetails(userId);

  if (isLoading) {
    return <div>loading ...</div>
  }

  if (serverError) {
    return <div>Try realoding the page.</div>
  }

  return (
    <div className="App">
      <p>id: {userId}</p>
      <h2>{apiData?.name}</h2>
      <img src={apiData?.picture} alt={apiData?.name} />
      <p>{apiData?.email}</p>
    </div>
  )
}

export default UserProfile;
