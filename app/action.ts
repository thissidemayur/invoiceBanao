"use server";

import { authorizeUser, requiredUser } from "@/app/utils/hooks";
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema, onboardingSchema } from "./utils/zodSchema";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { resend } from "./utils/resend";
import InvoiceEmail from "./template/InvoiceSent";
import UpdatedInvoiceEmail from "./template/InvoiceUpdated";
// import { sendWithTemplate } from "./utils/resend";
// function for server action

export async function onBoardUser(prevState: any, formData: FormData) {
    const session = await requiredUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema
    })


    if (submission.status !== 'success') {
        return submission.reply()
    }

    await prisma.user.update({
        where: {
            id: session?.user?.id
        }, data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address
        }
    })

    return redirect("/dashboard")
}

// 1. Create a type from your Zod schem

export async function createInvoice(prevState: any, formData: FormData) {

    const session = await requiredUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }


    // create invoice db
    const invoiceData = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress as string,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session?.user?.id as string
        }
    })

    if (!invoiceData) return {
        status: "error", message: "Invoice creation failed. Try again.",
    }

    // send via sendgrid
    try {
        await resend.emails.send({
            from: process.env.FROM_EMAIL!,
            to: submission.value.clientEmail,
            subject: `🧾 Invoice #${submission.value.invoiceNumber} Sent to ${submission.value.clientName}`,
            react: InvoiceEmail({
                invoiceNumber: submission.value.invoiceNumber.toString(),
                invoiceName: submission.value.invoiceName,
                dueDate: submission.value.dueDate.toString(),
                total: submission.value.total.toString(),
                downloadButton: `${process.env.NEXTAUTH_URL}/api/invoices/${invoiceData.id}`,
            }),
        });

        return {
            status: "success",
            message: "Invoice created and email sent."
        };


    } catch (err) {
        console.error('Resend  invoice error:', err);

        return { status: "email_failed", message: "Invoice created, but email sending failed." };

    }

}

export async function editInvoice(prevValue: any, formdata: FormData) {
    const session = await requiredUser()
    const submission = parseWithZod(formdata, {
        schema: invoiceSchema
    })

    if (submission.status !== "success") return submission.reply()

    const invoiceData = await prisma.invoice.update(({
        where: {
            id: formdata.get("id") as string,
            userId: session.user?.id
        },
        data: {
            clientAddress: submission.value.clientAddress as string,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        }

    }))

    if (!invoiceData) return {
        status: "error", message: "Invoice creation failed. Try again.",
    }
    try {
        await resend.emails.send({
            from: process.env.FROM_EMAIL!,
            to: submission.value.clientEmail,
            subject: `🔄 Invoice #${submission.value.invoiceNumber} Updated`,
            react: UpdatedInvoiceEmail({
                invoiceNumber: submission.value.invoiceNumber.toString(),
                invoiceName: submission.value.invoiceName,
                dueDate: submission.value.dueDate.toString(),
                total: submission.value.total.toString(),
                downloadButton: `${process.env.NEXTAUTH_URL}/api/invoices/${invoiceData.id}`,
            }),
        });



    } catch (err) {
        console.error('Resend update invoice error:', err);
        return { status: "email_failed", message: "Invoice updated, but email sending failed." };

    }
    return { status: "success", message: "Invoice Updated and email sent." };

}

export async function deleteInvoice(invoiceId: string) {
    const session = await requiredUser();
    await authorizeUser(invoiceId, session.user?.id as string);

    await prisma.invoice.delete({
        where: {
            userId: session.user?.id,
            id: invoiceId
        }
    })

}

export async function markAsDone(invoiceId: string) {
    const session = await requiredUser();
    await authorizeUser(invoiceId, session.user?.id as string);

    await prisma.invoice.update({
        where: {
            userId: session.user?.id,
            id: invoiceId
        },
        data: {
            status: "PAID"
        }
    })
}




