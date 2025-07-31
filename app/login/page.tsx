import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "../utils/auth";
import { Label } from "@/components/ui/label";
import React from "react";
import SubmitButton from "../componets/SubmitButton";
import { toast } from "sonner";
export default function page() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-gray-100 to-white">
        <Card className="w-full max-w-md shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">
              Login via Magic Link
            </CardTitle>
            <CardDescription>
              Enter your email to receive a secure login link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                const res = await signIn("resend", formData);
                console.log(res);
              }}
              className="flex flex-col gap-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  id="email"
                  placeholder="xyz@xyz.com"
                />
              </div>

              <SubmitButton text="Submit" />
            </form>
          </CardContent>
        </Card>
      </div>
      ;
    </>
  );
}
