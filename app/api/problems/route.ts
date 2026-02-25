import { NextResponse } from 'next/server';
import { createClerkSupabaseClient } from '@/lib/clerk-supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const supabase = await createClerkSupabaseClient();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            // Fetch specific problem with its public test cases
            const { data: problem, error: problemError } = await supabase
                .from('problems')
                .select(`
          *,
          test_cases (
            input,
            expected_output
          )
        `)
                .eq('id', id)
                .eq('test_cases.is_hidden', false)
                .single();

            if (problemError) throw problemError;

            if (!problem) {
                return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
            }

            return NextResponse.json({ problem });
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
