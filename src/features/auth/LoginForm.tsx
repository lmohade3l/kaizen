import TextField from "@/components/ui/TextField";

export default function LoginFrom(){
    return(
        <div className="w-full p-3">
            <TextField name="email" type="email" placeholder="name@example.com"/>
        </div>
    )
}