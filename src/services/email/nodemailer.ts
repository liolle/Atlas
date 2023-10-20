import { SendVerificationRequestParams } from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { EmailTemplate1 } from "./templates/email1";

export async function sendVerificationRequest(
    params: SendVerificationRequestParams
) {
    const { identifier, url, provider, token } = params;
    const { host } = new URL(url);

    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        html: EmailTemplate1(token)
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
}
