# KIPL Cabs (Kosar Infotech Private Limited)

Official web application for **KIPL Cabs**, showcasing our corporate and consumer taxi services. 

We manage a fleet of **40+ vehicles** providing reliable, fast, and comfortable transport options under three core divisions:
1. **IT Cabs** (Corporate employee transportation solutions)
2. **RedTaxi** (Instant local city cab services)
3. **Trip Cabs** (Outstation, family getaways, and long-distance tourism)

---

## 🌐 Website Sections

- **Hero & Fleet Counter**: Highlights our 40-vehicle capacity and professional services.
- **Service Hub**: Interactive cards detailing IT Cabs, RedTaxi, and Trip Cabs.
- **Live Fare Calculator**: Estimate pricing instantly based on service category and distance (in kilometers).
- **Fleet Filter**: Categorized view showing hatchbacks, sedans, and SUVs.
- **Inquiry Form**: Direct corporate contract submissions and long-distance inquiries.

---

## 🔄 Bidirectional Sync Workflow

The repository is configured to easily sync your local workspace with GitHub.

### Step 1: Login (One-Time Setup)
1. Open Windows **PowerShell** or **Command Prompt**.
2. Type `gh auth login` and press **Enter**.
3. Select **GitHub.com** -> **HTTPS** -> **Login with a web browser**.
4. Paste the temporary code in your browser and click **Authorize**.

### Step 2: Auto-Sync
* To push your local code modifications to GitHub, simply **double-click the `sync.bat` file** in this folder. It automatically fetches changes, stages files, commits with a timestamp, and pushes to GitHub.

---

## 🛠️ Operational Instructions

* **Adding Files**: Save new documents or images anywhere in the directory, then run `sync.bat`.
* **Editing Files**: Save your edits to `index.html`, `style.css`, or `script.js` and run `sync.bat`.
* **Conflict Resolution**: If a merge conflict occurs, open the conflicted file, look for `<<<<<<< HEAD`, edit the lines manually to resolve, save, and double-click `sync.bat`.
