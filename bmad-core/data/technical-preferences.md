# User-Defined Preferred Patterns and Preferences

## Preferred Technologies

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Next.js for full-stack applications

### Backend  
- Node.js with Express
- Redis for caching
- Firebase Local Emulator Suite

### Deployment
- Google Cloud Platform, Firebase hosting + Cloud Functions + Firestore
```text

**Design Patterns & Standards:**
```markdown
## Code Standards
- Use functional programming patterns where possible
- Prefer composition over inheritance
- Always include comprehensive error handling
- Write tests for all business logic

## Architecture Preferences
- Microservices for complex applications
- RESTful APIs with OpenAPI documentation
- Event-driven architecture for real-time features
- Use OpenAI Agents SDK
- Use latest OpenAI API, The Chat Completions API, not the deprecated completions API

## Preferred External Services
- Auth0 for authentication
- Stripe for payments
- SendGrid for email
- Cloudinary for image processing

## APIs to Avoid
- Legacy SOAP services
- Services without proper documentation
```text

#### How Agents Use This File

**Automatic Suggestions**: Agents will suggest your preferred technologies when appropriate for the project requirements.

**Informed Alternatives**: If your preferences don't fit the project, agents explain why and suggest alternatives.

**Consistency**: All agents reference the same preferences, ensuring consistent recommendations across planning and development.

#### Building Your Preferences Over Time

**Learning and Evolution**: As you work on projects, add discoveries to your preferences file:

```markdown
## Lessons Learned
- Avoid using Library X for large datasets (performance issues)
- Pattern Y works well for real-time features
- Service Z has excellent documentation and support

## Future Exploration
- Want to try Framework A on next appropriate project
- Interested in Pattern B for microservices
- Consider Service C for better performance
