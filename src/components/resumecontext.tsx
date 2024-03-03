import React, { createContext, useState } from 'react';
import { ResumeItem } from 'types';

const ResumeContext = createContext<{
  resumeItems: ResumeItem[];
  addResumeItem: (item: ResumeItem) => void;
  removeResumeItem: (index: number) => void;
}>({
  resumeItems: [],
  addResumeItem: () => {},
  removeResumeItem: () => {},
});

export default ResumeContext;
