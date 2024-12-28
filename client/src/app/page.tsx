"use client";

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        localStorage.setItem('accessToken', token)
        window.location.href = "http://localhost:3000/main";
      }
    }, []);

  return (
    <div></div>
  )
}
