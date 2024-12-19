import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialDatabaseName = state?.databaseName || "";
  const [databaseName, setDatabaseName] = useState(initialDatabaseName);
  const [serverPort, setServerPort] = useState(8069);
  const [databases, setDatabases] = useState([]); // Daftar database
  const [selectedDatabase, setSelectedDatabase] = useState(databaseName);

  useEffect(() => {
    if (initialDatabaseName) {
      setDatabaseName(initialDatabaseName);
    }
  }, [initialDatabaseName]);

  const handleLogin = async (data) => {
    // const baseURL = "http://localhost:5000"; // URL server backend
    const baseURL = "https://db.airf.my.id"; // URL server backend
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.username,
        password: data.password,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      setLoginError(result.message || "Login failed");
      return;
    }

    navigate("/web");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-end mr-36 h-full items-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="imageLogin fixed top-0 left-0 w-1/2 h-[100vh]">
          <img
            src="images/LoginImage.png"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
        <Card className="w-[533px] px-38 bg-white dark:bg-gray-800 rounded-lg border border-white transition-all duration-300">
          <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700 mb-4">
            <img
              src="/images/resikel.png"
              alt="Resikel Logo"
              className="w-full h-auto max-h-16 object-contain mx-auto"
            />
            <h1>Selamat Datang!</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="username"
                    className="text-gray-700 dark:text-gray-300 text-left"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className={`border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500`}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-300 text-left"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full text-white transition duration-200"
                >
                  Login
                </Button>
              </div>
            </form>
            {loginError && (
              <p className="text-red-500 text-center mt-4">{loginError}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
