import { siteConfig } from "@/config/site";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: `Login | ${siteConfig.name}`,
};

export default function LoginPage() {
  return (
    <div className="bg-black w-dvw h-dvh flex flex-col items-center pt-20 gap-10">
      <h1 className="dark text-6xl uppercase font-bold text-ring">
        {siteConfig.logo}
        {siteConfig.name}
      </h1>
      <div className="w-[75dvw] max-w-sm h-fit rounded-xl shadow-sm shadow-background/20">
        <LoginForm />
      </div>
    </div>
  );
}
