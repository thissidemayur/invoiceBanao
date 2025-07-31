import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
} from "@react-email/components";
import * as React from "react";

interface InvoiceReminderEmailProps {
  invoiceNumber: string;
  clientName: string;
  dueDate: string;
  invoiceName: string;
  invoiceDate: string;
  totalAmount: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  currentYear: string;
}

export const InvoiceReminderEmail = ({
  invoiceNumber,
  clientName,
  dueDate,
  invoiceName,
  invoiceDate,
  totalAmount,
  fromName,
  fromEmail,
  fromAddress,
  currentYear,
}: InvoiceReminderEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>⏳ Payment Reminder - Invoice #{invoiceNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading as="h2" style={heading}>
            ⏳ Payment Reminder - Invoice #{invoiceNumber}
          </Heading>

          <Text style={text}>
            Hi <strong>{clientName}</strong>,
          </Text>

          <Text style={text}>
            This is a friendly reminder that invoice{" "}
            <strong>#{invoiceNumber}</strong> is still pending. The due date is{" "}
            <strong>{dueDate}</strong>, and we'd really appreciate your timely
            payment.
          </Text>

          <Section style={invoiceBox}>
            <Text>
              <strong>Invoice Name:</strong> {invoiceName}
            </Text>
            <Text>
              <strong>Invoice Date:</strong> {invoiceDate}
            </Text>
            <Text>
              <strong>Amount Due:</strong> ₹{totalAmount}
            </Text>
            <Text>
              <strong>Status:</strong> Pending
            </Text>
          </Section>

          <Link style={button} href="mailto:thissidemayur@gmail.com">
            Contact Us
          </Link>

          <Section style={helpBox}>
            Trouble making the payment or need to send this to someone else?{" "}
            <br />
            Simply forward this email or contact us at
            <strong>
              <Link href="mailto:thissidemayur@gmail.com" style={helpLink}>
                {" "}
                thissidemayur@gmail.com
              </Link>
            </strong>{" "}
            and we’ll assist you right away.
          </Section>

          <Text style={{ ...text, marginTop: "25px" }}>
            If you've already paid, please disregard this message. Thank you for
            your business! 🙏
          </Text>

          <Text style={footer}>
            Sent by {fromName} | {fromEmail}
            <br />
            {fromAddress}
            <br />
            {fromName} © {currentYear}. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default InvoiceReminderEmail;

const main = {
  backgroundColor: "#f3f4f6",
  padding: "20px",
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
};

const container = {
  maxWidth: "620px",
  margin: "auto",
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
};

const heading = {
  color: "#111827",
};

const text = {
  color: "#4b5563",
  lineHeight: 1.6,
  fontSize: "15px",
};

const invoiceBox = {
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "6px",
  margin: "20px 0",
};

const button = {
  display: "inline-block",
  marginTop: "20px",
  backgroundColor: "#0d9488",
  color: "white",
  padding: "12px 18px",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
};

const helpBox = {
  marginTop: "30px",
  fontSize: "14px",
  backgroundColor: "#fef3c7",
  borderLeft: "4px solid #facc15",
  padding: "12px 16px",
  borderRadius: "4px",
  color: "#92400e",
};

const helpLink = {
  color: "#b45309",
};

const footer = {
  marginTop: "40px",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "#9ca3af",
};
