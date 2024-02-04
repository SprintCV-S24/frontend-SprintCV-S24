import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";
import backgroundImage from '../../assets/login-background.jpeg';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const Register: React.FC = () => {
  const { registerUser, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("");

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      await registerUser(values.name, values.email, values.password);
      navigate("/"); // Redirect to home page
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-cover justify-center" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'grayscale(50%)' }}>
      <div className="p-6 rounded-md mb-12 mt-16 shadow-xl border border-black flex-col" style={{ backgroundColor: "#EFECEF" }}>
      <h1 className="mb-3 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name" id="name">Name</Label>
          <Input type="text" id="name" placeholder="Enter Name" {...register("name")} />
          {errors.name != null && <FormError>{errors.name.message}</FormError>}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="email" id="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter Email" {...register("email")} />
          {errors.email != null && (
            <FormError>{errors.email.message}</FormError>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Choose Password" {...register("password")} />
          {errors.password != null && (
            <FormError>{errors.password.message}</FormError>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword != null && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}
        </div>
        {error && <FormError>{error}</FormError>}
        <Button variant="outline" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting" : "Register"}
        </Button>
      </form>
      <div>
        <Label htmlFor="haveAccount">Already have an account?</Label>
        <Button variant="link">
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Register;
