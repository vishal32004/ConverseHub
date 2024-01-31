"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    useForm,
    SubmitHandler,
    Controller,
    FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
    const router = useRouter();
    const containerStyle = {
        backgroundImage: "url('images/discordbg.png')",
    };
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            const response = await axios.post("/api/auth/login", data);
            reset();
            const {
                token,
                user: { id: userId },
            } = response.data;
            const authData = { token, userId };
            localStorage.setItem("authData", JSON.stringify(authData));
            router.push("/");
        } catch (error) {
            console.error("Error Log in user:", error);
        }
    };
    return (
        <>
            <div
                className="hidden bg-cover min-[484px]:flex justify-center items-center h-screen"
                style={containerStyle}
            >
                <div className="login bg-[#313338] h-[408px] min-[836px]:w-[790px] rounded-md flex justify-between shadow-md">
                    <div className="left flex flex-col  w-[30rem] text-[#b5bac1]  items-center p-8">
                        <div className="top space-y-1">
                            <h1 className="text-center font-semibold text-[1.4rem] text-[#ebebeb]">
                                Welcome back!
                            </h1>
                            <p className="text-s">Were so excited to see you again</p>
                        </div>

                        <div className="input w-full">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mail space-y-2 my-3">
                                    <label className="font-bold text-xs text-[11px]">
                                        EMAIL OR PHONE NUMBER *
                                    </label>
                                    <input
                                        className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                                        type="text"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {Array.isArray(errors.email.message)
                                                ? errors.email.message[0]
                                                : errors.email.message || "Validation error"}
                                        </p>
                                    )}
                                </div>
                                <div className="pass space-y-2 my-2">
                                    <label className="font-bold text-xs text-[11px]">
                                        PASSWORD *
                                    </label>
                                    <input
                                        className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                                        type="password"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {Array.isArray(errors.password.message)
                                                ? errors.password.message[0]
                                                : errors.password.message || "Validation error"}
                                        </p>
                                    )}
                                    <p className="text-[13px] text-[#0a90d3]">
                                        Forget your password?
                                    </p>
                                </div>
                                <button
                                    className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold"
                                    type="submit"
                                >
                                    Log in
                                </button>
                            </form>
                            <p className="text-[13px]">
                                Need an account?{" "}
                                <button
                                    className="text-[#0a90d3]"
                                    onClick={() => {
                                        router.push("/register");
                                    }}
                                >
                                    Register
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className="hidden right h-full w-[19rem] min-[836px]:flex justify-center items-center flex-col">
                        <img
                            className="h-[10.8rem] w-[10.8rem] rounded-[0.3rem] relative -top-4"
                            src="images/qr2.jpg"
                            alt=""
                        />
                        <div className="last text-center relative -bottom-2 space-y-2">
                            <h2 className="font-semibold text-[#ebebeb] text-[1.5rem]">
                                Log in with QR Code
                            </h2>
                            <p className="w-64 text-center text text-[#b5bac1] leading-tight">
                                Scan this with the{" "}
                                <span className="font-semibold">Discord mobile app</span> to log
                                in instantly
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden max-[484px]:flex justify-center bg-[#313338] h-[100vh]">
                <div className="left flex flex-col  w-[30rem] text-[#b5bac1]  items-center p-5">
                    <div className="top space-y-4 flex flex-col items-center">
                        <img className="h-6 w-32" src="images/logo.png" alt="" />
                        <h1 className="text-center font-bold text-[1.4rem] text-[#ebebeb]">
                            Welcome back!
                        </h1>
                    </div>
                    <div className="input w-full">
                        <div className="mail space-y-2 my-3">
                            <label className="font-bold text-xs text-[11px]">
                                EMAIL OR PHONE NUMBER *
                            </label>
                            <input
                                className="w-full h-10 rounded-sm bg-[#1e1f22]"
                                type="text"
                            />
                        </div>
                        <div className="pass space-y-2 my-2">
                            <label className="font-bold text-xs text-[11px]">
                                PASSWORD *
                            </label>
                            <input
                                className="w-full h-10 rounded-sm bg-[#1e1f22]"
                                type="text"
                            />
                            <p className="text-[13px] text-[#0a90d3]">
                                Forget your password?
                            </p>
                        </div>
                        <button className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold">
                            Log in
                        </button>
                        <p className="text-[13px]">
                            Need an account?{" "}
                            <button
                                className="text-[#0a90d3]"
                                type="button"
                                onClick={() => {
                                    router.push("/register");
                                }}
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
