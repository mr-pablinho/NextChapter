---
name: cv-data-ingester
description: "Ingests, parses, deduplicates, and merges past CVs, resumes, or online profiles into data/my_cv.yaml. Use when the user provides past experience data to update their main CV repository. NEVER modify data/master_cv.yaml."
---

# CV Data Ingester

This skill helps the user integrate external career data (like old PDFs, LinkedIn text dumps, or raw text blocks about past jobs) into their structured `data/my_cv.yaml` single source of truth. 

The goal is to maintain a clean, comprehensive, and non-redundant database of their professional history, while leaving `data/master_cv.yaml` strictly untouched as a template.

## Workflow

When triggered to ingest new career data, follow these steps sequentially:

### 1. Data Parsing and Analysis
Read the provided source material (text, PDFs, URLs if feasible) and extract structured entities. Be extremely thorough and do not omit any details:
- **Jobs/Experience:** Company, Title(s), Start/End Dates, Highlights/Descriptions, Location, Tags (keywords).
- **Projects:** Name, Description, Technologies used.
- **Education:** Institution, Degree, Dates, GPA, Highlights.
- **Skills:** Languages, Programming Languages, Frameworks, Tools, Concepts.
- **Awards:** Title, Issuer, Date.
- **Certifications/Courses:** Title, Issuer, Date, Link.
- **Publications:** Title, Authors, Journal/Conference, Date, Link.
- **Social Memberships:** Title, Date/Period.
- **Hobbies & Interests:** List of interests.

### 2. Compare with Master Data
Read the current contents of `data/my_cv.yaml` (if it exists, otherwise read `data/master_cv.yaml`). Compare every extracted entity against the master data to identify:
- **Exact Duplicates:** Entities that already exist with identical information.
- **Partial Matches (Updates/Conflicts):** Entities that exist (e.g., same company and role) but have different dates, new highlights, new tags, or conflicting descriptions.
- **Net New Entities:** Completely new jobs, projects, skills, certifications, courses, publications, etc., not currently in the master file.

### 3. Interactive Review and Clarification
Do **not** overwrite or merge the master file immediately. You must present a clear summary to the user and ask for their confirmation or clarification.

- **For New Entities:** Ask the user to confirm adding them. If any critical details are missing (e.g., dates for a job, issuer for a certification), explicitly ask them to provide those missing details.
- **For Partial Matches:** Show the discrepancy and explain how you will merge the information.
- **For Duplicates:** Quietly discard them, but you may briefly mention in your summary how many duplicates were skipped.

### 4. Update the Master Data
Once the user has clarified missing details and confirmed your proposed changes, carefully merge the confirmed data into `data/my_cv.yaml`.
- **Experience Merging:** For matches on the same company/role, append new variations of the job title to the `titles` array, append new bullet points to the `highlights` array, and merge new tags into the `tags` array.
- **Skills Merging:** Add new skills to the appropriate categories (`languages`, `programming_languages`, `frameworks`, `tools`, `concepts`).
- **Comprehensive Update:** Ensure all other sections (projects, education, awards, certifications, publications, social_memberships, hobbies_and_interests) are updated without losing existing data.
Ensure the YAML structure remains valid and consistent with the existing schema. Keep the information as granular and detailed as possible.
