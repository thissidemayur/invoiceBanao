import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Link,
} from "@react-email/components";

interface InvoiceEmailProps {
  invoiceNumber: string;
  invoiceName: string;
  dueDate: string;
  total: string;
  downloadButton: string;
}

export const InvoiceEmail = ({
  invoiceNumber,
  invoiceName,
  dueDate,
  total,
  downloadButton,
}: InvoiceEmailProps) => (
  <Html>
    <Head />
    <Body style={body}>
      <Container style={container}>
        <Heading style={heading}>🧾 Your Invoice</Heading>
        <Text style={subText}>
          Thank you for your business. Please find the details of your invoice
          below.
        </Text>

        <Section>
          <Text>
            <strong>Invoice No:</strong> {invoiceNumber}
          </Text>
          <Text>
            <strong>Invoice Name:</strong> {invoiceName}
          </Text>
          <Text>
            <strong>Due Date:</strong> {dueDate}
          </Text>
          <Text>
            <strong>Total Amount:</strong> ₹{total}
          </Text>
        </Section>

        <Text style={paragraph}>
          You can download your invoice by clicking the button below:
        </Text>

        <Button href={downloadButton} style={button}>
          📥 Download Invoice
        </Button>

        <Text style={footerText}>
          If you have any questions, feel free to reply to this email. Thank
          you!
        </Text>

        <Section style={contactSection}>
          <Text style={contact}>
            Looking for a freelancer? Email me:{" "}
            <Link href="mailto:thissidemayur@gmail.com">
              thissidemayur@gmail.com
            </Link>
          </Text>
          <Text style={links}>
            <Link href="https://github.com/thissidemayur">GitHub</Link> |{" "}
            <Link href="https://linkedin.com/in/thissidemayur">LinkedIn</Link> |{" "}
            <Link href="https://instagram.com/thissidemayur">Instagram</Link> |{" "}
            <Link href="https://x.com/thissidemayur">X</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default InvoiceEmail;

const body = {
  backgroundColor: "#f9fafb",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  padding: "30px",
  width: "600px",
  margin: "auto",
};

const heading = {
  marginBottom: "10px",
  color: "#1f2937",
};

const subText = {
  marginBottom: "20px",
  color: "#6b7280",
  fontSize: "14px",
};

const paragraph = {
  marginBottom: "30px",
  color: "#4b5563",
};

const button = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "#2563eb",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
};

const footerText = {
  marginTop: "30px",
  fontSize: "13px",
  color: "#9ca3af",
};

const contactSection = {
  marginTop: "40px",
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
};

const contact = {
  margin: "4px 0",
};

const links = {
  marginTop: "10px",
};
