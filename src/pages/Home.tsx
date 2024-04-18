import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MainNav } from "../components/main-nav";
import { Button } from "@/components/ui/button";
import { Add } from "@/components/Add";
import { ResumeSelector } from "@/components/ResumeSelector";
import { useGetAllResumes } from "@/hooks/queries";
import { ResumesServerType } from "@/api/models/resumeModel";
import { useNavigate } from "react-router-dom";
import { ResumesType } from "@/api/models/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useAddResume } from "@/hooks/mutations";
import { templates } from "@/api/models/templates";
import { generatePdfBlobSafe } from "@/latexUtils/latexUtils";
import { testlatex4 } from "@/tests/dummyData";

// const cacheLatex1 = `\\documentclass[letterpaper,11pt]{article}\r\n  \r\n  \\usepackage{latexsym}\r\n  \\usepackage[empty]{fullpage}\r\n  \\usepackage{titlesec}\r\n  \\usepackage{marvosym}\r\n  \\usepackage[usenames,dvipsnames]{color}\r\n  \\usepackage{verbatim}\r\n  \\usepackage{etoolbox}\r\n  \\usepackage{enumitem}\r\n  \\usepackage[hidelinks]{hyperref}\r\n  \\usepackage[english]{babel}\r\n  \\usepackage{tabularx}\r\n  \\usepackage{fontawesome5}\r\n  \\usepackage{multicol}\r\n  \\usepackage{graphicx}%\\setmainfont{Times New Roman}\r\n  \\usepackage[top=0in, left=1in, right=1in, bottom=1in]{geometry}\r\n  \\setlength{\\multicolsep}{-3.0pt}\r\n  \\setlength{\\columnsep}{-1pt}\r\n  \\input{glyphtounicode}\r\n\r\n  \r\n  \\RequirePackage{tikz}\r\n  \\RequirePackage{xcolor}\r\n  \r\n  \\definecolor{cvblue}{HTML}{0E5484}\r\n  \\definecolor{black}{HTML}{130810}\r\n  \\definecolor{darkcolor}{HTML}{0F4539}\r\n  \\definecolor{cvgreen}{HTML}{3BD80D}\r\n  \\definecolor{taggreen}{HTML}{00E278}\r\n  \\definecolor{SlateGrey}{HTML}{2E2E2E}\r\n  \\definecolor{LightGrey}{HTML}{666666}\r\n  \\colorlet{name}{black}\r\n  \\colorlet{tagline}{darkcolor}\r\n  \\colorlet{heading}{darkcolor}\r\n  \\colorlet{headingrule}{cvblue}\r\n  \\colorlet{accent}{darkcolor}\r\n  \\colorlet{emphasis}{SlateGrey}\r\n  \\colorlet{body}{LightGrey}\r\n\r\n  \\usepackage{CormorantGaramond}\r\n  \\usepackage{charter}\r\n  \r\n\r\n  \\addtolength{\\oddsidemargin}{-0.6in}\r\n  \\addtolength{\\evensidemargin}{-0.5in}\r\n  \\addtolength{\\textwidth}{1.19in}\r\n  \\addtolength{\\textheight}{1.4in}\r\n  \\urlstyle{same}\r\n  \r\n  \\definecolor{airforceblue}{rgb}{0.36, 0.54, 0.66}\r\n  \r\n  \\raggedbottom\r\n  \\raggedright\r\n  \\setlength{\\tabcolsep}{0in}\r\n  \r\n  \\titleformat{\\section}{\r\n    \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries\r\n  }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]\r\n  \r\n  \\pdfgentounicode=1\r\n  \r\n  \\newcommand{\\resumeItem}[1]{\r\n    \\item\\small{\r\n      {#1 \\vspace{-1pt}}\r\n    }\r\n  }\r\n  \r\n  \\newcommand{\\classesList}[4]{\r\n      \\item\\small{\r\n          {#1 #2 #3 #4 \\vspace{-2pt}}\r\n    }\r\n  }\r\n  \r\n  \\newcommand{\\resumeSubheading}[4]{\r\n    \\vspace{-2pt}\\item\r\n      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\r\n          \\textbf{\\large#1} & \\textbf{\\small#2}  \\\\\r\n          \\textit{\\large#3} &  \\textit{\\small #4} \\\\\r\n        \r\n      \\end{tabular*}\\vspace{-7pt}\r\n  }\r\n\r\n  \\newcommand{\\resumeSubheadingTwo}[4]{\r\n    \\vspace{-2pt}\\item\r\n      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\r\n          \\textbf{\\large#1} & \\textbf{\\small#2}  \\\\\r\n          \\textit{\\small#3} &  \\textit{\\small #4} \\\\\r\n        \r\n      \\end{tabular*}\\vspace{-7pt}\r\n  }\r\n  \r\n  \r\n  \\newcommand{\\resumeSingleSubheading}[4]{\r\n    \\vspace{-2pt}\\item\r\n      \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\r\n        \\textbf{\\large#1} & \\textbf{\\small #2} \\\r\n        \r\n      \\end{tabular*}\\vspace{-7pt}\r\n  }\r\n  \r\n  \\newcommand{\\resumeSubSubheading}[2]{\r\n      \\item\r\n      \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}\r\n        \\textit{\\small#1} & \\textit{\\small #2} \\\r\n      \\end{tabular*}\\vspace{-7pt}\r\n  }\r\n  \r\n  \r\n  \\newcommand{\\resumeProjectHeading}[2]{\r\n      \\item\r\n      \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}\r\n        \\small#1 & \\textbf{\\small #2}\\\r\n      \\end{tabular*}\\vspace{-7pt}\r\n  }\r\n  \r\n  \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}\r\n  \r\n  \\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}\r\n  \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}\r\n  \r\n  \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}\r\n  \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}\r\n  \\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.1in]}\r\n  \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}\r\n  \r\n  \\newcommand\\sbullet[1][.5]{\\mathbin{\\vcenter{\\hbox{\\scalebox{#1}{$\\bullet$}}}}}\r\n\r\n  \\AtBeginDocument{\r\n            \\setbox0=\\vbox\\bgroup\r\n            \\preto\\enddocument{\\egroup\r\n                \\dimen0=\\dp0\r\n                \\pdfpageheight=\\dimexpr\\ht0+\\dimen0\r\n                \\unvbox0\\kern-\\dimen0 }\r\n\t\t\t}\\begin{document}\r\n\\resumeSubHeadingListStart\r\n\\resumeSubheading\r\n{Vanderbilt University}\r\n{Nashville, TN}\r\n{B.S. Computer Science}\r\n{aug 2025}\r\n\\resumeItemListStart\r\n\\resumeItem{Courses: Principles of SWE}\r\n\\resumeItemListEnd\r\n\\resumeSubHeadingListEnd\r\n\\vspace{-\\lastskip}\r\n\\end{document}`

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, isSuccess } = useGetAllResumes(storedToken);
  const navigate = useNavigate();
	const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    isError: isAddResumeError,
  } = useAddResume(queryClient, storedToken);

	useEffect(() => {
		console.log("doing cache fill");
		generatePdfBlobSafe(testlatex4);
		// generatePdfBlobSafe(cacheLatex1);
	}, []);

  useEffect(() => {
    const updateToken = async () => {
      try {
        const token = await currentUser?.getIdToken();
        setStoredToken(token);
      } catch (err) {
        console.log(err);
      }
    };
    void updateToken();
  }, [currentUser]);

	const onClickAddResume = () => {
    const blankResume: ResumesType = {
      itemName: "Untitled resume",
			itemIds: [],
			templateId: templates.JAKES,
    };

    mutate(blankResume, {
			onSuccess: (response) => {
				console.log("response:", response);
				navigate(`/editor/${response._id}`);
			},
			onError: () => {
				//TODO
			}
		});
  };

  return (
    <>
      <div className="md:hidden"></div>
      <div className="flex-col">
        <div className="flex w-full h-[3rem] items-center px-4 relative shadow-xl">
          <MainNav className="mx-6" />
          <Button className="mr-4" variant="secondary">
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>

      <div className="lg:p-8 bg-[#E7ECEF] h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
            <p className="text-sm text-muted-foreground">
              Your current resumes are here!
            </p>
            <div
              className="w-full h-full grid gap-4 justify-center justify-items-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              }}
            >
              <Add
                onClick={onClickAddResume}
              ></Add>
              {isSuccess &&
                data.map((resume: ResumesServerType) => {
                  return (
                    <ResumeSelector
                      resume={resume}
                      key={resume._id}
                    ></ResumeSelector>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
