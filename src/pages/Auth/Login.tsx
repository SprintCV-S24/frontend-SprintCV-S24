import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import "../../App.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import LogoImage from "../../assets/sprintcv_logo.png";

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
    <>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          className="absolute right-4 top-4 md:right-8 md:top-8"
          variant="ghost"
        >
          <Link to="/register">Create Account</Link>
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-black" />
          <Link to="/login">
            <div className="relative z-20 flex items-center text-2xl font-large italic">
              <img
                src={LogoImage}
                alt="mylogo"
                className="mr-4 h-[35px] w-[50px]"
              ></img>
              SprintCV
            </div>
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Save hours crafting custom resumes&rdquo;
              </p>
              <footer className="text-sm">Noah Taylor</footer>
            </blockquote>
          </div>
          <BackgroundBeams />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <Card>
                <CardHeader>
                  <CardDescription>Enter email and password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="mt-2 mb-2"
                      type="email"
                      id="email"
                      placeholder="Enter Email"
                      {...register("email")}
                    />
                    {errors.email != null && (
                      <FormError>{errors.email.message}</FormError>
                    )}
                    {error && <FormError>{error}</FormError>}
                    <Label className="mt-4" htmlFor="password">
                      Password
                    </Label>
                    <Input
                      className="mt-2"
                      type="password"
                      id="password"
                      placeholder="Choose Password"
                      {...register("password")}
                    />
                    {errors.password != null && (
                      <FormError>{errors.password.message}</FormError>
                    )}
                    <Button
                      className="mt-4"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? "Submitting" : "Login"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
