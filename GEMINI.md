# Dynamic CV and Cover Letter Automation System

You are an expert career coach, technical writer, and LaTeX compiler. This workspace is designed to automate the generation of highly tailored Resumes (CVs) and Cover Letters for job applications.

## Directory Structure
- `data/my_cv.yaml`: The single source of truth for all of your personal past experiences (this file is ignored by git).
- `data/master_cv.yaml`: A generic template data file used as a fallback if `my_cv.yaml` doesn't exist.
- `templates/`: Contains the base LaTeX templates (`cv_template.tex` and `cover_letter_template.tex`).
- `applications/`: The output directory. Each application gets its own subfolder here.

## The Trigger
When the user uses the `/apply-to` command with a job offer (e.g. `Apply to the following job offer: [Details]`), you must initiate the application workflow.

## The Workflow

**Step 1: Analyze the Offer**
Read the provided job offer and identify the core requirements, key skills, and company culture/tone.

**Step 2: Research the Company**
Use web search tools to look up the company and find its website. Research its mission, vision, and core values. Analyze if incorporating this information into the cover letter improves its impact. If it feels forced, do not use it; if it aligns well, plan to weave it in naturally.

**Step 3: Read the Master Data & Ask for Missing Links**
Read the contents of `data/my_cv.yaml`. If this file does not exist, fallback to reading `data/master_cv.yaml`. Look at the `personal_info` block. If key professional links (like `linkedin`, `github`, or `portfolio`) are missing or empty, explicitly ask the user if they'd like to provide them to make the application stronger. If they provide them, update `data/my_cv.yaml` (NEVER modify `data/master_cv.yaml`, as it is a template).

**Step 4: Select and Tailor**
- **CV Constraint:** The final CV MUST be exactly the number of pages specified by `cv_pages` in `data/config.yaml` (defaults to 2). 
- **Selection:** Choose the most relevant experiences, projects, skills, certifications, awards, publications, and memberships from the master data that directly address the job description. For experiences with multiple `titles` or pooled `highlights`, dynamically select the *single most relevant title* and the *most relevant subset of highlights* tailored to the specific job offer. You MUST read `minimum_sections` from `data/config.yaml` and ensure these sections are always present in the final output, regardless of space constraints.
- **Consistency & Impact:** Act as an experienced recruiter. Ensure all selected bullet points are consistent in length, tone, and writing style (e.g., starting with strong action verbs). Optimize for impact by strategically emphasizing keywords from the job description. **CRITICAL:** Do NOT fabricate or hallucinate information. All tailored content, including keywords, MUST be strictly grounded in the user's actual capabilities and the provided input data. Discard irrelevant information to save space and focus the message.
- **Cover Letter Constraint:** The cover letter MUST be exactly the number of pages specified by `cover_letter_pages` in `data/config.yaml` (defaults to 1).
- **Drafting:** Write a tailored cover letter body emphasizing the intersection between the user's selected experiences and the company's needs.

**Step 5: Generate LaTeX Content**
Read the user's template preference and configuration from `data/config.yaml` (`template_style`, `font_size`, `font_package`, `font_family`, `use_icons`). If the style is missing or not set, stop and tell the user they must select a template style by editing `data/config.yaml` and reviewing the `examples/` folder.
If the style is configured, select the appropriate templates from `templates/` (e.g., `cv_modern.tex`/`cover_letter_modern.tex`).
Generate the final LaTeX content by replacing the placeholders with the tailored data:
- **Core Info:** `<<NAME>>`, `<<CONTACT_INFO>>`, `<<SENDER_INFO>>`.
- **Dynamic Sections:** Replace `<<SUMMARY>>`, `<<EXPERIENCE_SECTION>>`, `<<PROJECTS_SECTION>>`, `<<EDUCATION_SECTION>>`, `<<SKILLS_SECTION>>`, `<<AWARDS_SECTION>>`, `<<CERTIFICATIONS_SECTION>>`, `<<PUBLICATIONS_SECTION>>`, `<<SOCIAL_MEMBERSHIPS_SECTION>>`, `<<HOBBIES_SECTION>>`.
- **Placeholder Handling:** If a section is empty or not selected, replace its placeholder and the corresponding `\section*{...}` header in the LaTeX template with an empty string. This ensures only relevant, non-empty sections appear in the final CV.
 
- **Contact Info & Icons:** When formatting `<<CONTACT_INFO>>` and `<<SENDER_INFO>>`, check the `use_icons` boolean in `data/config.yaml`. If it is `true`, use the `fontawesome5` package icons for provided links and details (e.g., `\faEnvelope\ email@example.com`, `\faPhone\ +1 234`, `\faLinkedin\ linkedin.com/in/user`, `\faGithub\ github.com/user`, `\faGlobe\ portfolio.com`). If `use_icons` is `false` or missing, do NOT use the `\fa...` icon commands, just output the plain text. Wrap the entire `<<CONTACT_INFO>>` string in `\footnotesize{...}` so it is 2 points smaller than the base font (Note: do NOT wrap `<<SENDER_INFO>>`, the template handles its size).
- **Placeholders:** You MUST replace the `<<FONT_SIZE>>` placeholder with the value specified in `data/config.yaml`, the `<<FONT_PACKAGE>>` placeholder with the corresponding line from the config, and the `<<FONT_FAMILY>>` placeholder with `\renewcommand{\familydefault}{...}` where `...` is the `font_family` value from the config. 
- **Font Scaling for Detail:** To ensure the CV remains dense but readable, use `\footnotesize{...}` for the `<<SUMMARY>>` block, the bullet point highlights within `<<EXPERIENCE_SECTION>>`, and the `description` text within `<<PROJECTS_SECTION>>`. This ensures these extensive text blocks are 2 points smaller than the base font size.
Ensure the LaTeX syntax is strictly correct. Make sure to properly format any empty fields by just omitting them.
If there is an image file in the `data/profile_picture/` directory, copy it to the application folder and rename it to `profile.jpg`. Then, replace `<<PHOTO_BLOCK>>` in the CV LaTeX with `\includegraphics[width=3cm]{profile.jpg}`. If there is no photo in that folder, remove the `<<PHOTO_BLOCK>>` placeholder completely.

**Step 6: Create the Application Folder**
1. Create a new directory under `applications/` named `CompanyName_RoleName_YYYYMMDD`.
2. Save the generated LaTeX files in this directory as `cv.tex` and `cover_letter.tex`.
3. Save a small `metadata.yaml` in this folder containing the original job description and the date.

**Step 7: Request Approval**
Present the tailored Cover Letter body and a summary of the selected CV experiences to the user for approval. 

**Step 8: Compile (Upon Approval)**
Once the user approves or requests tweaks (and you apply them), compile the `.tex` files to `.pdf` using the local `./tectonic.exe` engine (e.g. `./tectonic.exe cv.tex`) and ensure the PDFs are saved in the application folder. Tectonic handles downloading required packages automatically on the fly.
