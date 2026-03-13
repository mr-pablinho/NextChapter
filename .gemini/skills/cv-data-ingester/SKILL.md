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
Read the provided source material (text, PDFs, URLs if feasible) and extract structured entities:
- **Jobs/Experience:** Company, Title, Start/End Dates, Highlights/Descriptions, Location.
- **Projects:** Name, Description, Technologies used.
- **Education:** Institution, Degree, Dates, GPA.
- **Skills/Awards:** Languages, Frameworks, Tools, specific awards.

### 2. Compare with Master Data
Read the current contents of `data/my_cv.yaml` (if it exists, otherwise read `data/master_cv.yaml`). Compare every extracted entity against the master data to identify:
- **Exact Duplicates:** Entities that already exist with identical information.
- **Partial Matches (Updates/Conflicts):** Entities that exist (e.g., same company and role) but have different dates, new highlights, or conflicting descriptions.
- **Net New Entities:** Completely new jobs, projects, or skills not currently in the master file.

### 3. Interactive Review and Clarification
Do **not** overwrite or merge the master file immediately. You must present a clear summary to the user and ask for their confirmation or clarification.

- **For New Jobs:** Ask the user to confirm adding them. If any critical details are missing (e.g., start/end dates, location, a clear description of their impact), explicitly ask them to provide those missing details.
  - *Example:* "I found a new role: Software Engineer at StartupX. I am missing the start date and location. Could you provide those?"
- **For Partial Matches:** Show the discrepancy and explain that you will append the new information so no context is lost.
  - *Example:* "For your role at Tech Corp A, I found a new title 'Backend Developer' and 3 new highlights. I will append these to the `titles` and `highlights` arrays for this role."
- **For Duplicates:** Quietly discard them, but you may briefly mention in your summary how many duplicates were skipped.

### 4. Update the Master Data
Once the user has clarified missing details and confirmed your proposed changes, carefully merge the confirmed data into `data/my_cv.yaml` (if it doesn't exist, create it). 
- **Append, don't overwrite:** For partial matches on the same role, append new variations of the job title to the `titles` array, and append new bullet points to the `highlights` array.
Ensure the YAML structure remains valid and consistent with the existing schema (e.g., keeping lists of highlights formatted correctly, adding relevant tags).
