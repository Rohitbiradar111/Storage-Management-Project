"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OtpModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({ accountId, password });

    try {
      const sessionId = await verifySecret({ accountId, password });

      console.log({ sessionId });

      if (sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="space-y-4 md:max-w-[95%] w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10 bg-white outline-none">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="text-2xl font-bold text-center">
            Enter Your OTP
            <Image
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="absolute md:-right-1 md:-top-7 cursor-pointer -right-2 -top-4"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-medium text-center text-black">
            We&apos;ve sent a 6 digit code to
            <span className="pl-1">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="w-full flex md:gap-2 gap-1 justify-between">
            <InputOTPSlot
              index={0}
              className="text-[40px] font-medium rounded-xl justify-center flex border-2 border-blue-800 size-12 md:size-16 gap-5"
            />
            <InputOTPSlot
              index={1}
              className="text-[40px] font-medium rounded-xl justify-center flex border-2 border-blue-800 size-12 md:size-16 gap-5"
            />
            <InputOTPSlot
              index={2}
              className="text-[40px] font-medium rounded-xl justify-center flex border-2 border-blue-800 size-12 md:size-16 gap-5"
            />
            <InputOTPSlot
              index={3}
              className="text-[40px] font-medium rounded-xl justify-center flex border-2 border-blue-800 size-12 md:size-16 gap-5"
            />
            <InputOTPSlot
              index={4}
              className="text-[40px] font-medium rounded-xl justify-center flex border-2 border-blue-800 size-12 md:size-16 gap-5"
            />
            <InputOTPSlot
              index={5}
              className="text-[40px] font-medium rounded-xl justify-center flex border-2 border-blue-800 size-12 md:size-16 gap-5"
            />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="text-sm font-medium bg-blue-500 hover:bg-blue-600 md:text-base transition-all rounded-full h-12 text-white"
              type="button"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="text-sm font-medium mt-2 text-center text-black">
              Didn&apos;t get a code ?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-blue-500 hover:underline"
                onClick={handleResendOtp}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
