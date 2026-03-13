# NextChapter: Dynamic CV & Cover Letter System

Welcome! If you're here, it means you're probably navigating the job hunt and tired of manually tailoring your CV and Cover Letter for every single application. 

**NextChapter** is your personal, automated "application factory." You create **one** master list containing everything you've ever done (jobs, projects, skills). Then, whenever you find a job you like, you just feed the job offer into this tool. It will automatically pick the most relevant experiences, format a beautiful PDF CV (with a configurable page limit), and write a custom Cover Letter for that specific company in seconds.

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
The system is only as good as the data you give it. You need to load all your professional history into `data/my_cv.yaml`. (Note: We use `my_cv.yaml` for your private data, as it is ignored by git. The `master_cv.yaml` file is just a generic template for sharing).

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

**Profile Picture (Optional):**
If you want a profile picture in your CV, drop a file named `profile.jpg` into the `data/profile_picture/` folder. The system will automatically detect it and include it in your compiled PDFs!

---

### Phase 2: Customize Your Look
You have total control over the output using `data/config.yaml`. Open this file to customize:
*   **Template Style:** Choose from 8 different professional designs (`classic`, `modern`, `elegant`, `minimal`, `professional`, `creative`, `standard`, `sidebar`). You can preview what these look like by checking the PDFs in the `examples/` folder!
*   **Fonts:** Choose between 10 different professional typefaces (like Lato, Roboto, Charter, or the classic LaTeX Latin Modern).
*   **Font Size:** Adjust the base font size (`10pt`, `11pt`, `12pt`) to squeeze more info onto the page. *Note: The system automatically makes extensive text blocks (like your summary and bullet points) slightly smaller than the base font to keep the document dense but highly readable.*
*   **Page Limits:** Configure the exact number of pages for your CV (`cv_pages`) and Cover Letter (`cover_letter_pages`).
*   **Minimum Sections:** Define which sections (e.g., `education`, `skills`) MUST always be included in the final CV, no matter what.

---

### Phase 3: Create Documents for a Specific Application
Once your bank is full and configured, applying for jobs takes seconds.

1. Find a job offer online that you like.
2. Open your Gemini CLI session (`gemini` in the terminal).
3. Tell the tool to apply:
   `/apply-to [Paste the full text of the job offer here]`
4. **Smart Linking:** If your `my_cv.yaml` is missing links to your LinkedIn, GitHub, or Portfolio, the AI will proactively ask you for them so it can embed beautiful clickable icons directly into your CV header!
5. **Review & Approve:** Gemini will analyze the offer, select your most relevant experiences from your master bank, draft a custom cover letter, and ask you to approve it.
6. **Compile:** Once you say "looks good," Gemini will automatically use `tectonic` to compile the final `.pdf` files.
7. **Done!** Your tailored CV and Cover Letter will be saved in a newly created folder under `applications/`.

---

## 📂 Project Structure
For those who like to tinker:
*   **`data/my_cv.yaml`**: The source of truth for all your personal data (ignored by git).
*   **`data/master_cv.yaml`**: The fallback, generic data template.
*   **`data/config.yaml`**: Your styling and compilation settings.
*   **`templates/`**: The raw LaTeX templates. You can edit these to change the exact visual structure!
*   **`examples/`**: Generated previews of what every template style looks like.
*   **`applications/`**: Where your finished PDFs are stored.
*   **`GEMINI.md`**: The "brain" of the project—this file tells the Gemini CLI exactly how to behave when you ask it to apply for a job.
