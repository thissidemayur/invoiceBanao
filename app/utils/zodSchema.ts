import { z } from 'zod'

export const onboardingSchema = z.object({
    firstName: z.string().min(2, "required"),
    lastName: z.string().min(2, " required"),
    address: z.string().min(2, "required")
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(1, "required"),
    total: z.number().min(1, "required"),
    status: z.enum(["PENDING", "PAID"]).default("PENDING"),
    date: z.coerce.date(),
    dueDate: z.number().min(1, "required"),
    fromName: z.string().min(1, "required"),
    fromEmail: z.string().email("Invalid email address"),
    fromAddress: z.string().min(1, "address is required"),
    clientName: z.string().min(1, "required"),
    clientAddress: z.string().min(1, "address is required"),
    clientEmail: z.string().email("Invalid email address"),
    currency: z.string().min(1, "required"),
    invoiceNumber: z.number().min(1, "required"),

    invoiceItemDescription: z.string().min(1, "required"),
    invoiceItemQuantity: z.number().min(1, "required"),
    invoiceItemRate: z.number().min(1, "required"),
    note: z.string().optional()
})