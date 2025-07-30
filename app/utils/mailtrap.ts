import { MailtrapClient } from "mailtrap"

const TOKEN = process.env.MAILTRAP_TOKEN!
export const emailClient = new MailtrapClient({
    token: "333cd0c4d4f66a55d40a99a80aab344b",
    testInboxId: 1753514601,
})



