const apiUrl = import.meta.env.VITE_API_URL;

const useLogin = async ({ email, password }) => {
  try {
    const response = await fetch(`${apiUrl}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });


    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error; 
  }
};

export default useLogin;
