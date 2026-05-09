import { siteConfig } from "@/config/site";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export const metadata = {
  title: `Reset Password | ${siteConfig.name}`,
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-black w-dvw h-dvh flex flex-col items-center pt-20 gap-10">
      <h1 className="dark text-6xl uppercase font-bold text-ring">
        {siteConfig.logo}
        {siteConfig.name}
      </h1>
      <div className="w-[75dvw] max-w-sm h-fit">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
