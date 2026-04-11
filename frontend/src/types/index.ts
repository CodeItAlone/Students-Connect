// ==================== User & Auth ====================
export interface User {
    id: number;
    email: string;
    username: string;
    fullName: string;
    avatarUrl?: string;
    bio?: string;
    college?: string;
    department?: string;
    year?: number;
    role: 'STUDENT' | 'CLUB_LEADER' | 'ADMIN' | 'MENTOR';
    points: number;
    badges: Badge[];
    createdAt: string;
    updatedAt: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    fullName: string;
    username: string;
    college?: string;
    department?: string;
    year?: number;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

// ==================== Club ====================
export interface Club {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    websiteUrl?: string;
    isOpen: boolean;
    bannerUrl?: string;
    logoUrl?: string;
    category: string;
    college: string;
    memberCount: number;
    verified: boolean;
    isJoined?: boolean;
    leaderName?: string;
    leader?: User;
    tags: string[];
    createdAt: string;
}

export interface ClubMember {
    id: number;
    user: User;
    role: 'MEMBER' | 'MODERATOR' | 'LEADER';
    joinedAt: string;
}

// ==================== Event ====================
export interface Event {
    id: number;
    title: string;
    description: string;
    bannerUrl?: string;
    type: 'WORKSHOP' | 'HACKATHON' | 'SEMINAR' | 'MEETUP' | 'COMPETITION' | 'OTHER';
    mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
    location?: string;
    startDate: string;
    endDate: string;
    registrationDeadline?: string;
    maxParticipants?: number;
    currentParticipants: number;
    club?: Club;
    isRsvped?: boolean;
    tags: string[];
    createdAt: string;
}

// ==================== Opportunity ====================
export interface Opportunity {
    id: number;
    title: string;
    description: string;
    type: 'INTERNSHIP' | 'JOB' | 'RESEARCH' | 'VOLUNTEER' | 'OTHER';
    company?: string;
    location?: string;
    isRemote: boolean;
    applicationUrl?: string;
    deadline?: string;
    postedBy: User;
    tags: string[];
    createdAt: string;
}

// ==================== Mentor ====================
export interface Mentor {
    id: number;
    user: User;
    expertise: string[];
    bio: string;
    availability: string;
    rating: number;
    totalSessions: number;
    slots: MentorSlot[];
}

export interface MentorSlot {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

export interface MentorBooking {
    id: number;
    mentor: Mentor;
    student: User;
    slot: MentorSlot;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    topic: string;
    createdAt: string;
}

// ==================== Chat ====================
export interface ChatMessage {
    id: number;
    clubId: number;
    sender: User;
    content: string;
    timestamp: string;
    type: 'TEXT' | 'IMAGE' | 'SYSTEM';
}

// ==================== Gamification ====================
export interface Badge {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
    category: string;
    earnedAt?: string;
}

export interface LeaderboardEntry {
    rank: number;
    userId: number;
    fullName: string;
    avatarUrl?: string;
    points: number;
    badges: number;
}

// ==================== Notification ====================
export interface Notification {
    id: number;
    type: 'EVENT' | 'CLUB' | 'MENTION' | 'BADGE' | 'SYSTEM';
    title: string;
    message: string;
    link?: string;
    isRead: boolean;
    createdAt: string;
}

export interface DashboardStats {
    activeClubs: number;
    upcomingEvents: number;
    studentsConnected: number;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
    hasNext: boolean;
}
