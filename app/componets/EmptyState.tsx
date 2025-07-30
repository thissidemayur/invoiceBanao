import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface iAmProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}
export default function EmptyState({
  buttonText,
  title,
  description,
  href,
}: iAmProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xm mx-auto text-center">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle className="size-4 mr-2" />
        {buttonText}
      </Link>
    </div>
  );
}
