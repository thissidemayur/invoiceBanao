import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Link,
  Section,
} from "@react-email/components";

interface UpdatedInvoiceEmailProps {
  invoiceNumber: string;
  invoiceName: string;
  dueDate: string;
  total: string;
  downloadButton: string;
}

export const UpdatedInvoiceEmail = ({
  invoiceNumber,
  invoiceName,
  dueDate,
  total,
  downloadButton,
}: UpdatedInvoiceEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>📝 Your Invoice Has Been Updated</Heading>
          <Text style={subText}>
            We&apos;ve updated the details of your invoice. Please review the
            updated information below.
          </Text>

          <Section style={{ marginBottom: "30px" }}>
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

          <Text style={description}>
            You can view or download the updated invoice below:
          </Text>

          <Button href={downloadButton} style={button}>
            🔄 Download Updated Invoice
          </Button>

          <Text style={footerNote}>
            If you have questions or need clarification, feel free to reply to
            this email.
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              Looking for a freelancer? Email me:{" "}
              <Link href="mailto:thissidemayur@gmail.com">
                thissidemayur@gmail.com
              </Link>
            </Text>
            <Text style={socialLinks}>
              <Link href="https://github.com/thissidemayur">GitHub</Link> |{" "}
              <Link href="https://linkedin.com/in/thissidemayur">LinkedIn</Link>{" "}
              |{" "}
              <Link href="https://instagram.com/thissidemayur">Instagram</Link>{" "}
              | <Link href="https://x.com/thissidemayur">X</Link> |{" "}
              <Link href="mailto:thissidemayur@gmail.com">Email</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UpdatedInvoiceEmail;

// Styles
const body = {
  backgroundColor: "#f9fafb",
  margin: 0,
  padding: "20px 0",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  padding: "30px",
  width: "600px",
  margin: "0 auto",
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

const description = {
  marginBottom: "30px",
  color: "#4b5563",
};

const button = {
  padding: "12px 24px",
  backgroundColor: "#10b981",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  display: "inline-block",
};

const footerNote = {
  marginTop: "30px",
  fontSize: "13px",
  color: "#9ca3af",
};

const footer = {
  paddingTop: "40px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "4px 0",
};

const socialLinks = {
  fontSize: "12px",
  marginTop: "10px",
  color: "#6b7280",
};
