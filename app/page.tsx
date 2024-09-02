import AuthLogin from "@/components/auth/auth-login";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Home() {
  return (
    <main
      className="flex h-full flex-col items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
     from-sky-400 to-blue-800"
    >
      <div className="space-x-6 mb-5 flex flex-col items-center justify-center ">
        <p className="font-semibold text-6xl drop-shadow-md text-slate-200 ">
          Authentication
        </p>
        <p className="text-xl  text-slate-200 mt-5 ">
          this is test authentication service for just Demo
        </p>
      </div>
      <AuthLogin mode="redirect">
        <Button size="lg" variant="default">
          Login
        </Button>
      </AuthLogin>
    </main>
  );
}
export default Home;
