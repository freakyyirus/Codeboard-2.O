const fs = require("fs");
const path = require("path");

const DATA_DIR = "c:\\32GB\\Real Projects\\CodeBoard 2.O\\leetcode-data";
const OUT_FILE = "c:\\32GB\\Real Projects\\CodeBoard 2.O\\codeboard\\data\\leetcode-questions.json";

// Top companies to prioritize (will still include all)
const TOP_COMPANIES = new Set([
    "Google", "Amazon", "Meta", "Microsoft", "Apple", "Netflix", "Adobe",
    "Bloomberg", "Goldman Sachs", "Uber", "Airbnb", "LinkedIn", "ByteDance",
    "TikTok", "Salesforce", "Oracle", "Cisco", "Intel", "Nvidia", "Tesla",
    "Stripe", "Snap", "Spotify", "DoorDash", "Robinhood", "Coinbase",
    "PayPal", "Walmart Labs", "J.P. Morgan", "Morgan Stanley", "DE Shaw",
    "Atlassian", "Shopify", "Databricks", "Snowflake", "Palantir Technologies",
    "Intuit", "ServiceNow", "Flipkart", "Swiggy", "Zomato", "PhonePe",
    "Razorpay", "Infosys", "Wipro", "TCS"
]);

function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
        } else if (ch === "," && !inQuotes) {
            result.push(current.trim());
            current = "";
        } else {
            current += ch;
        }
    }
    result.push(current.trim());
    return result;
}

function processCompanyCSV(companyDir, companyName) {
    // Prefer "5. All.csv", fallback to others
    const csvPriority = [
        "5. All.csv",
        "4. More Than Six Months.csv",
        "3. Six Months.csv",
        "2. Three Months.csv",
        "1. Thirty Days.csv",
    ];

    let csvFile = null;
    for (const f of csvPriority) {
        const p = path.join(companyDir, f);
        if (fs.existsSync(p)) {
            csvFile = p;
            break;
        }
    }
    if (!csvFile) return [];

    const content = fs.readFileSync(csvFile, "utf8");
    const lines = content.split("\n").filter((l) => l.trim());
    if (lines.length <= 1) return [];

    // Skip header
    const questions = [];
    for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVLine(lines[i]);
        if (cols.length < 5) continue;

        const [difficulty, title, frequency, acceptance, link, ...topicParts] = cols;
        const topics = topicParts.join(", ").replace(/"/g, "").trim();

        if (!title || !link) continue;

        questions.push({
            title: title.replace(/"/g, ""),
            difficulty: difficulty.toUpperCase(),
            frequency: parseFloat(frequency) || 0,
            acceptance: acceptance.replace(/"/g, ""),
            link: link.replace(/"/g, ""),
            topics: topics
                ? topics.split(",").map((t) => t.trim()).filter(Boolean)
                : [],
        });
    }
    return questions;
}

// Main
console.log("Scanning companies...");

const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true });
const companyDirs = entries
    .filter((e) => e.isDirectory() && e.name !== ".git")
    .map((e) => e.name);

console.log(`Found ${companyDirs.length} companies`);

// Deduplicate questions across companies, tracking which companies ask each
const questionMap = new Map(); // key = link, value = question object

let totalProcessed = 0;

for (const company of companyDirs) {
    const dirPath = path.join(DATA_DIR, company);
    const questions = processCompanyCSV(dirPath, company);

    for (const q of questions) {
        const key = q.link;
        if (questionMap.has(key)) {
            const existing = questionMap.get(key);
            if (!existing.companies.includes(company)) {
                existing.companies.push(company);
            }
            // Keep highest frequency
            if (q.frequency > existing.frequency) {
                existing.frequency = q.frequency;
            }
        } else {
            questionMap.set(key, {
                ...q,
                companies: [company],
            });
        }
    }
    totalProcessed += questions.length;
}

// Convert to array and sort by number of companies (most asked first)
const allQuestions = Array.from(questionMap.values())
    .sort((a, b) => b.companies.length - a.companies.length || b.frequency - a.frequency);

// Get unique company list sorted by question count
const companyStats = {};
for (const q of allQuestions) {
    for (const c of q.companies) {
        companyStats[c] = (companyStats[c] || 0) + 1;
    }
}
const companiesSorted = Object.entries(companyStats)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, isTop: TOP_COMPANIES.has(name) }));

const output = {
    meta: {
        totalQuestions: allQuestions.length,
        totalCompanies: companiesSorted.length,
        totalEntries: totalProcessed,
        generatedAt: new Date().toISOString(),
        source: "github.com/liquidslr/leetcode-company-wise-problems",
    },
    companies: companiesSorted.slice(0, 100), // Top 100 companies
    questions: allQuestions,
};

// Ensure output dir exists
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 0)); // compact JSON

const sizeKB = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`\n✅ Done!`);
console.log(`   Questions: ${allQuestions.length} unique`);
console.log(`   Companies: ${companiesSorted.length}`);
console.log(`   Entries processed: ${totalProcessed}`);
console.log(`   Output: ${OUT_FILE} (${sizeKB} KB)`);
console.log(`   Top 5: ${companiesSorted.slice(0, 5).map(c => `${c.name}(${c.count})`).join(", ")}`);
