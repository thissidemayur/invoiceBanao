"use client";
import { Button } from "@react-email/components";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutPage() {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch("/api/signout", {
      method: "POST",
    });
    console.log("Res: ", res);
    if (res.ok) {
      toast.success("successfull logout");
      router.replace("/");
    } else {
      toast.error("logout failed");
    }
  };
  return <Button onClick={handleLogout}>Sign Out </Button>;
}
