@echo off
echo ==============================================
echo Synchronizing Kosar Infotech website with GitHub...
echo ==============================================

:: Navigate to the directory of the batch file
cd /d "%~dp0"

:: Fetch latest remote changes
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" pull origin main

:: Stage all updates
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" add -A

:: Commit changes with local timestamp
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" -c user.name="Bharath" -c user.email="bharath@example.com" commit -m "Auto-sync: %date% %time%"

:: Upload changes to GitHub
"C:\Users\DELL\Downloads\Git_Setup\PortableGit\cmd\git.exe" push origin main

echo ==============================================
echo Synchronization complete!
echo ==============================================
pause
