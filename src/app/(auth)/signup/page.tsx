import { siteConfig } from "@/config/site";
import { SignUpForm } from "@/features/auth/components/signup-form";

export const metadata = {
  title: `Sign Up | ${siteConfig.name}`,
};

export default function SignupPage() {
  return (
    <div className="bg-black w-dvw h-dvh flex flex-col items-center pt-20 gap-10">
      <h1 className="dark text-6xl uppercase font-bold text-ring">
        {siteConfig.logo}
        {siteConfig.name}
      </h1>
      <div className="w-[75dvw] max-w-sm h-fit rounded-xl shadow-sm shadow-background/20">
        <SignUpForm />
      </div>
    </div>
  );
}
