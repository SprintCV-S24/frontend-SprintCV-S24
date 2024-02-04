import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "../../App.css"
import backgroundImage from '../../assets/login-background.jpeg';
 
interface FormValues {
  email: string;
  password: string;
}



const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      const alal = await login(values.email, values.password);
      console.log(alal);
      navigate("/"); // Redirect to home page
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-cover justify-center" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'grayscale(50%)' }}>
      <div className="p-6 rounded-md mb-32 mt-32 shadow-xl border border-black" style={{ backgroundColor: "#EFECEF" }}>
        <h1 className="mb-3 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email" id="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" {...register("email")} />
            {errors.email != null && (
              <FormError>{errors.email.message}</FormError>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="password" id="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" {...register("password")} />
            {errors.password != null && (
              <FormError>{errors.password.message}</FormError>
            )}
            {errors && <FormError>{error}</FormError>}
          </div>
          <Button variant="outline" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting" : "Login"}
          </Button>
        </form>
        <div>
          <Label htmlFor="register" id="register">Don't have an account?</Label>
          <Button variant="link">
            <Link to="/register">
              Register
            </Link>
          </Button>
        </div>
        <div>
          <Label htmlFor="register" id="register">Forgot your password?</Label>
          <Button variant="link" to="/forgot-password">
            <Link to="/forgot-password">
              Reset
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
