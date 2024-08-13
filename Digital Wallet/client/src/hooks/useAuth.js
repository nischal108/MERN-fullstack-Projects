import { useState, useEffect, useMemo } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("token");

const useAuth = () => {
  const [user, setUser] = useState({ isAuthenticated: false, name: "", email: "" });
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchUser = async () => {


      if (!AuthToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/me/getcurrentuser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const { name, email } = data;

          setUser({ isAuthenticated: true, name, email });
        } else {
          console.log("Response not OK:", response.status);
          setUser({ isAuthenticated: false, name: "", email: "" });
        }
      } catch (error) {
        console.error("Error fetching user:", error); 
        setUser({ isAuthenticated: false, name: "", email: "" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [apiUrl, AuthToken]); 

  

  return useMemo(() => ({ user, loading }), [user, loading, AuthToken]);
};

export default useAuth;
