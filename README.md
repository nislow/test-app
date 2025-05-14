# School Pickup App

A Next.js application for managing school pickups.

## Deployment Instructions

### Deploying to Render.com

1. Create an account on [Render](https://render.com/)
2. Click on "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: school-pickup-app (or your preferred name)
   - Environment: Node
   - Build Command: `./render-build.sh`
   - Start Command: `npm start`
   - Select the appropriate instance type (Free tier works for testing)

5. Add the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random string for JWT authentication

### Database Setup

For production, you need a PostgreSQL database. Options include:

- [Render Postgres](https://render.com/docs/databases)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

After setting up your database, update the `DATABASE_URL` environment variable in your deployment settings.

### Important Notes

- Make sure your PostgreSQL database is accessible from your deployed application
- Set up proper authentication and security for your database
- Consider using connection pooling for production environments
- The application uses Prisma for database management, which requires running migrations in production 