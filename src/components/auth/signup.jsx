import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form,
        {
          withCredentials: true,
        }
      );
      if(res.status === 201){
        toast.success("User created successfully");
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[500px] min-h-[400px] shadow-2xl border-white/20 bg-white/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <Label>Name</Label>
              <Input name="name" onChange={handleChange} required />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" name="email" onChange={handleChange} required />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" name="password" onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full">
              Signup
            </Button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4 text-primary">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}