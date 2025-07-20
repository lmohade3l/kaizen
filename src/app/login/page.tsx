import LoginBanner from "@/assets/icons/login-banner.svg";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white grid md:grid-cols-2 h-[80vh] mx-auto border-2 border-gray-300 rounded-lg">
        <div>bye</div>
        <div>
            <Image src={LoginBanner} width={400} height={200} alt=""/>
        </div>
      </div>
    </div>
  );
}
