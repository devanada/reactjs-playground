import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Input } from "@/components/input";
import Layout from "@/components/layout";
import Button from "@/components/button";
import { userRegister, registerSchema, RegisterType } from "@/utils/apis/auth/";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data) {
    try {
      const result = await userRegister(data);
      toast.success(result.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout>
      <form aria-label="form-register" onSubmit={handleSubmit(handleRegister)}>
        <Input
          id="input-username"
          aria-label="input-username"
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
        />
        <Input
          id="input-password"
          aria-label="input-password"
          label="Password"
          name="password"
          register={register}
          error={errors.password?.message}
          type="password"
        />
        <Input
          id="input-repassword"
          aria-label="input-repassword"
          label="Retype Password"
          name="repassword"
          register={register}
          error={errors.repassword?.message}
          type="password"
        />
        <Button
          aria-label="btn-submit"
          label="Submit"
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        />
      </form>
    </Layout>
  );
}
