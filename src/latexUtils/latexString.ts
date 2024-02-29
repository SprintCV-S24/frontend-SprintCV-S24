
//you don't care about user and itemName fields, but all other fields should be in the latex you generate


/*  ------------------------------------------------- */
/*  -------------------Heading----------------------- */
/*  ------------------------------------------------- */
interface HeadingItem {
    item: string;
    href: string | null;
  }
  
  // Interface for Contact details document
  export interface HeadingType {
      user: string;
      itemName: string;
      name: string;
      items: HeadingItem[];
  }

// Generating the full LaTeX for the Experience Section
export const generateHeaderLatex= (activityObj: HeadingType) => {
    let headerLatex = `\\begin{center}\n`;
    headerLatex += `\\textbf{\\Huge \\scshape ${activityObj.name}} \\\\ \\vspace{1pt}\n`;
    headerLatex += `\\small `;

    // Iterate over each item to append it to the LaTeX string
    activityObj.items.forEach((item, index) => {
        if (item.href) {
        headerLatex += `\\href{${item.href}}{\\underline{${item.item}}}`;
        } else {
        headerLatex += item.item;
        }

        // Add a separator if it's not the last item
        if (index < activityObj.items.length - 1) {
        headerLatex += ` $|$ `;
        }
    });

    headerLatex += `\n\\end{center}`;
    return headerLatex;
}

// testing the header

export const fakeHeading: HeadingType = {
    user: "John",
    itemName: "DOE",
    name: "This Is My Name",
    items: [
        { item: "Hello", href: null }, 
        { item: "meow", href: null }, 
        { item: "dog.com", href: "http://dog.com" }
    ]
};



/*  ------------------------------------------------- */
/*  -------------------Experience-------------------- */
/*  ------------------------------------------------- */
export interface ExperienceType {
	user: string;
	itemName: string;
    bullets: string[];
    title: string;
    subtitle: string;
    date: string;
    location: string;
}

// Generating the full LaTeX for the Experience Section
export const generateExperienceLatex = (activityObj: ExperienceType) => {
    let latexString = `\\resumeSubheading{${activityObj.title}}{${activityObj.subtitle}}{${activityObj.location}}{${activityObj.date}}
    \\resumeItemListStart
    `;

    activityObj.bullets.forEach(bulletPoint => {
        latexString += `\\resumeItem{${bulletPoint}}`;
    });

    latexString += '\\resumeItemListEnd';
    return latexString;
}

// Generating the full LaTeX for the Experience Section
export const generateExperienceHeaderLatex = () => {
    let latexString = `\\Experience`;
    return latexString;
}

export const fakeExperience: ExperienceType = {
    user: "Jane Doe", // Irrelevant for our test
    itemName: "Resume Item", // Irrelevant for our test
    bullets: [
        "Developed and implemented efficient algorithms",
        "Collaborated with a cross-functional team",
        "Improved system performance by 20%"
    ],
    title: "Software Engineer",
    subtitle: "Acme Corporation",
    date: "2022 - 2023",
    location: "Los Angeles, CA"
};

const generatedLatex = generateExperienceLatex(fakeExperience);
console.log(generatedLatex);
