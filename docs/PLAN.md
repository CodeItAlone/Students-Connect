# PLAN: Platform Hardening & Quality Assurance

This plan covers the simultaneous execution of Security, Testing, and Database Migrations.

## ORCHESTRATION MODE: 3+ AGENTS
- **Security-Auditor**: Secret Hardening & Environment Variables.
- **Test-Engineer**: Phase 5 (Automated Unit Tests).
- **Database-Architect**: Phase 6 (Flyway Migrations).

---

## Phase 1: Foundation (Security & Migrations)

### 1. Secret Hardening (`security-auditor`)
- Identify all secrets in `application.properties`.
- Replace hardcoded values with `${ENV_VAR:DEFAULT}` placeholders.
- Create a `.env.template` for deployments.

### 2. Database Migrations (`database-architect`)
- Add `flyway-core` to `pom.xml`.
- Create the initial V1 migration script based on the current entity structure.
- Update `spring.jpa.hibernate.ddl-auto` to `validate`.

---

## Phase 2: Quality Assurance (Testing)

### 3. Automated Unit Tests (`test-engineer`)
- Target Services: `AuthService`, `ClubService`, `EventService`.
- Goal: 70%+ coverage on core business logic.
- Verify RSVPs, role-based access, and point awarding.

---

## Phase 3: Deployment Verification (`devops-engineer`)
- Run `mvn test` to verify logic.
- Run `mvn spring-boot:run` to verify Flyway migrations.
- Run `npm run build` for final frontend verification.

---

## Deliverables
- [ ] Hardened `application.properties`
- [ ] Flyway migration scripts in `db/migration`
- [ ] Comprehensive test suite in `src/test`
- [ ] Clean security audit (`security_scan.py`)

---

**Do you approve of this plan?**
- **Y**: Start Implementation (Phase 2 Orchestration)
- **N**: Modify details
