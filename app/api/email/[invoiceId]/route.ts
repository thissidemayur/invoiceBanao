import InvoiceReminderEmail from "@/app/template/InvoiceReminder";
import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import { resend } from "@/app/utils/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ invoiceId: string }> }) {
    try {
        const session = await requiredUser()

        const { invoiceId } = await params

        const data = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id
            }
        })

        if (!data) return NextResponse.json(
            { error: "Invoice not found or unauthorized access." },
            { status: 404 })
        try {
            await resend.emails.send({
                from: process.env.FROM_EMAIL!,
                to: `${data.clientEmail}`,
                subject: `Payment Reminder: Invoice #${data.invoiceNumber}`,
                react: InvoiceReminderEmail({
                    "invoiceNumber": `${data?.invoiceNumber}`,
                    "clientName": `${data?.clientName}`,
                    "dueDate": `${data?.dueDate}`,
                    "invoiceName": `${data?.invoiceName}`,
                    "invoiceDate": `${data?.date}`,
                    "totalAmount": `${data?.total}`,
                    "fromName": `${data?.fromName}`,
                    "fromEmail": `${data?.fromEmail}`,
                    "fromAddress": ` ${data?.fromAddress}`,
                    "currentYear": `${new Date().getFullYear}`,
                }),
            });
        } catch (error) {
            console.error("error while sending reminder email: ", error)
            return NextResponse.json({ error: "failed to send reminder email" }, { status: 500 })
        }


        return NextResponse.json({ message: "Reminder Email Sent successfull" }, { status: 200 })
    } catch (error) {
        console.error("Server error while processing reminder request:", error);
        return NextResponse.json(
            { error: "Internal server error. Unable to send reminder." },
            { status: 500 }
        );
    }
}