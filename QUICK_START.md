# Admin Login - Quick Start

## Default Credentials

✅ Admin account is already set up!

- **Username:** `admin`
- **Password:** `password`

## How to Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/login`

3. Enter the credentials above

4. **IMPORTANT**: After logging in, immediately change your password by:
   - Clicking on your profile (top right corner)
   - Selecting "Settings"
   - Updating your username and/or password

## Change Credentials

Once logged in, you can change your username and password from the Settings page:

1. Click on your profile icon (top right)
2. Click "Settings"
3. Update your username and/or password
4. You must provide your current password to change it

## Reset Admin Account

If you need to reset the admin account, you can:

### Option 1: Using MongoDB
```javascript
// Connect to MongoDB and run:
db.admins.deleteMany({})
```

Then run:
```bash
npm run init-admin
```

### Option 2: Direct API Call
```bash
curl -X POST http://localhost:3000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-new-password"}'
```

## Security Notes

- Always use strong passwords in production
- The JWT_SECRET in `.env.local` should be a strong random string
- Consider changing the default password immediately
