# Unified AI Platform

A centralized, AI-powered master platform designed to integrate with multiple leading AI models (OpenAI, Anthropic, Gemini, Stable Diffusion, etc.) and consolidate diverse workflow categories under a single interface.

## 📂 Project Structure

- **`frontend/`**: Next.js (React) application for the primary user interface.
- **`backend/`**: FastAPI (Python) backend orchestrator and model routing gateway.
- **`config/`**: Configuration files and environment templates.
- **`docs/`**: Strategic roadmap, system design documentation, and setup files.

---

## ⚡ Setup & Local Development

### 1. Frontend (Next.js)
1. Navigate to the `frontend/` directory.
2. Run `npm install` to install node dependencies.
3. Run `npm run dev` to start the frontend development server at `http://localhost:3000`.

### 2. Backend (FastAPI)
1. Navigate to the `backend/` directory.
2. (Optional) Create a python virtual environment: `python -m venv venv` and activate it.
3. Install Python requirements: `pip install -r requirements.txt`.
4. Run the API server: `uvicorn main:app --reload` at `http://localhost:8000`.

---

## 🔄 Bidirectional GitHub Sync

We have configured a double-click sync script (`sync.bat`) to keep your local desktop workspace synchronized with your GitHub repository.

### Initial GitHub Login Setup:
1. Open Windows **PowerShell** or **Command Prompt**.
2. Run `gh auth login` and complete the browser verification:
   * Select **GitHub.com**
   * Select **HTTPS**
   * Select **Login with a web browser** (copy the code and paste it in the browser window).

### Running Sync:
* To download changes from GitHub and push your local edits, simply **double-click the `sync.bat` file** in the root folder.

---

## 🛠️ Operations Guide & Merge Conflicts

### Common Operations
* **Add new files**: Add them directly to the `frontend/` or `backend/` directories, then run `sync.bat`.
* **Delete files**: Remove them locally and run `sync.bat`.
* **Rename folders**: Rename them locally and run `sync.bat`.

### Handling Merge Conflicts
If you edit the same file on GitHub and locally without running `sync.bat` first, Git might flag a conflict. To resolve it:
1. Open the conflicted file in a text editor.
2. Locate the conflict markers:
   ```text
   <<<<<<< HEAD
   [Your local changes]
   =======
   [Changes from GitHub]
   >>>>>>> main
   ```
3. Edit the file to select the correct code and delete the markers (`<<<<<<<`, `=======`, `>>>>>>>`).
4. Save the file and run `sync.bat` again.
