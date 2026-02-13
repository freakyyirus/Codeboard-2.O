export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    skill_level: 'beginner' | 'intermediate' | 'advanced'
                    daily_goal: number
                    timezone: string
                    streak_count: number
                    longest_streak: number
                    last_active: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    skill_level?: 'beginner' | 'intermediate' | 'advanced'
                    daily_goal?: number
                    timezone?: string
                    streak_count?: number
                    longest_streak?: number
                    last_active?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    skill_level?: 'beginner' | 'intermediate' | 'advanced'
                    daily_goal?: number
                    timezone?: string
                    streak_count?: number
                    longest_streak?: number
                    last_active?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            problems: {
                Row: {
                    id: string
                    platform: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    external_id: string
                    title: string
                    title_slug: string | null
                    description: string | null
                    difficulty: 'easy' | 'medium' | 'hard' | null
                    tags: string[] | null
                    url: string
                    rating: number | null
                    acceptance_rate: number | null
                    is_premium: boolean
                    has_solution: boolean
                    cached_at: string
                }
                Insert: {
                    id?: string
                    platform: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    external_id: string
                    title: string
                    title_slug?: string | null
                    description?: string | null
                    difficulty?: 'easy' | 'medium' | 'hard' | null
                    tags?: string[] | null
                    url: string
                    rating?: number | null
                    acceptance_rate?: number | null
                    is_premium?: boolean
                    has_solution?: boolean
                    cached_at?: string
                }
                Update: {
                    id?: string
                    platform?: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    external_id?: string
                    title?: string
                    title_slug?: string | null
                    description?: string | null
                    difficulty?: 'easy' | 'medium' | 'hard' | null
                    tags?: string[] | null
                    url?: string
                    rating?: number | null
                    acceptance_rate?: number | null
                    is_premium?: boolean
                    has_solution?: boolean
                    cached_at?: string
                }
            }
            solves: {
                Row: {
                    id: string
                    user_id: string
                    problem_id: string
                    platform: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    solved_at: string
                    time_taken: number | null
                    code_snippet: string | null
                    is_practice: boolean
                    notes: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    problem_id: string
                    platform: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    solved_at?: string
                    time_taken?: number | null
                    code_snippet?: string | null
                    is_practice?: boolean
                    notes?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    problem_id?: string
                    platform?: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    solved_at?: string
                    time_taken?: number | null
                    code_snippet?: string | null
                    is_practice?: boolean
                    notes?: string | null
                }
            }
            contests: {
                Row: {
                    id: string
                    platform: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    external_id: string | null
                    name: string
                    url: string
                    start_time: string | null
                    duration_minutes: number | null
                    is_virtual: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    platform: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    external_id?: string | null
                    name: string
                    url: string
                    start_time?: string | null
                    duration_minutes?: number | null
                    is_virtual?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    platform?: 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks' | 'hackerrank'
                    external_id?: string | null
                    name?: string
                    url?: string
                    start_time?: string | null
                    duration_minutes?: number | null
                    is_virtual?: boolean
                    created_at?: string
                }
            }
        }
    }
}
