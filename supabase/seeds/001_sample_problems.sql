-- ============================================================
-- CodeBoard 2.O — Sample Problems Seed Data
-- Run AFTER test_cases migration
-- ============================================================

-- Two Sum (LeetCode #1) - Easy
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '1',
    'Two Sum',
    'two-sum',
    E'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    'easy',
    ARRAY['array', 'hash-table'],
    'https://leetcode.com/problems/two-sum/',
    49.2,
    '{"cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};", "python": "class Solution:\n    def twoSum(self, nums, target):\n        return []", "javascript": "var twoSum = function(nums, target) {};", "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '2 7 11 15\n9', '[0,1]', false
FROM problems WHERE external_id = '1';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '3 2 4\n6', '[1,2]', false
FROM problems WHERE external_id = '1';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '3 3\n6', '[0,1]', false
FROM problems WHERE external_id = '1';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '0 -1 2 -1 -1\n0', '[0,1]', true
FROM problems WHERE external_id = '1';

-- Valid Parentheses (LeetCode #20) - Easy
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '20',
    'Valid Parentheses',
    'valid-parentheses',
    E'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
    'easy',
    ARRAY['string', 'stack'],
    'https://leetcode.com/problems/valid-parentheses/',
    40.1,
    '{"cpp": "#include <iostream>\n#include <stack>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        return false;\n    }\n};", "python": "class Solution:\n    def isValid(self, s):\n        return False", "javascript": "var isValid = function(s) {\n    return false;\n};", "java": "class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '()', 'true', false
FROM problems WHERE external_id = '20';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '()[]{}', 'true', false
FROM problems WHERE external_id = '20';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '(]', 'false', false
FROM problems WHERE external_id = '20';

-- Merge Two Sorted Lists (LeetCode #21) - Easy
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '21',
    'Merge Two Sorted Lists',
    'merge-two-sorted-lists',
    E'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list.',
    'easy',
    ARRAY['linked-list', 'recursion'],
    'https://leetcode.com/problems/merge-two-sorted-lists/',
    62.8,
    '{"cpp": "struct ListNode { int val; ListNode* next; };", "python": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next", "javascript": "function ListNode(val, next) { this.val = val || 0; this.next = next || null; }", "java": "public class ListNode { int val; ListNode next; }"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '[1,2,4]\n[1,3,4]', '[1,1,2,3,4,4]', false
FROM problems WHERE external_id = '21';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '[]\n[]', '[]', false
FROM problems WHERE external_id = '21';

-- Climbing Stairs (LeetCode #70) - Easy
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '70',
    'Climbing Stairs',
    'climbing-stairs',
    E'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps.',
    'easy',
    ARRAY['math', 'dynamic-programming'],
    'https://leetcode.com/problems/climbing-stairs/',
    51.8,
    '{"cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};", "python": "class Solution:\n    def climbStairs(self, n):\n        return 0", "javascript": "var climbStairs = function(n) { return 0; };", "java": "class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '2', '2', false
FROM problems WHERE external_id = '70';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '3', '3', false
FROM problems WHERE external_id = '70';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '5', '8', true
FROM problems WHERE external_id = '70';

-- Binary Search (LeetCode #704) - Easy
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '704',
    'Binary Search',
    'binary-search',
    E'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`.',
    'easy',
    ARRAY['array', 'binary-search'],
    'https://leetcode.com/problems/binary-search/',
    55.4,
    '{"cpp": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        return -1;\n    }\n};", "python": "class Solution:\n    def search(self, nums, target):\n        return -1", "javascript": "var search = function(nums, target) { return -1; };", "java": "class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '-1 0 3 5 9 12\n9', '4', false
FROM problems WHERE external_id = '704';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '-1 0 3 5 9 12\n2', '-1', false
FROM problems WHERE external_id = '704';

-- Reverse Linked List (LeetCode #206) - Easy
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '206',
    'Reverse Linked List',
    'reverse-linked-list',
    E'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    'easy',
    ARRAY['linked-list', 'recursion'],
    'https://leetcode.com/problems/reverse-linked-list/',
    72.5,
    '{"cpp": "struct ListNode { int val; ListNode* next; };", "python": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next", "javascript": "function ListNode(val, next) { this.val = val || 0; this.next = next || null; }", "java": "public class ListNode { int val; ListNode next; }"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '[1,2,3,4,5]', '[5,4,3,2,1]', false
FROM problems WHERE external_id = '206';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '[1,2]', '[2,1]', false
FROM problems WHERE external_id = '206';

-- Maximum Subarray (LeetCode #53) - Medium
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '53',
    'Maximum Subarray',
    'maximum-subarray',
    E'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    'medium',
    ARRAY['array', 'dynamic-programming'],
    'https://leetcode.com/problems/maximum-subarray/',
    53.3,
    '{"cpp": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        return 0;\n    }\n};", "python": "class Solution:\n    def maxSubArray(self, nums):\n        return 0", "javascript": "var maxSubArray = function(nums) { return 0; };", "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '-2 1 -3 4 -1 2 1 -5 4', '6', false
FROM problems WHERE external_id = '53';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '1', '1', false
FROM problems WHERE external_id = '53';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '5 4 -1 7 8', '23', false
FROM problems WHERE external_id = '53';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '-2 -1', '-1', true
FROM problems WHERE external_id = '53';

-- Container With Most Water (LeetCode #11) - Medium
INSERT INTO problems (
    platform,
    external_id,
    title,
    title_slug,
    description,
    difficulty,
    tags,
    url,
    acceptance_rate,
    starter_code
) VALUES (
    'leetcode',
    '11',
    'Container With Most Water',
    'container-with-most-water',
    E'Given an integer array `height`, find two lines that together with the x-axis form a container that holds the most water.',
    'medium',
    ARRAY['array', 'two-pointers'],
    'https://leetcode.com/problems/container-with-most-water/',
    55.7,
    '{"cpp": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        return 0;\n    }\n};", "python": "class Solution:\n    def maxArea(self, height):\n        return 0", "javascript": "var maxArea = function(height) { return 0; };", "java": "class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}"}'::jsonb
) ON CONFLICT (platform, external_id) DO NOTHING;

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '1 8 6 2 5 4 8 3 7', '49', false
FROM problems WHERE external_id = '11';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '1 1', '1', false
FROM problems WHERE external_id = '11';

INSERT INTO test_cases (problem_id, input, expected_output, is_hidden)
SELECT id, '4 3 2 1 4', '16', true
FROM problems WHERE external_id = '11';
