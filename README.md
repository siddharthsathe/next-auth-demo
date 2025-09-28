# NextAuth.js with Role-Based Authorization

A Next.js application demonstrating authentication and authorization using NextAuth.js v5 with Google OAuth and role-based access control.

## What to Expect

### Authentication
- **Email & Password**: Traditional form-based authentication (currently disabled)
- **Google OAuth**: Social login using Google accounts
- **Session Management**: JWT-based sessions with automatic token refresh

### Role-Based Authorization
- **Two Roles**: `ADMIN` and `USER`
- **Admin Access**: Users with `admin@nextauth.com` email get admin privileges
- **User Access**: All other users get standard user privileges
- **Route Protection**: Admin routes (`/admin/*`) are protected by middleware

### How to Test
1. **Admin User**: Login with `admin@nextauth.com` and `password@365` → Access all admin routes
2. **Regular User**: Login with any other email → Blocked from admin routes
3. **Unauthenticated**: Redirected to sign-in page

## Step-by-Step Overview

### 1. User Logs In
- User visits `/signin` page
- Chooses Google OAuth or email/password (if enabled)
- Authentication request is sent to NextAuth.js

### 2. Auth.ts Callbacks Are Called

#### JWT Callback (`auth.ts` lines 51-79):
```typescript
async jwt({ token, account, user }) {
    if (account) {
        // Store OAuth tokens and metadata
        token.accessToken = account.access_token;
        token.expiresAt = account?.expires_at * 1000;
        
        // Role assignment based on email
        token.role = getUserRole(user?.email || '');
        // admin@nextauth.com → ADMIN
        // All others → USER
    }
    
    // Token expiration handling
    if (token.expiresAt && new Date().getTime() >= Number(token.expiresAt)) {
        token.error = AuthError.AccessTokenExpired;
    }
    
    return token;
}
```

#### Session Callback (`auth.ts` lines 81-91):
```typescript
async session({ session, token }) {
    return {
        ...session,
        user: {
            ...session?.user,
            role: token.role || UserRole.USER
        }
    };
}
```

### 3. Frontend Role-Based Display

#### Middleware Protection (`middleware.ts`):
- Runs on server before page loads
- Checks authentication status
- Validates admin role for `/admin/*` routes
- Redirects or blocks unauthorized access

#### Client-Side Components:
- `AuthLayout.tsx`: Handles token expiration and loading states
- Role utilities: `hasRole()`, `isAdmin()`, `isUser()`
- Conditional rendering based on user roles

## How to Run the App

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Google OAuth credentials (for Google login)

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Google OAuth (required for Google login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
6. Copy Client ID and Secret to `.env.local`

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5. Test the Application
1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Sign in" → Redirected to `/signin`
3. **Test Admin Access**:
   - Login with `admin@nextauth.com`
   - Navigate to `/admin/employees` → Should work
4. **Test User Access**:
   - Login with any other email
   - Navigate to `/admin/employees` → Should get 403 Forbidden

## Project Structure

```
├── app/
│   ├── admin/                 # Admin-only routes
│   ├── components/
│   │   ├── Layout/           # Auth layout components
│   │   └── Sidebar/          # Navigation sidebar
│   ├── signin/               # Sign-in page
│   └── types/                # TypeScript definitions
├── auth.ts                   # NextAuth.js configuration
├── middleware.ts             # Route protection middleware
└── app/utils/roles.ts        # Role checking utilities
```

## Key Features

- ✅ Google OAuth authentication
- ✅ JWT-based sessions
- ✅ Role-based authorization (Admin/User)
- ✅ Server-side route protection
- ✅ Client-side token expiration handling
- ✅ TypeScript support
- ✅ Responsive UI with Tailwind CSS
