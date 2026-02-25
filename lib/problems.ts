
export interface Problem {
    id: string
    title: string
    difficulty: "Easy" | "Medium" | "Hard"
    description: string
    examples: { input: string; output: string; explanation?: string }[]
    constraints: string[]
    testInput: string
    expectedOutput: string
}

export const PROBLEMS: Problem[] = [
    {
        id: "1", title: "Two Sum", difficulty: "Easy",
        description: "Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        ],
        constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
        testInput: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]"
    },
    {
        id: "2", title: "Add Two Numbers", difficulty: "Medium",
        description: "You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each node contains a single digit. Add the two numbers and return the sum as a linked list.",
        examples: [
            { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
        ],
        constraints: ["The number of nodes in each linked list is in the range [1, 100].", "0 ≤ Node.val ≤ 9"],
        testInput: "l1 = [2,4,3], l2 = [5,6,4]",
        expectedOutput: "[7,0,8]"
    },
    {
        id: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium",
        description: "Given a string `s`, find the length of the **longest substring** without repeating characters.",
        examples: [
            { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
            { input: 's = "bbbbb"', output: "1" },
        ],
        constraints: ["0 ≤ s.length ≤ 5 × 10⁴", "s consists of English letters, digits, symbols and spaces."],
        testInput: 's = "abcabcbb"',
        expectedOutput: "3"
    },
    {
        id: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard",
        description: "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return **the median** of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
        examples: [
            { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "merged array = [1,2,3] and median is 2." },
        ],
        constraints: ["nums1.length == m", "nums2.length == n", "0 ≤ m ≤ 1000"],
        testInput: "nums1 = [1,3], nums2 = [2]",
        expectedOutput: "2.0"
    },
    {
        id: "5", title: "Valid Parentheses", difficulty: "Easy",
        description: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "([)]"', output: "false" },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
        testInput: 's = "{[]}"',
        expectedOutput: "true"
    },
    {
        id: "6", title: "Merge Two Sorted Lists", difficulty: "Easy",
        description: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one **sorted** list by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
        examples: [
            { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
        ],
        constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 ≤ Node.val ≤ 100"],
        testInput: "list1 = [1,2,4], list2 = [1,3,4]",
        expectedOutput: "[1,1,2,3,4,4]"
    },
    {
        id: "7", title: "Maximum Subarray", difficulty: "Medium",
        description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
        examples: [
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
        testInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6"
    },
    {
        id: "8", title: "Climbing Stairs", difficulty: "Easy",
        description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
            { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step. 2. 2 steps." },
            { input: "n = 3", output: "3" },
        ],
        constraints: ["1 ≤ n ≤ 45"],
        testInput: "n = 4",
        expectedOutput: "5"
    },
    {
        id: "9", title: "Binary Search", difficulty: "Easy",
        description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with O(log n) runtime complexity.",
        examples: [
            { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
            { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique."],
        testInput: "nums = [-1,0,3,5,9,12], target = 9",
        expectedOutput: "4"
    },
    {
        id: "10", title: "Merge K Sorted Lists", difficulty: "Hard",
        description: "You are given an array of `k` linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        examples: [
            { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
        ],
        constraints: ["k == lists.length", "0 ≤ k ≤ 10⁴", "0 ≤ lists[i].length ≤ 500"],
        testInput: "lists = [[1,4,5],[1,3,4],[2,6]]",
        expectedOutput: "[1,1,2,3,4,4,5,6]"
    },
]
