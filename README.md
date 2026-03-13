# NextChapter: Dynamic CV & Cover Letter System

Welcome! If you're here, it means you're probably navigating the job hunt and tired of manually tailoring your CV and Cover Letter for every single application. 

**NextChapter** is your personal, automated "application factory." You create **one** master list containing everything you've ever done (jobs, projects, skills). Then, whenever you find a job you like, you just feed the job offer into this tool. It will automatically pick the most relevant experiences, format a beautiful 1-to-2 page PDF CV, and write a custom Cover Letter for that specific company in seconds.

Everything runs locally on your computer, meaning your personal data stays safe and private.

---

## 🛠 Prerequisites: Getting Set Up

To use this tool, you need two main things:

### 1. The Gemini CLI
This project is powered by Google's **Gemini CLI**, an AI agent that runs directly in your terminal.
*   **Install it:** You need Node.js installed on your computer. Once you have it, open your terminal and run:
    ```bash
    npm install -g @google/gemini-cli
    ```
*   **Get an API Key:** You need a Gemini API key to run the AI. As of right now, you can get one **for free** using Google AI Studio (https://aistudio.google.com/app/apikey).
*   **Set your Key:** Create a file named `.env` in this project folder and add your key like this: `GEMINI_API_KEY="your_api_key_here"`.

### 2. Tectonic (LaTeX Compiler)
You don't need to install a massive 3GB LaTeX program to get professional PDFs! 
*   **Windows users:** This repository comes with `tectonic.exe` included. It automatically handles everything for you.
*   **Mac/Linux users:** You'll need to install Tectonic quickly (e.g., `brew install tectonic` or `curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh`).

---

## 🚀 How to Use NextChapter

### Phase 1: Build Your "Master Bank" (First-Time Setup)
The system is only as good as the data you give it. You need to load all your professional history into `data/master_cv.yaml`.

**One-Time Setup:**
1. Open your terminal in this project folder and install the custom skill that helps you ingest data:
   ```bash
   gemini skills install .\cv-data-ingester.skill --scope workspace
   ```
2. Start the Gemini CLI by typing `gemini` in your terminal.
3. **The first time only**, tell the chat to load your new tools: Type `/skills reload` and then `/commands reload`.

**Adding Data:**
Drop your old CV or LinkedIn profile into the chat by typing:
`/ingest [Paste your massive block of text here]`
*Tip: You can also just provide a file path, like `/ingest ./old_cvs/resume_2023.pdf`, and the tool will read the file for you!*
*Gemini will automatically extract your jobs, compare them to your bank, ask you to clarify any missing dates, and save them perfectly formatted.*

**Option B: The Manual Way**
Open `data/master_cv.yaml` in any text editor and type your jobs, skills, and projects in manually following the provided template structure.

---

### Phase 2: Create Documents for a Specific Application
Once your bank is full, applying for jobs takes seconds.

1. Find a job offer online that you like.
2. Open your Gemini CLI session (`gemini` in the terminal).
3. Tell the tool to apply:
   `/apply-to [Paste the full text of the job offer here]`
4. **Review & Approve:** Gemini will analyze the offer, select your most relevant experiences from your master bank, draft a custom cover letter, and ask you to approve it.
5. **Compile:** Once you say "looks good," Gemini will automatically use `tectonic` to compile the final `.pdf` files.
6. **Done!** Your tailored CV and Cover Letter will be saved in a newly created folder under `applications/`.

---

## 📂 Project Structure
For those who like to tinker:
*   **`data/master_cv.yaml`**: The source of truth for all your data.
*   **`templates/`**: The raw LaTeX templates (`cv_template.tex` and `cover_letter_template.tex`). You can edit these if you want to change the visual design of your documents!
*   **`applications/`**: Where your finished PDFs are stored (Ignored by Git to keep your repo clean).
*   **`GEMINI.md`**: The "brain" of the project—this file tells the Gemini CLI exactly how to behave when you ask it to apply for a job.
*   **`cv-data-ingester/`**: The source code for the custom AI skill that reads your old CVs.
