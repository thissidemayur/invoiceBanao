"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useActionState } from "react";
import SubmitButton from "../componets/SubmitButton";
import { onBoardUser } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchema";

export default function page() {
  // run server action from client side  track and update state on the basic of the lastresult(success or failure)
  const [lastResult, action] = useActionState(onBoardUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto">
        <CardTitle className="text-xl ">You are almost finish</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
        <CardContent>
          <form
            action={action}
            className="grid gap-4"
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-x-4">
              <div className=" flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  name={fields.firstName.name}
                  placeholder="mayur"
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.initialValue}
                />
                <p className="text-red-500 text-sm p-2">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  name={fields.lastName.name}
                  defaultValue={fields.lastName.initialValue}
                  key={fields.lastName.key}
                  placeholder="pal"
                />
                <p className="text-red-500 text-sm p-2">
                  {fields.lastName.errors}
                </p>
              </div>
            </div>
            <div>
              <div className=" flex flex-col gap-2">
                <Label>Address</Label>
                <Input
                  key={fields.address.key}
                  name={fields.address.name}
                  defaultValue={fields.address.initialValue}
                  placeholder="patli gali, purani delhi"
                />
                <p className="text-red-500 text-sm p-2">
                  {fields.address.errors}
                </p>
              </div>
            </div>
            <SubmitButton text="Finish onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
