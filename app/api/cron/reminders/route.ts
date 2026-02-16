import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/email';
import { StreakReminderEmail } from '@/components/emails/StreakReminder';
import { getCachedContests } from '@/lib/clist';
import { ContestReminderEmail } from '@/components/emails/ContestReminder';

export async function GET(req: Request) {
    // Security: Check for a secret key to prevent unauthorized triggering
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. STREAK REMINDERS
    // Find users who have a streak > 0 but haven't solved something in the last 20 hours
    const { data: usersToRemind } = await supabase
        .from('users')
        .select('id, email, full_name, streak_count')
        .gt('streak_count', 0);

    if (usersToRemind) {
        for (const user of usersToRemind) {
            // Logic: Check last solve_at from 'solves' table
            const { data: lastSolve } = await supabase
                .from('solves')
                .select('solved_at')
                .eq('user_id', user.id)
                .order('solved_at', { ascending: false })
                .limit(1)
                .single();

            if (lastSolve) {
                const lastSolveDate = new Date(lastSolve.solved_at);
                const now = new Date();
                const diffHours = (now.getTime() - lastSolveDate.getTime()) / (1000 * 60 * 60);

                // If it's been more than 18 hours but less than 24, send reminder
                if (diffHours >= 18 && diffHours < 24 && user.email) {
                    await sendEmail({
                        to: user.email,
                        subject: `Don't lose your ${user.streak_count} day streak!`,
                        react: StreakReminderEmail({
                            username: user.full_name || 'Developer',
                            streakCount: user.streak_count
                        })
                    });
                }
            }
        }
    }

    // 2. CONTEST REMINDERS
    // Get upcoming contests from Clist
    const contests = await getCachedContests();
    const now = new Date();

    // Find contests starting in the next 1 hour
    const upcomingContests = contests.filter(c => {
        const start = new Date(c.start);
        const diffMin = (start.getTime() - now.getTime()) / (1000 * 60);
        return diffMin > 0 && diffMin <= 60;
    });

    if (upcomingContests.length > 0) {
        // In a real SaaS, we would filter users who opted in or connected these platforms
        const { data: allUsers } = await supabase.from('users').select('email, full_name');

        if (allUsers) {
            for (const contest of upcomingContests) {
                for (const user of allUsers) {
                    if (user.email) {
                        await sendEmail({
                            to: user.email,
                            subject: `Reminder: ${contest.event} starts soon!`,
                            react: ContestReminderEmail({
                                username: user.full_name || 'Developer',
                                contestName: contest.event,
                                platform: contest.resource,
                                startTime: new Date(contest.start).toLocaleTimeString(),
                                href: contest.href
                            })
                        });
                    }
                }
            }
        }
    }

    return NextResponse.json({ success: true, processed: { streaks: !!usersToRemind, contests: upcomingContests.length } });
}
