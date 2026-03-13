import os
import shutil
import subprocess

templates = ['classic', 'modern', 'elegant', 'minimal']
os.makedirs('examples', exist_ok=True)

dummy_data = {
    '<<NAME>>': 'Jane Doe',
    '<<CONTACT_INFO>>': 'jane.doe@example.com | +1 234 567 8900 | LinkedIn | GitHub',
    '<<SENDER_INFO>>': 'Jane Doe \\\\ jane.doe@example.com \\\\ +1 234 567 8900',
    '<<SUMMARY>>': 'A passionate professional with experience in software engineering.',
    '<<EXPERIENCE_SECTION>>': '\\textbf{Senior Engineer} \\hfill 2020 -- Present \\\\ \\textit{Tech Corp} \\hfill City, State \\begin{itemize}[noitemsep] \\item Built scalable systems. \\end{itemize}',
    '<<PROJECTS_SECTION>>': '\\textbf{Project Alpha} \\\\ Developed a cool app.',
    '<<EDUCATION_SECTION>>': '\\textbf{B.S. in Computer Science} \\hfill 2016 -- 2020 \\\\ \\textit{University}',
    '<<SKILLS_SECTION>>': '\\textbf{Languages:} Python, Java, C++',
    '<<PHOTO_BLOCK>>': '',
    '<<HIRING_MANAGER_NAME_OR_TEAM>>': 'Hiring Manager',
    '<<COMPANY_NAME>>': 'Acme Corp',
    '<<COMPANY_ADDRESS>>': '123 Business Rd',
    '<<COVER_LETTER_BODY>>': 'I am writing to apply for the position. I have great skills and would love to join your team. Thank you.'
}

for style in templates:
    for doc in ['cv', 'cover_letter']:
        with open(f'templates/{doc}_{style}.tex', 'r', encoding='utf-8') as f:
            content = f.read()
        for k, v in dummy_data.items():
            content = content.replace(k, v)
        out_path = f'examples/{doc}_{style}.tex'
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
        # compile
        subprocess.run(['.\\tectonic.exe', out_path], shell=True)
