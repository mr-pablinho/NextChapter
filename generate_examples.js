const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const templates = ['classic', 'modern', 'elegant', 'minimal', 'professional', 'creative', 'standard', 'sidebar'];
if (!fs.existsSync('examples')) {
    fs.mkdirSync('examples');
}
if (fs.existsSync('data/profile_picture/profile.jpg')) {
    fs.copyFileSync('data/profile_picture/profile.jpg', 'examples/profile.jpg');
}

const dummy_data = {
    '<<FONT_SIZE>>': '11pt',
    '<<FONT_PACKAGE>>': String.raw`\usepackage[default]{lato}`,
    '<<NAME>>': 'Jane Doe',
    '<<CONTACT_INFO>>': String.raw`{\footnotesize jane.doe@example.com | \faPhone\ +1 234 567 8900 | \faLinkedin\ linkedin.com/in/janedoe | \faGithub\ github.com/janedoe}`,
    '<<SENDER_INFO>>': String.raw`Jane Doe \\ jane.doe@example.com \\ \faPhone\ +1 234 567 8900 \\ \faLinkedin\ /in/janedoe`,
    '<<SUMMARY>>': String.raw`{\footnotesize A passionate professional with experience in software engineering.}`,
    '<<EXPERIENCE_SECTION>>': String.raw`\textbf{Senior Engineer} \hfill 2020 -- Present \\ \textit{Tech Corp} \hfill City, State \begin{itemize}[noitemsep] \footnotesize \item Built scalable systems. \end{itemize}`,
    '<<PROJECTS_SECTION>>': String.raw`\textbf{Project Alpha} \\ {\footnotesize Developed a cool app.}`,
    '<<EDUCATION_SECTION>>': String.raw`\textbf{B.S. in Computer Science} \hfill 2016 -- 2020 \\ \textit{University}`,
    '<<SKILLS_SECTION>>': String.raw`\textbf{Languages:} Python, Java, C++`,
    '<<AWARDS_SECTION>>': String.raw`\textbf{Employee of the Year} \hfill 2022 \\ \textit{Tech Corp}`,
    '<<CERTIFICATIONS_SECTION>>': String.raw`\textbf{AWS Certified Solutions Architect} \hfill 2021`,
    '<<PUBLICATIONS_SECTION>>': String.raw`\textbf{The Future of Cloud Computing} \hfill 2021 \\ \textit{Tech Innovators Journal}`,
    '<<SOCIAL_MEMBERSHIPS_SECTION>>': String.raw`\textbf{Member} \hfill 2020 -- Present \\ \textit{Professional Association}`,
    '<<HOBBIES_SECTION>>': String.raw`Guitar, Hiking, Coffee`,
    '<<PHOTO_BLOCK>>': fs.existsSync('data/profile_picture/profile.jpg') ? String.raw`\includegraphics[width=3cm]{profile.jpg}` : '',
    '<<HIRING_MANAGER_NAME_OR_TEAM>>': 'Hiring Manager',
    '<<COMPANY_NAME>>': 'Acme Corp',
    '<<COMPANY_ADDRESS>>': '123 Business Rd',
    '<<COVER_LETTER_BODY>>': 'I am writing to apply for the position. I have great skills and would love to join your team. Thank you.'
};

for (const style of templates) {
    for (const doc of ['cv', 'cover_letter']) {
        const inPath = path.join('templates', `${doc}_${style}.tex`);
        let content = fs.readFileSync(inPath, 'utf8');
        for (const [k, v] of Object.entries(dummy_data)) {
            content = content.split(k).join(v);
        }
        const outPath = path.join('examples', `${doc}_${style}.tex`);
        fs.writeFileSync(outPath, content, 'utf8');
        try {
            execSync(`.\\\\tectonic.exe ${outPath}`, { stdio: 'inherit' });
        } catch (e) {
            console.error('Failed compiling', outPath);
        }
    }
}
