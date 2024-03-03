export interface ResumeItem {
    type:
      | "heading"
      | "subheading"
      | "education"
      | "experience"
      | "extracurricular"
      | "project";
    title: string; // Common field for all types
  
    // Additional fields based on the type
    date?: string; // Optional for types other than "experience"
    major?: string; // Optional for types other than "experience"
    minor?: string; // Optional for types other than "experience"
    description?: string[]; // Optional for types other than "heading" and "extracurricular"
    location?: string; // Optional for types other than "heading" and "extracurricular"
  }