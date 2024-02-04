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
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const { forgotPassword, currentUser } = useAuth();
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

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      await forgotPassword(values.email);
      setMessage("Check your email for further instructions");
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-cover justify-center" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'grayscale(50%)' }}>
      <div className="p-6 rounded-md mb-32 mt-32 shadow-xl border border-black flex-col" style={{ backgroundColor: "#EFECEF" }}>
        <h1 className="mb-3 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter Email"{...register("email")} />
            {errors.email != null && (
              <FormError>{errors.email.message}</FormError>
            )}
          </div>
          {error && <FormError>{error}</FormError>}
          <Button className="mb-4" variant="outline" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting" : "Recover Password"}
          </Button>
          {message && <p>{message}</p>}
        </form>
        <Button className="mb-4" variant="outline">
          <Link to="/login">Back to login</Link>
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
