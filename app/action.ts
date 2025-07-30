"use server";

import { authorizeUser, requiredUser } from "@/app/utils/hooks";
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema, onboardingSchema } from "./utils/zodSchema";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
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
    const data = await prisma.invoice.create({
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

    emailClient.send({
        from: {
            email: "hello@demomailtrap.co",
            name: "Mailtrap Test",
        },
        to: [{
            email: "thissidemayur@gmail.com"
        }],
        template_uuid: "3fff8def-87ce-4971-8ee8-a6b33a63ec23",
        template_variables: {
            "invoiceNumber": submission.value.invoiceNumber,
            "invoiceName": submission.value.invoiceName,
            "dueDate": submission.value.dueDate,
            "total": submission.value.total,
            "downloadButton": `${process.env.NEXTAUTH_URL}/api/invoices/${data.id}`
        }
    }).then(console.log, console.error)

    redirect("/dashboard/invoices")
}

export async function editInvoice(prevValue: any, formdata: FormData) {
    const session = await requiredUser()
    const submission = parseWithZod(formdata, {
        schema: invoiceSchema
    })

    if (submission.status !== "success") return submission.reply()

    const data = await prisma.invoice.update(({
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

    if (!data) return { status: "error" }

    emailClient.send({
        from: {
            email: "hello@demomailtrap.co",
            name: "Mailtrap Test",
        },
        to: [{
            email: "thissidemayur@gmail.com"
        }],
        template_uuid: "7ec0275d-acd2-4aab-8606-8dc73fd35094",
        template_variables: {
            "invoiceNumber": submission.value.invoiceNumber,
            "invoiceName": submission.value.invoiceName,
            "dueDate": submission.value.dueDate,
            "total": submission.value.total,
            "downloadButton": `${process.env.NEXTAUTH_URL}/api/invoices/${formdata.get("id")}`
        }
    })

    redirect("/dashboard/invoices")
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




