-- ============================================================
-- CodeBoard 2.O — Test Cases Table
-- Required for the code execution engine
-- ============================================================

CREATE TABLE IF NOT EXISTS test_cases (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id uuid REFERENCES problems(id) ON DELETE CASCADE NOT NULL,
    input text NOT NULL,
    expected_output text NOT NULL,
    is_hidden boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_test_cases_problem ON test_cases(problem_id);

ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read test cases"
    ON test_cases FOR SELECT
    USING (true);

CREATE POLICY "Service role can insert test cases"
    ON test_cases FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Service role can update test cases"
    ON test_cases FOR UPDATE
    USING (true);
