"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Suspense, useActionState, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./SubmitButton";
import { createInvoice } from "../action";
import { getInputProps, getTextareaProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchema";
import { formatedDate, formatedCurrency } from "../utils/internationalAPI";
import { SkeletonCard } from "./Skelton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateInvoice() {
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(new Date());

  const [lastResult, action] = useActionState(createInvoice, undefined);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      lastResult;
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("INR");

  const calculateTotal = (Number(rate) || 0) * (Number(quantity) || 0);

  useEffect(() => {
    if (!lastResult?.status) return;

    if ("message" in lastResult) {
      if (lastResult.status === "success") {
        toast.success(lastResult.message);
        router.push("/dashboard");
      } else if (lastResult.status === "email_failed") {
        toast.warning(lastResult.message);
      } else {
        toast.error(lastResult.message || "Something went wrong.");
      }
    }
  }, [lastResult]);

  return (
    <Suspense fallback={<SkeletonCard />}>
      <Card>
        <CardContent className="p-6">
          <form
            id={form.id}
            action={action}
            onSubmit={form.onSubmit}
            noValidate
          >
            {/* sync callender for  */}
            <Input
              className="hidden"
              readOnly
              name={fields.date.name}
              key={fields.date.key}
              value={formatedDate(date ?? new Date())}
            />

            {/* total */}
            <Input
              readOnly
              className="hidden"
              name={fields.total.name}
              key={fields.total.key}
              value={calculateTotal}
            />
            <div className="flex flex-col gap-y-7 px-4">
              {/* draft header content */}
              <div className="flex flex-col gap-2 w-fit mb-6">
                <div className="flex gap-x-4">
                  <Badge variant="outline" className="">
                    Draft
                  </Badge>
                  <div className="flex flex-col">
                    <Input
                      placeholder="Test 123 "
                      className="w-fit"
                      {...getInputProps(fields.invoiceName, {
                        type: "text",
                      })}
                    />
                    <p className="text-red-500 text-sm">
                      {" "}
                      {fields.invoiceName.errors}
                    </p>
                  </div>
                </div>
              </div>

              {/* invoice number and currency */}
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <Label>Invoice No</Label>
                  <div className="flex ">
                    <Badge
                      variant="outline"
                      className="bg-muted rounded-r-none"
                    >
                      #
                    </Badge>
                    <Input
                      placeholder="5"
                      className="border-l-0 rounded-l-none "
                      {...getInputProps(fields.invoiceNumber, {
                        type: "number",
                      })}
                    />
                  </div>
                  <p className="text-red-500 text-sm">
                    {fields.invoiceNumber.errors}
                  </p>
                </div>
                <div className="fle flex-col gap-2">
                  <Label>Currency</Label>
                  <div className="flex flex-col ">
                    <Select
                      name={fields.currency.name}
                      key={fields.currency.key}
                      defaultValue={fields.currency.initialValue}
                      value={currency}
                      onValueChange={(value) => setCurrency(value)}
                    >
                      <SelectTrigger className="w-full" value="Indian Ruppee">
                        <SelectValue placeholder="Choose currency" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectItem value="INR">
                            Indian Ruppee --INR{" "}
                          </SelectItem>
                          <SelectItem value="USD">
                            American Dollar --USD{" "}
                          </SelectItem>
                          {/* <SelectItem value="EUR">Euro - EUR</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <p className="text-red-500 text-sm">
                      {fields.currency.errors}
                    </p>
                  </div>
                </div>
              </div>

              {/* sender and receiver detail */}
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <Label className="text-base">From</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-y-5">
                      <Input
                        placeholder="Your Name"
                        {...getInputProps(fields.fromName, {
                          type: "text",
                        })}
                      />
                      <p className="text-red-500 text-sm">
                        {fields.fromName.errors}
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-5">
                      <Input
                        placeholder="Your Email"
                        {...getInputProps(fields.fromEmail, {
                          type: "text",
                        })}
                      />
                      <p className="text-red-500 text-sm">
                        {fields.fromEmail.errors}
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-5">
                      <Input
                        placeholder="Your Address"
                        {...getInputProps(fields.fromAddress, {
                          type: "text",
                        })}
                      />
                      <p className="text-red-500 text-sm">
                        {fields.fromAddress.errors}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-base">To</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-y-5">
                      <Input
                        placeholder="Your Name"
                        {...getInputProps(fields.clientName, {
                          type: "text",
                        })}
                      />
                      <p className="text-red-500 text-sm">
                        {fields.clientName.errors}
                      </p>
                    </div>
                    <div
                      className="flex flex-col 
gap-y-5"
                    >
                      <Input
                        placeholder="Your Email"
                        {...getInputProps(fields.clientEmail, {
                          type: "text",
                        })}
                      />
                      <p className="text-red-500 text-sm">
                        {fields.clientEmail.errors}
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-5">
                      <Input
                        placeholder="Your Address"
                        {...getInputProps(fields.clientAddress, {
                          type: "text",
                        })}
                      />
                      <p className="text-red-500 text-sm">
                        {fields.clientAddress.errors}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calender(date) and Invoice due */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-5">
                  <Label className="px-1" htmlFor="date">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger className="flex gap-x-2" asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-[280px] justify-start text-left font-normal"
                      >
                        {date ? formatedDate(date) : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Calendar
                        selected={date}
                        onSelect={(date) => setDate(date)}
                        mode="single"
                        className="rounded-lg border w-full"
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-red-500 text-sm">{fields.date.errors}</p>
                </div>

                <div className="flex flex-col">
                  <Label>Invoice Due</Label>
                  <Select
                    name={fields.dueDate.name}
                    defaultValue={fields.dueDate.initialValue}
                    key={fields.dueDate.key}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select due date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Due on Reciept</SelectItem>
                      <SelectItem value="15">Net 15</SelectItem>
                      <SelectItem value="30">Net 30</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-red-500 text-sm">
                    {fields.dueDate.errors}
                  </p>
                </div>
              </div>

              {/* Description- , quantity,  Amount,TotalAMount*/}
              <div>
                <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                  <p className="col-span-6">Description</p>
                  <p className="col-span-2">Quantity</p>
                  <p className="col-span-2"> Rate</p>
                  <p className="col-span-2">Amount</p>
                </div>

                <div className="grid grid-cols-12 gap-4 mb-2 ">
                  <div className="col-span-6">
                    <Textarea
                      className="col-span-6"
                      placeholder="Item name and description"
                      {...getTextareaProps(fields.invoiceItemDescription)}
                    ></Textarea>
                    <p className="text-red-500 text-sm">
                      {fields.invoiceItemDescription.errors}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="0"
                      {...getInputProps(fields.invoiceItemQuantity, {
                        type: "number",
                      })}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                    />
                    <p className="text-red-500 text-sm">
                      {fields.invoiceItemQuantity.errors}
                    </p>
                  </div>{" "}
                  <div className="col-span-2">
                    <Input
                      {...getInputProps(fields.invoiceItemRate, {
                        type: "number",
                      })}
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      type="number"
                      placeholder="0"
                    />
                    <p className="text-red-500 text-sm">
                      {fields.invoiceItemRate.errors}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Input
                      disabled
                      type="number"
                      placeholder="0"
                      value={calculateTotal}
                    />
                  </div>{" "}
                </div>
              </div>

              {/* subtotal amount */}
              <div className="flex justify-end">
                <div className="w-1/3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {formatedCurrency({
                        amount: calculateTotal,
                        currency: currency as any,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total({currency})</span>
                    <span className="font-medium underline underline-offset-2">
                      {formatedCurrency({
                        amount: calculateTotal,
                        currency: currency as any,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="flex flex-col gap-2">
                <Label>Note</Label>
                <Textarea
                  {...getTextareaProps(fields.note)}
                  placeholder="Add your Note/s right here"
                ></Textarea>
                <p className="text-red-500 text-sm">{fields.note.errors}</p>
              </div>

              {/*  Submit button*/}
              <div className="flex justify-end mt-7">
                <div className="w-1/3">
                  <SubmitButton text="Send Invoice to Client" />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Suspense>
  );
}
