"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookDown,
  CheckCircle,
  MailPlusIcon,
  Pencil,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function InvoiceAction({
  invoiceId,
  invoiceStatus,
}: {
  invoiceId: string;
  invoiceStatus: string;
}) {
  const handleReminderEmail = () => {
    toast.promise(
      fetch(`/api/email/${invoiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending reminder email...",
        success: "reminder email sent successfully",
        error: "Failed to sent email reminder",
      }
    );
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            asChild
            className="flex  items-center text-sm gap-x-3"
          >
            <Link
              href={`invoices/${invoiceId}/edit
`}
            >
              <Pencil size={18} /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            className="flex  items-center text-sm gap-x-3"
          >
            <a
              href={`/api/invoices/${invoiceId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm gap-x-3 px-2 py-1.5 hover:bg-gray-100 rounded-md"
            >
              <BookDown size={18} /> Download Invoice
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex  items-center text-sm gap-x-3"
            onClick={handleReminderEmail}
          >
            <MailPlusIcon size={18} /> Reminder Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            className="flex  items-center text-sm gap-x-3"
          >
            <Link href={`invoices/${invoiceId}/delete`}>
              <Trash2Icon size={18} /> Delete Invoice
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            className="flex  items-center text-sm gap-x-3"
          >
            {invoiceStatus === "PENDING" ? (
              <Link
                href={`invoices/${invoiceId}/paid`}
                className="flex items-center gap-x-2"
              >
                <CheckCircle size={18} /> Mark as Paid
              </Link>
            ) : null}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
