# AI Projects Hub

This repository is a centralized hub for all AI-related projects, including UI/UX design wireframes, software development projects, meeting minutes, daily reports, and operational notes.

## 📂 Repository Structure

- **`Projects/`**: Categorized business and technical projects.
  - **`AlMailem_Loyalty/`**: AlMailem Loyalty Program plans, observations, and deepseek mockups.
  - **`IT_Reports/`**: Daily logs, reports, and status updates.
  - **`Ooredoo/`**: Minutes of meetings, task statuses, and deepseek chat mockups.
  - **`Transport_Field/`**: Field visit reports and HTML templates.
- **`Setup_Guides/`**: Helpful guides on local setup, configurations, and environment installations.
- **`Videos/`** *(Local Only - Git Ignored)*: Large recordings of meetings and sync calls. (This folder contains files larger than 100MB which are excluded from GitHub to prevent upload limits).

---

## 🔄 How to Synchronize Your Folder with GitHub

We have configured a simple double-click sync script for you.

### Step 1: Initial Login (One-Time Setup)
To connect this folder with your GitHub account:
1. Open your Windows **PowerShell** or **Command Prompt**.
2. Type `gh auth login` and press **Enter**.
3. Follow the prompts:
   - Select **GitHub.com**
   - Select **HTTPS**
   - Authenticate with your GitHub credentials (choose **Login with a web browser**).
   - Copy the one-time code shown in terminal, press Enter to open your browser, paste the code, and click **Authorize**.

### Step 2: Double-Click Sync
To sync any changes (edits, new files, deleted files) to GitHub:
1. Double-click the **`sync.bat`** file located in the root of the `AI` folder.
2. It will automatically download changes from GitHub (`git pull`), stage your local edits (`git add`), commit them (`git commit`), and upload them to GitHub (`git push`).

---

## 🛠️ Common Operations Guide

### 1. Adding New Files / Folders
* Put the new files or folders anywhere inside the `AI` directory (e.g., inside `Projects/Ooredoo`).
* Double-click `sync.bat` to publish them to GitHub.

### 2. Editing Existing Files
* Open any file, make your changes, and save it.
* Double-click `sync.bat` to push the updates.

### 3. Renaming Folders
* Rename the folder locally in Windows Explorer.
* Double-click `sync.bat` to update the structure on GitHub.

### 4. Deleting Files
* Delete the file or folder locally.
* Double-click `sync.bat`. Git will register the deletion and remove it from GitHub.

---

## ⚡ Handling Merge Conflicts

If you edit the same file on the GitHub web interface and your local computer without syncing first, you might get a **Merge Conflict** when running `sync.bat`.

### How to resolve it:
1. Open the conflicted file in a text editor (e.g. Notepad).
2. Look for conflict markers like this:
   ```text
   <<<<<<< HEAD
   This is your local change.
   =======
   This is the change someone made on the GitHub website.
   >>>>>>> main
   ```
3. Edit the file to delete the markers (`<<<<<<<`, `=======`, `>>>>>>>`) and keep the correct version of the text.
4. Save the file and double-click `sync.bat` again to complete the sync!
