# How to Run the Mental Health Support Application

## PowerShell Execution Policy Issue

If you see an error like:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

You have **3 options**:

### Option 1: Use Command Prompt (Easiest)
1. Open **Command Prompt** (cmd.exe) instead of PowerShell
2. Navigate to the project:
   ```cmd
   cd "C:\Users\sande\OneDrive\Desktop\New Folder\mental-health-support"
   ```
3. Run the app:
   ```cmd
   npm run dev
   ```

### Option 2: Change PowerShell Execution Policy (Requires Admin)
1. Open PowerShell **as Administrator**
2. Run:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Close and reopen PowerShell
4. Navigate to the project and run `npm run dev`

### Option 3: Bypass Policy for Single Command
Run this in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -Command "cd 'C:\Users\sande\OneDrive\Desktop\New Folder\mental-health-support'; npm run dev"
```

## Normal Usage

Once you can run npm commands:

1. **Navigate to the project directory:**
   ```cmd
   cd "C:\Users\sande\OneDrive\Desktop\New Folder\mental-health-support"
   ```

2. **Install dependencies (if needed):**
   ```cmd
   npm install
   ```

3. **Start the development server:**
   ```cmd
   npm run dev
   ```

4. **Open your browser** and go to the URL shown in the terminal (usually `http://localhost:5173`)

## New Features Added

✅ **Separate Login Columns**: Login page now has separate columns for Student and Admin login
✅ **Admin Registration**: You can now register as an Admin from the Register page
✅ **Resource Management**: Admins can add and delete resources from the Admin Dashboard
✅ **Admin Dashboard**: Full admin dashboard similar to student dashboard for managing the platform

## Test Accounts

**Student:**
- Email: `alex@campus.edu`
- Password: `student123`

**Admin:**
- Email: `admin@campus.edu`
- Password: `admin123`

Or register a new account with either role!


