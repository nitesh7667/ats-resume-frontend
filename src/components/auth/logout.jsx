import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export default function Logout({ onLogout }) {
  return (
    <Button
      onClick={async () => {
        try {
          await axios.post(
            `${BACKEND_URL}/api/auth/logout`,
            {},
            {
              withCredentials: true,
              headers: { 
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            },
          );
          onLogout();
        } catch (e) {
          console.error("Logout failed:", e);
        }
      }}
    >
      Logout
    </Button>
  );
}
