"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmit = () => {
    authClient.signUp.email({
      name,
      email,
      password,
    }, {
      onError: (error) => {
        console.error("Error during sign up:", error);
      },
      onSuccess: () => {
        console.log("Sign up successful");
      },
    })
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
}
