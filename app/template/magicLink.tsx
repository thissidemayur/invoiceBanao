// emails/MagicLinkEmail.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Link,
} from "@react-email/components";

export default function MagicLinkEmail({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your magic login link</Preview>
      <Body style={{ backgroundColor: "#f6f6f6", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "8px",
          }}
        >
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            Welcome to invoiceBanao 👋
          </Text>
          <Text style={{ fontSize: "16px" }}>
            Click below to sign in securely:
          </Text>
          <Link
            href={url}
            style={{
              display: "inline-block",
              backgroundColor: "#0070f3",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "6px",
              marginTop: "20px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Link>
          <Text>If you didn't request this, you can ignore this email.</Text>
        </Container>
      </Body>
    </Html>
  );
}
