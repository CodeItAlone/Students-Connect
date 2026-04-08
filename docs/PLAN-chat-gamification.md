# Phase 4: Chat & Gamification Implementation

Implementing the social and reward systems of Student Connect.

## User Review Required

> [!IMPORTANT]
> **Manual Badge Awarding**: Badges will be awarded **manually** by admins. This means I will implement an endpoint specifically for admins to grant badges to students.
> 
> **Points Logic**: Points are now hardcoded into the business logic:
> - 50 points: Joining a Club.
> - 20 points: RSVPing to an Event.
> - 100 points: Attending an Event.

## Proposed Changes

### 1. Data Models

#### [NEW] [ChatMessage.java](file:///c:/Users/SUBRATO%20KUNDU/Desktop/Student%20Connect/backend/src/main/java/com/studentconnect/model/ChatMessage.java)
- Entity for historical messages.
- Fields: `id`, `club` (ManyToOne), `sender` (ManyToOne), `content`, `timestamp`, `type` (TEXT).

#### [NEW] [Badge.java](file:///c:/Users/SUBRATO%20KUNDU/Desktop/Student%20Connect/backend/src/main/java/com/studentconnect/model/Badge.java)
- Entity for badges.
- Fields: `id`, `name`, `description`, `iconUrl`, `category`.

#### [NEW] [UserBadge.java](file:///c:/Users/SUBRATO%20KUNDU/Desktop/Student%20Connect/backend/src/main/java/com/studentconnect/model/UserBadge.java)
- Join table for users and their earned badges.

### 2. Repositories
- `ChatMessageRepository`: Paginated message retrieval for club history.
- `BadgeRepository`: CRUD for badges.
- `UserBadgeRepository`: Track user earnings.

### 3. Service Layer Implementation

#### [NEW] [ChatService.java](file:///c:/Users/SUBRATO%20KUNDU/Desktop/Student%20Connect/backend/src/main/java/com/studentconnect/service/ChatService.java)
- Handle WebSocket messages and save **immediately** to DB.
- Fetch chat history with pagination.

#### [NEW] [GamificationService.java](file:///c:/Users/SUBRATO%20KUNDU/Desktop/Student%20Connect/backend/src/main/java/com/studentconnect/service/GamificationService.java)
- `addPoints(user, type)`: Logic to increment user points based on action type.
- `awardBadge(studentId, badgeId, adminEmail)`: Admin restricted action.
- `getLeaderboard()`: Global aggregate results.

---

### 4. Controller Refactoring

#### [MODIFY] [ChatController.java](file:///c:/Users/SUBRATO%20KUNDU/Desktop/Student%20Connect/backend/src/main/java/com/studentconnect/controller/ChatController.java)
- Wire WebSocket mapping to `ChatService`.
- Add REST endpoint for loading history: `/api/clubs/{clubId}/history`.

#### [MODIFY] [GamificationController.java](file:///c:/Users/SUBRATO%20KUNDU/Desktop/Student%20Connect/backend/src/main/java/com/studentconnect/controller/GamificationController.java)
- Implement endpoints for leaderboard, badge list, and student point summaries.

---

## Verification Plan

### Automated Tests
- `mvn clean compile` to check mappings.

### Manual Verification
- **Chat**: Use WebSocket test client to send a message and verify it appears in the DB.
- **Points**: Join a club and verify that the user's `points` field in the `/api/user/me` response increases by 50.
- **Admin**: Attempt to award a badge as a regular student and verify it fails (403 Forbidden).
