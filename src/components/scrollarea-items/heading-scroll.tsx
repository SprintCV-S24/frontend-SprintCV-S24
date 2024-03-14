import React from 'react';
import { ResumeItem } from 'types';

interface ResumeProps {
  items: ResumeItem[];
}

const ScrollItem: React.FC<ResumeProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          {item.type === 'heading' && <p>Heading content: {item.description?.join(' ')}</p>}
          {item.type === 'subheading' && <p>Subheading content: {item.description?.join(' ')}</p>}
          {item.type === 'education' && (
            <p>
              Education content: {item.date}, {item.major}, {item.minor}, {item.description?.join(' ')},
            </p>
          )}
          {item.type === 'experience' && (
            <p>
              Experience content: {item.date}, {item.major}, {item.minor}, {item.description?.join(' ')},
            </p>
          )}
          {item.type === 'extracurricular' && (
            <p>
              Extracurricular content: {item.date}, {item.location}, {item.description?.join(' ')},
            </p>
          )}
          {item.type === 'project' && <p>Project content: {item.description?.join(' ')}</p>}
        </div>
      ))}
    </div>
  );
};

export default ScrollItem;
