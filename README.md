# NextChapter: Dynamic CV & Cover Letter System

An automated, AI-powered system for generating highly tailored Resumes (CVs) and Cover Letters from a single source of truth.

## Project Structure

- **`data/master_cv.yaml`**: The "Master Bank" of all your professional history. Everything you've ever done goes here.
- **`templates/`**: Professional LaTeX templates for your CV and Cover Letter.
- **`applications/`**: (Ignored by Git) Where tailored applications are generated for specific roles.
- **`GEMINI.md`**: Foundational instructions for the Gemini CLI agent to automate the tailoring process.
- **`cv-data-ingester/`**: A custom skill source for merging new data into your master file.

## Features

- **Automated Tailoring**: Tell Gemini CLI "Apply to [Job Link/Description]" and it will automatically pick the best experiences from your master file to fit a 1-2 page CV.
- **Dynamic Cover Letters**: Automatically writes a cover letter highlighting the intersection between your skills and the specific job requirements.
- **Self-Contained LaTeX**: Uses `tectonic.exe` (a standalone LaTeX engine) to compile PDFs without needing a full TeX distribution installed on your system.
- **Data Ingestion**: A dedicated skill to help you import data from LinkedIn or old CVs into your structured YAML bank.

## Getting Started

1. **Fill your Master Data**: Edit `data/master_cv.yaml` with your full history.
2. **Install the Ingester Skill**:
   ```bash
   gemini skills install .\cv-data-ingester.skill --scope workspace
   ```
3. **Apply for a Job**:
   In your Gemini CLI session, say:
   `/apply-to [Paste Job Offer]`

4. **Add New Experience (Ingest Data)**:
   Whenever you have an old CV section, a new project, or a LinkedIn summary to add to your master bank, just type:
   `/ingest [Paste the raw text of your experience]`

## Requirements

- **Gemini CLI**: To run the automation.
- **Tectonic**: Included as `tectonic.exe` for local PDF compilation.
