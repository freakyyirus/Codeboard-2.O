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
                    skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
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
                    skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
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
                    skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
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
                    starter_code: Json | null
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
                    starter_code?: Json | null
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
                    starter_code?: Json | null
                    cached_at?: string
                }
            }
            test_cases: {
                Row: {
                    id: string
                    problem_id: string
                    input: string
                    expected_output: string
                    is_hidden: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    problem_id: string
                    input: string
                    expected_output: string
                    is_hidden?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    problem_id?: string
                    input?: string
                    expected_output?: string
                    is_hidden?: boolean
                    created_at?: string
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
            platform_connections: {
                Row: {
                    id: string
                    user_id: string
                    platform: string
                    username: string
                    last_synced: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    platform: string
                    username: string
                    last_synced?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    platform?: string
                    username?: string
                    last_synced?: string | null
                    created_at?: string
                }
            }
            platform_stats: {
                Row: {
                    user_id: string
                    platform: string
                    easy_solved: number | null
                    medium_solved: number | null
                    hard_solved: number | null
                    total_solved: number | null
                    rating: number | null
                    global_rank: string | null
                    last_synced: string | null
                }
                Insert: {
                    user_id: string
                    platform: string
                    easy_solved?: number | null
                    medium_solved?: number | null
                    hard_solved?: number | null
                    total_solved?: number | null
                    rating?: number | null
                    global_rank?: string | null
                    last_synced?: string | null
                }
                Update: {
                    user_id?: string
                    platform?: string
                    easy_solved?: number | null
                    medium_solved?: number | null
                    hard_solved?: number | null
                    total_solved?: number | null
                    rating?: number | null
                    global_rank?: string | null
                    last_synced?: string | null
                }
            }
            feedback: {
                Row: {
                    id: string
                    user_id: string | null
                    category: string
                    message: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    category: string
                    message: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    category?: string
                    message?: string
                    created_at?: string
                }
            }
            user_roadmaps: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    description: string | null
                    icon: string | null
                    color: string | null
                    category: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    user_id: string
                    title: string
                    description?: string | null
                    icon?: string | null
                    color?: string | null
                    category?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    icon?: string | null
                    color?: string | null
                    category?: string | null
                    created_at?: string
                }
            }
            roadmap_steps: {
                Row: {
                    id: string
                    roadmap_id: string | null
                    title: string
                    description: string | null
                    status: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    roadmap_id?: string | null
                    title: string
                    description?: string | null
                    status?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    roadmap_id?: string | null
                    title?: string
                    description?: string | null
                    status?: string | null
                    created_at?: string
                }
            }
            social_posts: {
                Row: {
                    id: string
                    user_id: string
                    type: string
                    content: string | null
                    metadata: Json | null
                    likes_count: number | null
                    comments_count: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    type: string
                    content?: string | null
                    metadata?: Json | null
                    likes_count?: number | null
                    comments_count?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    type?: string
                    content?: string | null
                    metadata?: Json | null
                    likes_count?: number | null
                    comments_count?: number | null
                    created_at?: string
                }
            }
            follows: {
                Row: {
                    follower_id: string
                    following_id: string
                    created_at: string
                }
                Insert: {
                    follower_id: string
                    following_id: string
                    created_at?: string
                }
                Update: {
                    follower_id?: string
                    following_id?: string
                    created_at?: string
                }
            }
            user_rewards: {
                Row: {
                    id: string
                    user_id: string | null
                    code_coins: number | null
                    current_streak: number | null
                    longest_streak: number | null
                    last_claim_date: string | null
                    total_problems_solved: number | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    code_coins?: number | null
                    current_streak?: number | null
                    longest_streak?: number | null
                    last_claim_date?: string | null
                    total_problems_solved?: number | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    code_coins?: number | null
                    current_streak?: number | null
                    longest_streak?: number | null
                    last_claim_date?: string | null
                    total_problems_solved?: number | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            daily_rewards: {
                Row: {
                    id: string
                    user_id: string | null
                    claim_date: string
                    coins_earned: number
                    streak_day: number
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    claim_date: string
                    coins_earned: number
                    streak_day: number
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    claim_date?: string
                    coins_earned?: number
                    streak_day?: number
                    created_at?: string | null
                }
            }
            user_badges: {
                Row: {
                    id: string
                    user_id: string | null
                    badge_type: string
                    earned_at: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    badge_type: string
                    earned_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    badge_type?: string
                    earned_at?: string | null
                }
            }
            badges: {
                Row: {
                    id: number
                    badge_type: string
                    name: string
                    description: string | null
                    icon: string | null
                    requirement_type: string | null
                    requirement_value: number | null
                    coin_cost: number | null
                }
                Insert: {
                    id?: number
                    badge_type: string
                    name: string
                    description?: string | null
                    icon?: string | null
                    requirement_type?: string | null
                    requirement_value?: number | null
                    coin_cost?: number | null
                }
                Update: {
                    id?: number
                    badge_type?: string
                    name?: string
                    description?: string | null
                    icon?: string | null
                    requirement_type?: string | null
                    requirement_value?: number | null
                    coin_cost?: number | null
                }
            }
            portfolio_profiles: {
                Row: {
                    user_id: string
                    headline: string | null
                    location: string | null
                    company: string | null
                    bio: string | null
                    theme_color: string | null
                    custom_url_slug: string | null
                    is_public: boolean | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    user_id: string
                    headline?: string | null
                    location?: string | null
                    company?: string | null
                    bio?: string | null
                    theme_color?: string | null
                    custom_url_slug?: string | null
                    is_public?: boolean | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    user_id?: string
                    headline?: string | null
                    location?: string | null
                    company?: string | null
                    bio?: string | null
                    theme_color?: string | null
                    custom_url_slug?: string | null
                    is_public?: boolean | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            portfolio_skills: {
                Row: {
                    id: string
                    user_id: string | null
                    category: string
                    name: string
                    proficiency: number | null
                    sort_order: number | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    category: string
                    name: string
                    proficiency?: number | null
                    sort_order?: number | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    category?: string
                    name?: string
                    proficiency?: number | null
                    sort_order?: number | null
                    created_at?: string | null
                }
            }
            portfolio_projects: {
                Row: {
                    id: string
                    user_id: string | null
                    title: string
                    description: string | null
                    tags: string[] | null
                    link: string | null
                    sort_order: number | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    title: string
                    description?: string | null
                    tags?: string[] | null
                    link?: string | null
                    sort_order?: number | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    title?: string
                    description?: string | null
                    tags?: string[] | null
                    link?: string | null
                    sort_order?: number | null
                    created_at?: string | null
                }
            }
            portfolio_education: {
                Row: {
                    id: string
                    user_id: string | null
                    institution: string
                    degree: string
                    coursework: string | null
                    sort_order: number | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    institution: string
                    degree: string
                    coursework?: string | null
                    sort_order?: number | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    institution?: string
                    degree?: string
                    coursework?: string | null
                    sort_order?: number | null
                    created_at?: string | null
                }
            }
            portfolio_experience: {
                Row: {
                    id: string
                    user_id: string | null
                    role: string
                    company: string
                    duration: string
                    description: string | null
                    sort_order: number | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    role: string
                    company: string
                    duration: string
                    description?: string | null
                    sort_order?: number | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    role?: string
                    company?: string
                    duration?: string
                    description?: string | null
                    sort_order?: number | null
                    created_at?: string | null
                }
            }
        }
    }
}
