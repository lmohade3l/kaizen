import CheckList from "@/assets/icons/checklist.svg";
import LoginFrom from "@/features/auth/LoginForm";
import Image from "next/image";

export default function Login() {
    console.log("login form")
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-white flex flex-col items-center w-1/4 mx-auto border-2 border-gray-300 rounded-lg">
        <div className="flex flex-col items-center">
          <Image src={CheckList} width={40} height={40} alt="" />
          <p>KAIZEN</p>
        </div>
        <LoginFrom />
      </div>
    </div>
  );
}
