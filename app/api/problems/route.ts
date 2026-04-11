import { NextResponse } from 'next/server';
import { createClerkSupabaseClient } from '@/lib/clerk-supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const supabase = await createClerkSupabaseClient();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            // Fetch specific problem 
            const { data: problem, error: problemError } = await supabase
                .from('problems')
                .select('*')
                .eq('id', id)
                .single();

            if (problemError) throw problemError;

            if (!problem) {
                return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
            }

            const problemWithCases = problem as any;

            // Attempt to fetch public test cases separately to avoid failing if the table is missing
            try {
                const { data: testCases } = await supabase
                    .from('test_cases')
                    .select('input, expected_output')
                    .eq('problem_id', id)
                    .eq('is_hidden', false);

                if (testCases) {
                    problemWithCases.test_cases = testCases;
                }
            } catch (tcError) {
                console.warn('Test cases fetch failed (likely table missing):', tcError);
                problemWithCases.test_cases = [];
            }

            return NextResponse.json({ problem: problemWithCases });
        } else {
            // Fetch all available problems (summary)
            const { data: problems, error } = await supabase
                .from('problems')
                .select('id, title, difficulty, acceptance_rate, tags')
                .order('id', { ascending: true });

            if (error) throw error;

            return NextResponse.json({ problems });
        }
    } catch (error) {
        console.error('API /problems error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch problems' },
            { status: 500 }
        );
    }
}
