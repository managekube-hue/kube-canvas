import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Documentation() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/uidr/docs", { replace: true });
  }, [navigate]);
  return null;
}
