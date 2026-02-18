import { Resend } from 'resend';

let _resend: Resend | null = null;
function getResend() {
    if (!_resend) {
        _resend = new Resend(process.env.RESEND_API_KEY || '');
    }
    return _resend;
}

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
        const data = await getResend().emails.send({
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
