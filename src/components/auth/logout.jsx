import { Button } from "@/components/ui/button"
import axios from "axios";

export default function Logout({ onLogout }) {
  return (
    <Button onClick={async()=>{
      try {
        await axios.post("http://localhost:5000/api/auth/logout", {},
          {
            withCredentials: true,
          }
        );
        onLogout();
      } catch (e) {
        console.error("Logout failed:", e);
      }
    }}>
      Logout
    </Button>
  )
}