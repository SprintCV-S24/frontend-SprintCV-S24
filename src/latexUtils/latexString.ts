

export interface ExperienceType {
	user: string;
	itemName: string;
    bullets: string[];
    title: string;
    subtitle: string;
    date: string;
    location: string;
}

//you don't care about user and itemName fields, but all other fields should be in the latex you generate

// \resumeSubheading
// {Undergraduate Research Assistant}{June 2020 -- Present}
// {Texas A\&M University}{College Station, TX}
// \resumeItemListStart
//   \resumeItem{Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems}
//   \resumeItem{Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data}
//   \resumeItem{Explored ways to visualize GitHub collaboration in a classroom setting}
// \resumeItemListEnd


/*  -------------------Experience-------------------- */

// Generating the full LaTeX for the Experience Section
const generateExperienceLatex = (activityObj: ExperienceType) => {
    let latexString = `\\resumeSubheading{${activityObj.title}}{${activityObj.subtitle}}{${activityObj.location}}{${activityObj.date}}
    \\resumeItemListStart
    `;

    activityObj.bullets.forEach(bulletPoint => {
        latexString += `\\resumeItem{${bulletPoint}}`;
    });

    latexString += '\\resumeItemListEnd';
    return latexString;
}

// This is a potential solution to having experience header in latex string object that 
// is returned 
const generateExperienceSection = (experiences: ExperienceType[]): string => {
    let section = `%-----------EXPERIENCE-----------
\\section{Experience}
\\resumeSubHeadingListStart
`;
    experiences.forEach(exp => {
        section += generateExperienceLatex(exp) + "\n";
    });
    section += `\\resumeSubHeadingListEnd
`;
    return section;
};


/*  -------------------Education-------------------- */
