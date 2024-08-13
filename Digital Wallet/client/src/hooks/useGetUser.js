const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem('token');

const useGetUser = async (searchedText) => {
    const response = await fetch(`${apiUrl}/profile/bulk?filter=${searchedText}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
    });
    const data = await response.json();
    console.log(data.users);
    
    return data.users;
  };
  
  export default useGetUser;
  