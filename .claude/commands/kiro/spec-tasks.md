---
description: Generate implementation tasks for a specification
allowed-tools: Bash, Read, Write, Edit, Update, MultiEdit
---

# Implementation Tasks

Generate detailed implementation tasks for feature: **$ARGUMENTS**

## Interactive Approval: Requirements & Design Review

**CRITICAL**: Tasks can only be generated after both requirements and design are reviewed and approved.

### Interactive Review Process

- Requirements document: @.kiro/specs/$ARGUMENTS/requirements.md
- Design document: @.kiro/specs/$ARGUMENTS/design.md
- Spec metadata: @.kiro/specs/$ARGUMENTS/spec.json

**Interactive Approval Process**:

1. **Check if documents exist** - Verify that requirements.md and design.md have been generated
2. **Prompt for requirements review** - Ask user: "requirements.mdをレビューしましたか？ [y/N]"
3. **Prompt for design review** - Ask user: "design.mdをレビューしましたか？ [y/N]"
4. **If both 'y' (yes)**: Automatically update spec.json to approve both phases and proceed with tasks generation
5. **If any 'N' (no)**: Stop execution and instruct user to review respective documents first

**Auto-approval update in spec.json when user confirms both reviews**:

```json
{
  "approvals": {
    "requirements": {
      "generated": true,
      "approved": true  // ← Automatically set to true when user confirms
    },
    "design": {
      "generated": true,
      "approved": true  // ← Automatically set to true when user confirms
    }
  },
  "phase": "design-approved"
}
```

**User Interaction Example**:

```
📋 Requirements and Design review required before generating tasks.
📄 Please review: .kiro/specs/feature-name/requirements.md
❓ requirements.mdをレビューしましたか？ [y/N]: y
📄 Please review: .kiro/specs/feature-name/design.md
❓ design.mdをレビューしましたか？ [y/N]: y
✅ Requirements and Design approved automatically. Proceeding with tasks generation...
```

## Context Analysis

### Complete Spec Context (APPROVED)

- Requirements: @.kiro/specs/$ARGUMENTS/requirements.md
- Design: @.kiro/specs/$ARGUMENTS/design.md
- Current tasks: @.kiro/specs/$ARGUMENTS/tasks.md
- Spec metadata: @.kiro/specs/$ARGUMENTS/spec.json

### Steering Context

- Architecture patterns: @.kiro/steering/structure.md
- Development practices: @.kiro/steering/tech.md
- Product constraints: @.kiro/steering/product.md

## Task: Generate Code-Generation Prompts

**Prerequisites Verified**: Both requirements and design are approved and ready for task breakdown.

**CRITICAL**: Convert the feature design into a series of prompts for a code-generation LLM that will implement each step in a test-driven manner. Prioritize best practices, incremental progress, and early testing, ensuring no big jumps in complexity at any stage.

Create implementation plan in the language specified in spec.json:

### 1. Code-Generation Tasks Structure

Create tasks.md in the language specified in spec.json (check `@.kiro/specs/$ARGUMENTS/spec.json` for "language" field):

```markdown
# Implementation Plan (Parallel Development Friendly)

## Phase 1: Foundation & Contracts (Prerequisites)

- [ ] 1.1 Create project structure and API contracts
  - Create directory structure for both frontend and backend
  - Define TypeScript interfaces for all API endpoints and data models
  - Create OpenAPI/Swagger specification file
  - Set up shared types package for frontend-backend consistency
  - _Requirements: 1.1_ | **Parallel Ready**: Both teams can work simultaneously after this

- [ ] 1.2 Set up testing frameworks and mock servers
  - Configure backend testing framework (Jest/Vitest)
  - Configure frontend testing framework (Jest/Vitest + Testing Library)
  - Set up API mock server for frontend development (MSW/JSON Server)
  - Create shared test utilities and data fixtures
  - _Requirements: 1.1_ | **Parallel Ready**: Independent testing environments

## Phase 2: Backend Track (Server-Side Development)

### Backend Track A: Data Layer
- [ ] 2A.1 Implement data models with validation
  - Write tests for User model with validation rules
  - Implement User class with email validation and password hashing
  - Write tests for [Domain] model with business rules
  - Implement [Domain] class with validation and relationships
  - _Requirements: 2.1, 2.2, 2.3_ | **Independent**: No frontend dependency

- [ ] 2A.2 Create data access layer
  - Write tests for database connection utilities
  - Implement connection utilities with error handling
  - Write repository tests for CRUD operations
  - Implement User and [Domain] repositories
  - _Requirements: 3.1, 3.2, 3.3_ | **Independent**: No frontend dependency

### Backend Track B: API Layer
- [ ] 2B.1 Implement authentication services
  - Write API tests for authentication flows
  - Build AuthService with JWT token generation
  - Create auth endpoints (login, register, refresh)
  - Implement authentication middleware
  - _Requirements: 4.1, 4.2_ | **Independent**: Uses API contracts from 1.1

- [ ] 2B.2 Implement core API endpoints
  - Write API tests for domain operations
  - Code [Domain]Service with business logic
  - Create REST endpoints with validation
  - Implement rate limiting and error handling
  - _Requirements: 4.3, 4.4_ | **Independent**: Uses API contracts from 1.1

## Phase 2: Frontend Track (Client-Side Development)

### Frontend Track A: Component Foundation
- [ ] 2C.1 Build foundational UI components
  - Write component tests for reusable elements
  - Create design system components (Button, Input, Form, Card)
  - Implement theme provider and styling utilities
  - Test component rendering and user interactions
  - _Requirements: 5.1_ | **Independent**: Uses mock data

- [ ] 2C.2 Create state management and API layer
  - Set up state management solution (Zustand/Redux Toolkit)
  - Create API client using contracts from Phase 1
  - Implement error handling and loading states
  - Write tests for state management logic
  - _Requirements: 5.1_ | **Independent**: Uses API mocks

### Frontend Track B: Feature Components
- [ ] 2D.1 Implement authentication components
  - Write tests for auth component behavior
  - Code LoginForm and RegisterForm components
  - Implement client-side validation
  - Connect to API client with loading/error states
  - _Requirements: 5.2, 5.3_ | **Independent**: Uses API mocks until backend ready

- [ ] 2D.2 Build main feature components
  - Write tests for domain component interactions
  - Implement [Domain]List and [Domain]Form components
  - Add CRUD operations with optimistic updates
  - Handle pagination, filtering, and sorting
  - _Requirements: 5.4, 5.5_ | **Independent**: Uses API mocks until backend ready

## Phase 3: Integration & Testing (Convergence)

- [ ] 3.1 Backend-Frontend integration
  - Replace API mocks with real backend endpoints
  - Run integration tests against live backend
  - Fix any contract mismatches between frontend and backend
  - Verify authentication flow works end-to-end
  - _Requirements: 6.1_ | **Convergence**: Both tracks merge here

- [ ] 3.2 Application wiring and routing
  - Implement application routing and navigation
  - Set up authentication guards for protected routes
  - Add global error handling and loading states
  - Configure production build and optimization
  - _Requirements: 6.1_ | **Convergence**: Final integration step

- [ ] 3.3 End-to-end testing and verification
  - Write E2E tests covering complete user workflows
  - Test authentication flow: register → login → logout
  - Test main feature workflows with real data
  - Run performance tests and optimize bottlenecks
  - _Requirements: 6.2_ | **Convergence**: Complete system verification

## Parallel Development Guidelines

### Independence Markers
- **Independent**: Can be developed without waiting for other track
- **Parallel Ready**: Enables both tracks to work simultaneously
- **Convergence**: Requires coordination between tracks

### Communication Points
1. **Phase 1 Complete**: Both tracks can begin parallel development
2. **API Contract Changes**: Must communicate changes to both tracks
3. **Phase 3 Start**: Coordination required for integration testing

### Mock-to-Real Transition
- Frontend uses API mocks during Phase 2
- Backend implements real endpoints during Phase 2
- Phase 3 replaces mocks with real backend connections
```

**Code-Generation Prompt Format Rules**:

- Hierarchical numbering: Major phases (1, 2, 3) and sub-tasks (1.1, 1.2)
- Each task is a prompt for a code-generation LLM that will implement the step
- Specify what to create/modify but rely on design document for implementation details
- Build incrementally: each task explicitly references outputs from previous tasks
- Start with tests when appropriate (test-driven development)
- Each task explains how it connects to subsequent tasks
- End with specific requirement mapping: _Requirements: X.X, Y.Y_
- Focus ONLY on writing, modifying, or testing code
- Tasks should be completable in 1-3 hours each
- Final task must wire everything together to prevent orphaned code

### 2. Code-Generation Quality Guidelines

- **Prompt Optimization**: Each task is a clear prompt that a coding agent can execute
- **Progressive Building**: Explicitly state which previous task outputs are used
- **Test-First Approach**: Write tests before implementation when appropriate
- **Forward References**: Explain how current task output will be used later
- **Requirements Traceability**: Map to specific EARS requirements from requirements.md
- **Integration Focus**: Final tasks must wire all components together
- **Coding-Only Focus**: Exclude deployment, user testing, or non-coding activities
- **Design Document Reliance**: Tasks reference design for implementation details

### 3. Mandatory Task Categories (Coding Only)

Include ONLY coding tasks for:

- **Data Models**: Model classes with validation and tests
- **Data Access**: Repository pattern implementation with tests
- **API Services**: Backend service implementation with API tests
- **UI Components**: Frontend component development with component tests
- **Integration**: Code integration and automated testing
- **End-to-End Testing**: Automated test implementation

**EXCLUDED (Non-Coding Tasks):**

- User acceptance testing or user feedback gathering
- Production deployment or staging environments
- Performance metrics gathering or analysis
- CI/CD pipeline setup or configuration
- Documentation creation (beyond code comments)

### 4. Granular Requirements Mapping

For each task, reference specific EARS requirements from requirements.md:

- Reference granular sub-requirements, not just user stories
- Map to specific acceptance criteria (e.g., REQ-2.1.3: IF validation fails THEN...)
- Ensure every EARS requirement is covered by implementation tasks
- Use format: _Requirements: 2.1, 3.3, 1.2_ (refer to numbered requirements)

### 6. Document Generation Only

Generate the tasks document content ONLY. Do not include any review or approval instructions in the actual document file.

### 7. Update Metadata

Update spec.json with:

```json
{
  "phase": "tasks-generated",
  "approvals": {
    "requirements": {
      "generated": true,
      "approved": true
    },
    "design": {
      "generated": true,
      "approved": true
    },
    "tasks": {
      "generated": true,
      "approved": false
    }
  },
  "updated_at": "current_timestamp"
}
```

### 8. Metadata Update

Update the tracking metadata to reflect task generation completion.

---

## INTERACTIVE APPROVAL IMPLEMENTED (Not included in document)

The following is for Claude Code conversation only - NOT for the generated document:

### Interactive Approval Process

This command now implements interactive approval for the final phase:

1. **Requirements & Design Review Prompts**: Automatically prompts user to confirm both documents are reviewed
2. **Auto-approval**: Updates spec.json automatically when user confirms both with 'y'
3. **Tasks Generation**: Proceeds immediately after dual approval
4. **Ready for Implementation**: Tasks are generated and spec is ready for implementation phase

### Tasks Review for Implementation Phase

After generating tasks.md, the implementation phase is ready to begin.

**Final approval process for implementation**:

```
📋 Tasks review completed. Ready for implementation.
📄 Generated: .kiro/specs/feature-name/tasks.md
✅ All phases approved. Implementation can now begin.
```

### Review Checklist (for user reference)

- [ ] Tasks are properly sized (2-4 hours each)
- [ ] All requirements are covered by tasks
- [ ] Task dependencies are correct
- [ ] Technology choices match the design
- [ ] Testing tasks are included

## Instructions

1. **Check spec.json for language** - Use the language specified in the metadata
2. **Convert design into code-generation prompts** - Each task must be a specific coding instruction
3. **Apply test-driven approach** - Integrate testing into each development task
4. **Specify exact files and components** - Define what code to write/modify in which files
5. **Build incrementally** - Each task uses outputs from previous tasks, no orphaned code
6. **Map to granular requirements** - Reference specific EARS acceptance criteria
7. **Focus on coding only** - Exclude deployment, user testing, performance analysis
8. **Order by dependencies** - Ensure logical build sequence
9. **Update tracking metadata** upon completion

Generate code-generation prompts that provide step-by-step implementation instructions for a coding agent.
ultrathink
