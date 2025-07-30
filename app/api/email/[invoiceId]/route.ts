import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
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

        if (!data) return NextResponse.json({ error: "User not found" }, { status: 404 })
        emailClient.send({
            from: {
                email: "hello@demomailtrap.co",
                name: "Mailtrap Test",
            },
            to: [
                {
                    email: "thissidemayur@gmail.com",
                }
            ],
            template_uuid: "d3f7bdf3-769b-4cde-924b-55cb0752681b",
            template_variables: {
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
            }
        })
        return NextResponse.json({ message: "Email Sent successfull" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "failed to send email reminder" }, { status: 500 })
    }
}