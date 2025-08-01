import CheckList from "@/assets/icons/checklist.svg";
import TextField from "@/components/ui/TextField";
import LoginFrom from "@/features/auth/LoginForm";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/Google-alt.svg"

export default function Login() {
  console.log("login form");
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-white flex flex-col items-center w-1/4 mx-auto border-1 border-gray-300 rounded-lg">
        {/* <div className="flex flex-col items-center">
          <Image src={CheckList} width={40} height={40} alt="" />
          <p>KAIZEN</p>
        </div> */}

        <div className="flex flex-col gap-3 w-full items-center p-4">
          <p className="text-[24px] font-[500]">Create an account</p>
          <div className="flex flex-col w-full gap-1">
            <p className="text-[14px] font-[400] pl-2">Email</p>
            <TextField placeholder="name@example.com" />
          </div>
          <div className="flex flex-col w-full gap-1">
            <p className="text-[14px] font-[400] pl-2">Password</p>
            <TextField placeholder="password" />
          </div>
          <div className="flex flex-col w-full gap-1">
            <p className="text-[14px] font-[400] pl-2">Confirm Password</p>
            <TextField placeholder="confirm password" />
          </div>

          <button className="text-[14px] bg-lime-600 w-full rounded-lg p-2 text-white hover:bg-lime-500 mt-2">
            Signup With Email
          </button>

          <div className="flex w-full items-center">
            <div className="border-t-1 border-gray-300 flex-1"></div>
            <p className="text-[12px] text-gray-400">
            Or Continue With

            </p>
            <div className="border-t-1 border-gray-300 flex-1"></div>{" "}
          </div>

          <button className="flex w-full gap-2 justify-center p-2 rounded-lg border-1 border-gray-300 text-[14px]">
            <Image src={GoogleIcon} alt="" width={20} height={20}/>
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
