import React, { createContext, useState } from 'react';
import { ResumeItem } from 'types';
import { BaseItem } from '@/api/models/baseItem';

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
