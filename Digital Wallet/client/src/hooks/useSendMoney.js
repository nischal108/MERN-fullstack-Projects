const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem('token');

const useSendMoney = async (user, value) => {
  const response = await fetch(`${apiUrl}/account/send`, {
    method: "POST",
    body: JSON.stringify({
      toAccountId: user._id,
      amount: value,
    }),
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${AuthToken}`,
    },
  });

  const confirmation = await response.json();
  return confirmation; 
};

export default useSendMoney;
