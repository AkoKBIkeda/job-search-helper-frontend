import React , { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const useRedirectAuthenticated = () => {
  const { isAuthenticated, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && ready) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, ready]);
};

export default useRedirectAuthenticated;
