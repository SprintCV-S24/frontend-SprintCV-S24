import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MainNav } from "../components/main-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EducationItem } from "@/components/resume-items/education-item";
import { ExperienceItem } from "@/components/resume-items/experience-item";
import { ExtracurricularItem } from "@/components/resume-items/activity";
import { HeadingItem } from "@/components/resume-items/heading-item";
import { SubheadingItem } from "@/components/resume-items/subheading-item";
import { ProjectItem } from "@/components/resume-items/project-item";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeItem } from "types";
import ResumeContext from "../components/resumecontext";
import HeadingScrollItem from "../components/scrollarea-items/heading-scroll";
import { LatexPdf } from "@/components/Latex";
import {
  generateEducationLatex,
  generateExperienceLatex,
  generateProjectLatex,
} from "@/latexUtils/latexString";
import { useGetAllItems } from "@/hooks/queries";
import { generateLatex } from "@/latexUtils/latexString";

import { ReactSortable } from "react-sortablejs";
import { BaseItem } from "@/api/models/interfaces";

const testLatex2 = `
%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

% \\newcommand{\\resumeSubheading}[4]{
%   \\vspace{-2pt}\\item
%     \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
%       \\textbf{#1} & #2 \\\\
%       \\textit{\\small#3} & \\textit{\\small #4} \\\\
%     \\end{tabular*}\\vspace{-7pt}
% }

\\newcommand{\\resumeSubheading}[5]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} \\small\\emph{#2} & #3 \\\\
      \\textit{\\small#4} & \\textit{\\small #5} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
% \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
%   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
%   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
% \\end{tabular*}

\\begin{center}
  \\textbf{\\Huge \\scshape Aubrey Graham (Drake)} \\\\ \\vspace{1pt}
  \\small 111-111-1111 $|$ \\href{aubrey.graham@gmail.com}{\\underline{aubrey.graham@gmail.com}} $|$
  \\href{https://linkedin.com/in/aubreygraham}{\\underline{linkedin.com/in/aubreygraham}} $|$
  \\href{https://github.com/aubreygraham}{\\underline{github.com/aubreygraham}}
\\end{center}




%-------------------------------------------
\\end{document}
`;

const testlatex3 = `\\documentclass[letterpaper,11pt]{article}
        
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{etoolbox}
\\input{glyphtounicode}
\\usepackage[top=0in, left=1in, right=1in, bottom=1in]{geometry}

%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}


% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
    \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
    \\item\\small{
    {#1 \\vspace{-2pt}}
    }
}

\\newcommand{\\resumeSubheading}[4]{
    \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1} & #2 \\\\
        \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
        \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
        \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}

\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}


\\AtBeginDocument{
    \\setbox0=\\vbox\\bgroup
    \\preto\\enddocument{\\egroup
        \\dimen0=\\dp0
        \\pdfpageheight=\\dimexpr\\ht0+\\dimen0
        \\unvbox0\\kern-\\dimen0 }
}\\begin{document}
\\resumeSubHeadingListStart
\\resumeSubheading
{Some High school}{Los Angeles, CA}
{BS CS}{Exp 2023}
\\resumeSubHeadingListEnd
\\vspace{-\\lastskip}\\end{document}
`;

const DOCUMENT_WIDTH = 420;

const Editor: React.FC = () => {
  const [fact, setFact] = useState<string>("");
  const { currentUser } = useAuth();
  const { resumeItems } = useContext(ResumeContext);
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const [bulletRendering, setBulletRendering] = useState(false);
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, isSuccess } = useGetAllItems(storedToken);

  const [tempList, setTempList] = useState([
    {
      id: "65e92d4e549aa17ad29a34c6",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "TESTING",
      bullets: [""],
      title: "asdfasdf",
      subtitle: "ACTIVITY",
      year: "asdfasdfas",
      location: "asdfasdfas",
      __v: 0,
      type: 2,
    },
    {
      id: "65e93b75c289e4713ca2c49d",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "TESTING2",
      bullets: [""],
      title: "leader",
      subtitle: "extracur",
      year: "aug 2023",
      location: "aug 2023",
      __v: 0,
      type: 2,
    },
    {
      id: "65e9f3251bd06d72e3fd167f",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "3WUHBPVZNM",
      bullets: ["bullet 1", "bullet 2"],
      title: "Follower",
      subtitle: "Test extra",
      year: "jan 2026",
      location: "st louis",
      __v: 0,
      type: 2,
    },
    {
      id: "65e9f3251bd06d72e3fd168e",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "1NTNMEOUIF",
      bullets: ["bullet 1", "bullet 2"],
      title: "Follower",
      subtitle: "Test extra",
      year: "jan 2026",
      location: "st louis",
      __v: 0,
      type: 2,
    },
    {
      id: "65e9f4d7e15389226434dfb5",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "CIVR6WQXW5",
      bullets: ["asdf"],
      title: "a",
      subtitle: "test item",
      year: "a",
      location: "a",
      __v: 0,
      type: 2,
    },
    {
      id: "65e9faf2e15389226434dff5",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "PORP0NE3KZ",
      bullets: ["Dean's list", "Gold star"],
      title: "Hustler's University",
      subtitle: "B.S. Hustling",
      location: "Romania",
      year: "Jul 2018 - Sep 2026",
      __v: 0,
      type: 0,
    },
    {
      id: "65e9fea6e15389226434e06a",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "AGHVNMVR73",
      bullets: ["asdf"],
      title: "asdf",
      subtitle: "aassddff",
      year: "adsf",
      location: "adsf",
      __v: 0,
      type: 1,
    },
    {
      id: "65e9ff5ce15389226434e085",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "HJI5F4RETR",
      name: "Jacky G",
      items: [
        {
          item: "jackyg.com",
          href: "jackyg.com",
        },
      ],
      __v: 0,
      type: 3,
    },
    {
      id: "65ea63bbe15389226434e0a6",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "P5GLSZOKC5",
      bullets: ["I made a personal project", "It allowed people to log in"],
      title: "Personal project",
      technologies: "React, cobol",
      year: "july 1962",
      __v: 0,
      type: 4,
    },
    {
      id: "65ea6452e15389226434e0c1",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "36X5W6U7K1",
      title: "Projects",
      __v: 0,
      type: 5,
    },
    {
      id: "65ea6586e15389226434e0dc",
      user: "ZzCozEPHZOYVLw0jep3qi646cvi1",
      itemName: "LVPE0KD2K6",
      title: "Test",
      __v: 0,
      type: 5,
    },
  ]);

  useEffect(() => {
    const fetchFact = async () => {
      console.log("called");
      try {
        const token = await currentUser?.getIdToken();
        setStoredToken(token);

        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // below, the /api is replaced with the server url defined in vite.config.ts
        // so, if the server is defined as "localhost:3001" in that file,
        // the fetch url will be "localhost:3001/example"
        //const res = await fetch("/api/example", payloadHeader);
        // setFact(await res.text());
      } catch (err) {
        console.log(err);
      }
    };

    void fetchFact();
  }, [currentUser, storedToken]);

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `Resume Item ${a.length - i}`,
  );

  // TODO: Make this type safe, make some other changes.
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Button
              className="absolute right-2 top-2 md:right-4 md:top-4"
              variant="ghost"
            >
              <Link to="/profile">Profile</Link>
            </Button>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-[#E7ECEF] h-[1000px]">
        <div className="w-1/2 p-4 flex-col">
          <Card className="h-12">
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="mt-1 ml-1" variant="outline">
                    Add Resume Item
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="text-center">
                    Item Type
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <HeadingItem></HeadingItem>
                  <DropdownMenuSeparator />
                  <SubheadingItem></SubheadingItem>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <EducationItem></EducationItem>
                  <DropdownMenuSeparator />
                  <ExperienceItem></ExperienceItem>
                  <DropdownMenuSeparator />
                  <ExtracurricularItem></ExtracurricularItem>
                  <DropdownMenuSeparator />
                  <ProjectItem></ProjectItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
          <ScrollArea className="h-[600px] w-full rounded-md mt-4 border bg-white">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Resume Items
              </h4>
              <Separator className="mb-2"></Separator>
              {/* {isSuccess &&
                data.map((item) => (
                  <Card className="w-full p-2 mb-2 bg-grey" key={item._id}>
                    <LatexPdf
                      onRenderStart={() => setBulletRendering(isPdfRendering)}
                      onRenderEnd={() => setIsPdfRendering(isPdfRendering)}
                      latexCode={generateLatex(item)}
                      width={DOCUMENT_WIDTH}
                    ></LatexPdf>
                  </Card>
                ))} */}
              <ReactSortable animation={150} list={tempList} setList={setTempList}>
                {isSuccess &&
                  tempList.map((item) => (
                    <Card className="w-full p-2 mb-2 bg-grey" key={item.id}>
                      <LatexPdf
                        onRenderStart={() => setBulletRendering(isPdfRendering)}
                        onRenderEnd={() => setIsPdfRendering(isPdfRendering)}
                        latexCode={generateLatex(item as BaseItem)}
                        width={DOCUMENT_WIDTH}
                      ></LatexPdf>
                    </Card>
                  ))}
              </ReactSortable>
            </div>
          </ScrollArea>
        </div>
        <div className="w-1/2 p-4">
          {/* {isPdfRendering && (
            <Skeleton className="h-[663px] w-[600px] ml-6 rounded-xl" />
          )}{" "} */}
          <div className="flex items-center justify-center">
            <LatexPdf
              onRenderStart={() => setIsPdfRendering(true)}
              onRenderEnd={() => setIsPdfRendering(false)}
              latexCode={testLatex2}
              width={DOCUMENT_WIDTH}
            ></LatexPdf>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
