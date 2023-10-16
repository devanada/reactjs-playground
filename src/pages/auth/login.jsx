import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Input } from "@/components/input";
import Layout from "@/components/layout";
import Button from "@/components/button";
import { useToken } from "@/utils/contexts/token";
import { userLogin, loginSchema } from "@/utils/apis/auth/";

export default function Login() {
  const { changeToken } = useToken();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data) {
    try {
      const result = await userLogin(data);
      toast.success("Successfully login");
      changeToken(JSON.stringify(result.payload));
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout>
      <form aria-label="form-login" onSubmit={handleSubmit(handleLogin)}>
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
