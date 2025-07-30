import { redirect } from "next/navigation";
import { auth } from "./auth";
import { prisma } from "./db";

export async function requiredUser() {
    const session = await auth()
    if (!session?.user) redirect("/login");
    return session
}

export const authorizeUser = async (invoiceId: string, userId: string) => {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
    });
    if (!data) {
        return redirect("/dashboard/invoice");
    }
    return true
};
