import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SetMasterPasswordPopup from "./SetMasterPasswordPopup";
import { useNavigate } from "react-router-dom";

const CreateDatabasePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverPort, setServerPort] = useState(8069); // Default port
  const navigate = useNavigate();

  const handleCreateDatabase = async (data) => {
    console.log("Database creation data:", data);
    try {
      const baseURL = `${window.location.protocol}//${window.location.hostname}:${serverPort}`;
      const response = await fetch(`${baseURL}/create-database`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error creating database");
      navigate("/login", { state: { databaseName: data.databaseName } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Card className="w-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300">
        <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700 mb-4">
          <CardTitle>Create Database</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleCreateDatabase)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="masterPassword"
                  className="text-gray-700 dark:text-gray-300 text-left"
                >
                  Master Password
                </Label>
                <Input
                  id="masterPassword"
                  type="password"
                  placeholder="Enter master password"
                  {...register("masterPassword", {
                    required: "Master password is required",
                  })}
                  className={`border ${
                    errors.masterPassword ? "border-red-500" : "border-gray-300"
                  } dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500`}
                />
                {errors.masterPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.masterPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="databaseName"
                  className="text-gray-700 dark:text-gray-300 text-left"
                >
                  Database Name
                </Label>
                <Input
                  id="databaseName"
                  type="text"
                  placeholder="Enter database name"
                  {...register("databaseName", {
                    required: "Database name is required",
                  })}
                  className={`border ${
                    errors.databaseName ? "border-red-500" : "border-gray-300"
                  } dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500`}
                />
                {errors.databaseName && (
                  <p className="text-red-500 text-sm">
                    {errors.databaseName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300 text-left"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: "Email is required" })}
                  className={`border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                  placeholder="Enter password"
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
            <div className="mt-6 flex justify-between">
              <Button type="submit" className="text-white">
                Create Database
              </Button>
              <Button
                onClick={() => setIsPopupOpen(true)}
                className="text-white"
              >
                Set Master Password
              </Button>
            </div>
            <SetMasterPasswordPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDatabasePage;
