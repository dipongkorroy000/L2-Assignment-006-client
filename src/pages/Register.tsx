import image1 from "@/assets/images/image-1.jpg";
import {Link} from "react-router";
import Logo from "@/assets/icons/Logo";
import {RegisterForm} from "@/components/modules/authentication/RegisterForm";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 max-w-5xl mx-auto content-center items-center">
      <div className="relative hidden lg:block ">
        <img src={image1} alt="Image" className="dark:brightness-[0.8] rounded-2xl" />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Link to="/" className="mx-auto">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
