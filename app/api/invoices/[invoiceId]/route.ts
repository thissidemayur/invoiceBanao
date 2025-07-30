import { prisma } from "@/app/utils/db";
import { formatedDate } from "@/app/utils/internationalAPI";
import { jsPDF } from "jspdf";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const invoiceId = req.url.split("/").pop()

    const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        select: {
            invoiceName: true,
            total: true,
            status: true,
            date: true,
            dueDate: true,
            fromName: true,
            fromEmail: true,
            fromAddress: true,
            clientAddress: true,
            clientEmail: true,
            clientName: true,
            currency: true,
            invoiceNumber: true,
            invoiceItemDescription: true,
            invoiceItemQuantity: true,
            invoiceItemRate: true,
            note: true,

        }
    })

    if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 400 })

    // create pdf 
    const pdf = new jsPDF();

    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold")
    pdf.text(`YOUR INVOICE`, 20, 20);

    // from section 
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "normal")
    pdf.text("From", 20, 40)
    pdf.setFontSize(12)
    pdf.text([invoice.fromName, invoice.fromEmail, invoice.fromAddress], 20, 46)
    pdf.setFontSize(12)

    // client section
    pdf.setFontSize(14)
    pdf.text("Bill to", 20, 70)
    pdf.setFontSize(12)
    pdf.text([invoice.clientName, invoice.clientEmail, invoice.clientAddress], 20, 76)
    pdf.setFontSize(12)

    // invoice detail
    pdf.setFontSize(12)
    pdf.text([
        `Invoice Number: #${invoice.invoiceNumber}`,
        `Invoice Name: ${invoice.invoiceName}`,
        `Date: ${formatedDate(invoice.date)}`,
        `Due Date: ${invoice.dueDate}`
    ]
        , 120, 42)

    // Item table header
    pdf.setFontSize(13)
    pdf.setFont("helvetica", "bold")
    pdf.text("Description", 20, 100)
    pdf.text("Rate", 100, 100)
    pdf.text("Quantity", 130, 100)
    pdf.text("Total Amount", 160, 100)

    // header line
    pdf.line(20, 104, 190, 104)

    // item description 
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")

    pdf.text(pdf.splitTextToSize((`${invoice.invoiceItemDescription}`), 70), 20, 110)
    pdf.text(`${invoice.invoiceItemRate}`, 100, 110)
    pdf.text(`${invoice.invoiceItemQuantity}`, 130, 110)
    pdf.text(
        `${invoice.currency}- ${invoice.total}`

        , 160, 110)
    pdf.setFont("helvetica", "bold")

    // footer line
    pdf.line(20, 130, 190, 130)

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(12)
    pdf.text(`Total (${invoice.currency}):   ${invoice.total}`, 130, 145)

    // Additional notes

    if (invoice.note) {
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(12)
        pdf.text(`Note: (${invoice.note}): `, 20, 155)
    }

    // pdf.text(`${invoice.total}`, 154, 125)
    const pdfData = pdf.output("arraybuffer"); // Binary stream


    return new NextResponse(pdfData, {
        headers: {
            'Content-Type': "Application/pdf",
            'Content-Disposition': "inline"
        }
    })
}


