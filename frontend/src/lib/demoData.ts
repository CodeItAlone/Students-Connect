import { Club, Event, Opportunity, Mentor, User } from '@/types';

// ==================== Demo Users ====================
const SYSTEM_ADMIN: User = {
    id: 1,
    email: 'admin@studentconnect.com',
    username: 'system_admin',
    fullName: 'System Administrator',
    role: 'ADMIN',
    points: 1000,
    badges: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

const MOCK_STUDENT: User = {
    id: 100,
    email: 'demo@studentconnect.com',
    username: 'demo_user',
    fullName: 'Demo Student',
    role: 'STUDENT',
    points: 250,
    badges: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// ==================== Demo Clubs ====================
export const DEMO_CLUBS: Club[] = [
    {
        id: 1,
        name: "CodeCraft Society",
        slug: "codecraft-society",
        category: "Technology",
        shortDescription: "Where coders become builders.",
        fullDescription: "A high-energy coding community for developers, builders, and problem solvers. We host weekly hack nights, open-source workshops, and technical seminars.",
        memberCount: 458,
        verified: true,
        isOpen: true,
        isJoined: true,
        tags: ["Web Dev", "DSA", "Open Source"],
        bannerUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
        logoUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=200",
        college: "Global Institute of Tech",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "AI Innovators Circle",
        slug: "ai-innovators-circle",
        category: "Artificial Intelligence",
        shortDescription: "Build with the future.",
        fullDescription: "A future-focused club for students interested in Machine Learning, Neural Networks, and AI Ethics. We build real-world AI projects and participate in international competitions.",
        memberCount: 312,
        verified: true,
        isOpen: true,
        isJoined: false,
        tags: ["AI", "ML", "Data Science"],
        bannerUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        logoUrl: "https://images.unsplash.com/photo-1555255707-c07966488bc0?auto=format&fit=crop&q=80&w=200",
        college: "Global Institute of Tech",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Career Launch Network",
        slug: "career-launch-network",
        category: "Career Development",
        shortDescription: "Your next opportunity starts here.",
        fullDescription: "Focused on bridging the gap between campus and corporate life. Mock interviews, resume reviews, and direct networking with HR professionals.",
        memberCount: 624,
        verified: true,
        isOpen: true,
        isJoined: true,
        tags: ["Networking", "Resumes", "Placements"],
        bannerUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000",
        logoUrl: "https://images.unsplash.com/photo-1454165833767-027ff33027ef?auto=format&fit=crop&q=80&w=200",
        college: "University of Business",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        name: "Startup Founders Hub",
        slug: "startup-founders-hub",
        category: "Entrepreneurship",
        shortDescription: "Ideas deserve execution.",
        fullDescription: "A builder community for entrepreneurs. We help you find co-founders, develop MVPs, and pitch your ideas to potential investors.",
        memberCount: 208,
        verified: true,
        isOpen: true,
        isJoined: false,
        tags: ["Startups", "Pitching", "Venture"],
        bannerUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000",
        logoUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200",
        college: "Nexus Innovation Center",
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        name: "Social Impact Alliance",
        slug: "social-impact-alliance",
        category: "Leadership",
        shortDescription: "Leadership through action.",
        fullDescription: "Creating positive social change through technology and volunteerism. We tackle local community problems with scalable technical solutions.",
        memberCount: 175,
        verified: true,
        isOpen: true,
        isJoined: true,
        tags: ["Volunteer", "NGO", "Sustainability"],
        bannerUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1000",
        logoUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200",
        college: "City Arts College",
        createdAt: new Date().toISOString()
    }
];

// ==================== Demo Events ====================
export const DEMO_EVENTS: Event[] = [
    {
        id: 1,
        title: "Hackathon 2026: The Future of Web",
        description: "48 hours of intense coding, networking, and innovation. Build the next generation of web applications.",
        type: "HACKATHON",
        mode: "HYBRID",
        location: "Tech Annex Hall & Zoom",
        startDate: "2026-05-15T09:00:00Z",
        endDate: "2026-05-17T18:00:00Z",
        maxParticipants: 200,
        currentParticipants: 145,
        isRsvped: true,
        tags: ["Web 3", "AI", "React"],
        bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
        club: DEMO_CLUBS[0],
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Resume & Portfolio Masterclass",
        description: "Learn how to stand out to FAANG recruiters with a perfect resume and portfolio website.",
        type: "WORKSHOP",
        mode: "ONLINE",
        location: "Discord Live",
        startDate: "2026-04-20T17:00:00Z",
        endDate: "2026-04-20T19:00:00Z",
        maxParticipants: 500,
        currentParticipants: 382,
        isRsvped: false,
        tags: ["Career", "FAANG", "Portfolio"],
        bannerUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000",
        club: DEMO_CLUBS[2],
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "AI Workshop: Prompt Engineering",
        description: "Hands-on session on advanced prompt engineering techniques for developers.",
        type: "WORKSHOP",
        mode: "OFFLINE",
        location: "Innovation Lab 4B",
        startDate: "2026-04-25T14:00:00Z",
        endDate: "2026-04-25T16:00:00Z",
        maxParticipants: 50,
        currentParticipants: 48,
        isRsvped: true,
        tags: ["AI", "OpenAI", "Prompting"],
        bannerUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        club: DEMO_CLUBS[1],
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: "Startup Demo Day: Pitch to Investors",
        description: "Finalists of our incubator program pitch their ideas to local venture capitalists.",
        type: "SEMINAR",
        mode: "OFFLINE",
        location: "Main Auditorium",
        startDate: "2026-05-01T10:00:00Z",
        endDate: "2026-05-01T15:00:00Z",
        maxParticipants: 300,
        currentParticipants: 210,
        isRsvped: false,
        tags: ["Pitch", "Venture", "Business"],
        bannerUrl: "https://images.unsplash.com/photo-1475721027185-403425f18706?auto=format&fit=crop&q=80&w=1000",
        club: DEMO_CLUBS[3],
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "UI/UX Design Sprint",
        description: "Rapidly prototype a mobile app solution for a real-world problem in this intensive sprint.",
        type: "WORKSHOP",
        mode: "HYBRID",
        location: "Design Studio & Figma",
        startDate: "2026-04-18T11:00:00Z",
        endDate: "2026-04-18T17:00:00Z",
        maxParticipants: 40,
        currentParticipants: 35,
        isRsvped: true,
        tags: ["Design", "Figma", "UI"],
        bannerUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
        club: DEMO_CLUBS[4],
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        title: "Alumni Meetup: Career Journeys",
        description: "Hear from our alumni working at top tech firms about their transition from university.",
        type: "MEETUP",
        mode: "ONLINE",
        location: "Zoom",
        startDate: "2026-04-28T18:30:00Z",
        endDate: "2026-04-28T20:00:00Z",
        maxParticipants: 1000,
        currentParticipants: 560,
        isRsvped: false,
        tags: ["Alumni", "Career", "Q&A"],
        bannerUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000",
        club: DEMO_CLUBS[2],
        createdAt: new Date().toISOString()
    }
];

// ==================== Demo Opportunities ====================
export const DEMO_OPPORTUNITIES: Opportunity[] = [
    {
        id: 1,
        title: "Frontend Engineering Intern",
        description: "Join the Google Cloud team to build next-generation interfaces for our developer platform.",
        type: "INTERNSHIP",
        company: "Google",
        location: "Mountain View, CA",
        isRemote: true,
        applicationUrl: "https://careers.google.com/internships",
        deadline: "2026-05-30T23:59:59Z",
        tags: ["React", "TypeScript", "Performance"],
        postedBy: SYSTEM_ADMIN,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Software Development Engineer (SDE) Intern",
        description: "Scale distributed systems and build highly available services for Millions of users.",
        type: "INTERNSHIP",
        company: "Amazon",
        location: "Seattle, WA",
        isRemote: false,
        applicationUrl: "https://amazon.jobs",
        deadline: "2026-06-15T23:59:59Z",
        tags: ["Java", "AWS", "Backend"],
        postedBy: SYSTEM_ADMIN,
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: "Campus Ambassador",
        description: "Represent Student Connect on your campus and help grow the student leadership community.",
        type: "VOLUNTEER",
        company: "Student Connect",
        location: "Your Campus",
        isRemote: true,
        applicationUrl: "https://students-connect.vercel.app/apply",
        deadline: "2026-04-30T23:59:59Z",
        tags: ["Leadership", "Marketing", "Community"],
        postedBy: SYSTEM_ADMIN,
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: "Machine Learning Research Assistant",
        description: "Collaborate on state-of-the-art NLP research focused on Large Language Models.",
        type: "RESEARCH",
        company: "University AI Lab",
        location: "On-Campus",
        isRemote: false,
        applicationUrl: "https://university.edu/research",
        deadline: "2026-05-10T23:59:59Z",
        tags: ["PyTorch", "NLP", "Research"],
        postedBy: SYSTEM_ADMIN,
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "Sustainable Planet Advocate",
        description: "Help lead environmental awareness campaigns and local sustainability projects.",
        type: "VOLUNTEER",
        company: "GreenEarth NGO",
        location: "Global",
        isRemote: true,
        applicationUrl: "https://greenearth.org/volunteer",
        deadline: "2026-07-01T23:59:59Z",
        tags: ["Environment", "Activism", "Impact"],
        postedBy: SYSTEM_ADMIN,
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        title: "Product Design Intern",
        description: "Design intuitive user journeys for our new mobile application reaching 50k+ students.",
        type: "INTERNSHIP",
        company: "DesignCo",
        location: "London, UK",
        isRemote: true,
        applicationUrl: "https://designco.com/careers",
        deadline: "2026-05-20T23:59:59Z",
        tags: ["Figma", "UI/UX", "Mobile"],
        postedBy: SYSTEM_ADMIN,
        createdAt: new Date().toISOString()
    }
];

// ==================== Demo Mentors ====================
export const DEMO_MENTORS: Mentor[] = [
    {
        id: 1,
        user: {
            ...SYSTEM_ADMIN,
            id: 201,
            fullName: "Sarah Chen",
            college: "Stanford Alumna",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            role: "MENTOR"
        },
        expertise: ["Cloud Architecture", "Career Growth", "React"],
        bio: "Senior Software Engineer at Meta with 8+ years of experience in building scalable cloud solutions.",
        availability: "Wednesdays & Fridays",
        rating: 4.9,
        totalSessions: 145,
        slots: []
    },
    {
        id: 2,
        user: {
            ...SYSTEM_ADMIN,
            id: 202,
            fullName: "Alex Rivera",
            college: "RISD Advisor",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            role: "MENTOR"
        },
        expertise: ["Product Design", "User Research", "Figma"],
        bio: "Senior Product Designer at Airbnb. I help students transition from art school to tech design.",
        availability: "Weekends Only",
        rating: 4.8,
        totalSessions: 92,
        slots: []
    },
    {
        id: 3,
        user: {
            ...SYSTEM_ADMIN,
            id: 203,
            fullName: "James Wilson",
            college: "MIT Research Fellow",
            avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
            role: "MENTOR"
        },
        expertise: ["Data Science", "PostgreSQL", "Python"],
        bio: "Data Scientist at Netflix. Obsessed with recommendation engines and large-scale data modeling.",
        availability: "Mondays & Thursdays",
        rating: 5.0,
        totalSessions: 230,
        slots: []
    },
    {
        id: 4,
        user: {
            ...SYSTEM_ADMIN,
            id: 204,
            fullName: "Elena Rodriguez",
            college: "Y-Combinator Alumni",
            avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
            role: "MENTOR"
        },
        expertise: ["Entrepreneurship", "Fundraising", "MVPs"],
        bio: "Founder of TechStart. I've raised $2M+ in seed funding and love helping campus founders launch.",
        availability: "Tuesdays morning",
        rating: 4.7,
        totalSessions: 54,
        slots: []
    },
    {
        id: 5,
        user: {
            ...SYSTEM_ADMIN,
            id: 205,
            fullName: "Michael Brown",
            college: "Talent Specialist",
            avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
            role: "MENTOR"
        },
        expertise: ["Resumes", "Interviews", "HR Strategy"],
        bio: "Technical Recruiter at Google. I've reviewed over 10,000 engineering resumes in the last 5 years.",
        availability: "Daily (Check slots)",
        rating: 4.9,
        totalSessions: 312,
        slots: []
    },
    {
        id: 6,
        user: {
            ...SYSTEM_ADMIN,
            id: 206,
            fullName: "David Park",
            college: "Vercel Core Contributor",
            avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
            role: "MENTOR"
        },
        expertise: ["Next.js", "Serverless", "Edge Computing"],
        bio: "Full Stack Engineer at Vercel. Expert in modern web architecture and performance optimization.",
        availability: "Saturdays",
        rating: 5.0,
        totalSessions: 110,
        slots: []
    }
];
