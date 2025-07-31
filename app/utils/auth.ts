import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend"
import { prisma } from "./db";
import MagicLinkEmail from "@/app/template/magicLink"
import { resend } from "./resend";
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend({
            apiKey: process.env.RESEND_API_KEY,
            from: process.env.FROM_EMAIL,
            sendVerificationRequest: async ({
                identifier: email,
                url,
                provider,
            }) => {

                try {
                    const { data, error } = await resend.emails.send({
                        from: provider.from!,
                        to: email,
                        subject: "Your Magic Sign-In Link",
                        react: MagicLinkEmail({ url: url }),
                    });

                    if (error) {
                        console.error("Resend send error: ", error)
                        throw new Error("Email not sent")

                    }
                } catch (error) {
                    console.error("Failed to send magic link email:", error);

                }


            }
        }),

    ],
    pages: {
        signIn: "/login",
        verifyRequest: "/verify",
    },
    secret: process.env.AUTH_SECRET,
});
