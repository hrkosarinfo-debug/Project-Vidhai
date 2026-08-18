@echo off
echo ==============================================
echo Synchronizing local AI folder with GitHub...
echo ==============================================

:: Navigate to the directory of the batch file
cd /d "%~dp0"

:: Fetch changes from GitHub
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" pull origin main

:: Stage all local changes (additions, modifications, deletions)
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" add -A

:: Commit changes with a timestamp
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" -c user.name="Bharath" -c user.email="bharath@example.com" commit -m "Auto-sync: %date% %time%"

:: Push changes to GitHub
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" push origin main

echo ==============================================
echo Synchronization complete!
echo ==============================================
pause
