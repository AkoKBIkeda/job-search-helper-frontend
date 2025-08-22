// Retrieve and store token
// Fetch user data
// Login & Logout

import React, { useState, useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "../constants";

interface User {
  id: string;
  username: string;
  is_admin: boolean;
}

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchUser(storedToken);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(BASE_URL + "/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("User data fetched:", response.data);
      if (response.status === 200) {
        const userData: User = await response.data;
        setUser(userData);
        console.log("User data set:", userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    }
  };

  const login = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem("token", newToken);
    fetchUser(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  };
}
