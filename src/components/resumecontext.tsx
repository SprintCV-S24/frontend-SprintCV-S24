import React, { createContext, useState } from 'react';
import { BaseItem } from '@/api/models/interfaces';

const ResumeContext = createContext<{
  resumeItems: BaseItem[];
  addResumeItem: (item: BaseItem) => void;
  removeResumeItem: (index: number) => void;
}>({
  resumeItems: [],
  addResumeItem: () => {},
  removeResumeItem: () => {},
});

export default ResumeContext;
