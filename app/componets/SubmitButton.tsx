"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
useFormStatus;

interface iAppProps {
  text: string;
}
export default function SubmitButton({ text }: iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="animate-spin size-4 mr-2" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {" "}
          {text}
        </Button>
      )}
    </>
  );
}
