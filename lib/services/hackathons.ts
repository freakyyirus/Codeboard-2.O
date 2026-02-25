export interface Hackathon {
    id: string
    title: string
    host: string
    platforms: string[]
    startDate: string
    endDate: string
    image: string
    url: string
    prize: string
    mode: "Online" | "Offline" | "Hybrid"
    status: "Upcoming" | "Live" | "Ended"
}

export async function getHackathons(): Promise<Hackathon[]> {
    // Mock data for Hackathons since no public API aggregates these easily without scraping
    return [
        {
            id: "1",
            title: "HackFit: AI Edition",
            host: "Devfolio",
            platforms: ["devfolio.co"],
            startDate: new Date(Date.now() + 86400000 * 2).toISOString(),
            endDate: new Date(Date.now() + 86400000 * 4).toISOString(),
            image: "https://assets.devfolio.co/hackathons/d2e152245d8146898efc54230eef01f3/assets/cover/332.png",
            url: "https://hackfit.devfolio.co",
            prize: "$10,000",
            mode: "Online",
            status: "Upcoming"
        },
        {
            id: "2",
            title: "Unstop Talent Awards 2024",
            host: "Unstop",
            platforms: ["unstop.com"],
            startDate: new Date(Date.now() + 86400000 * 5).toISOString(),
            endDate: new Date(Date.now() + 86400000 * 10).toISOString(),
            image: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/awards/uta-2024/uta-meta-image.png",
            url: "https://unstop.com/awards",
            prize: "₹5,00,000",
            mode: "Hybrid",
            status: "Upcoming"
        },
        {
            id: "3",
            title: "Global AI Hackathon",
            host: "Devpost",
            platforms: ["devpost.com"],
            startDate: new Date(Date.now() - 86400000).toISOString(),
            endDate: new Date(Date.now() + 86400000 * 3).toISOString(),
            image: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/002/750/502/datas/full_width.png",
            url: "https://globalai.devpost.com",
            prize: "$50,000",
            mode: "Online",
            status: "Live"
        },
        {
            id: "4",
            title: "Smart India Hackathon 2024",
            host: "Government of India",
            platforms: ["sih.gov.in"],
            startDate: new Date(Date.now() + 86400000 * 30).toISOString(),
            endDate: new Date(Date.now() + 86400000 * 32).toISOString(),
            image: "https://sih.gov.in/img/sih2023-logo.png",
            url: "https://sih.gov.in",
            prize: "₹1,00,000",
            mode: "Offline",
            status: "Upcoming"
        }
    ]
}
