import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
    to,
    subject,
    react,
    text,
}: {
    to: string;
    subject: string;
    react?: React.ReactElement;
    text?: string;
}) {
    try {
        const data = await resend.emails.send({
            from: 'CodeBoard <notifications@codeboard.dev>',
            to,
            subject,
            react,
            text: text || '',
        });
        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    }
}
