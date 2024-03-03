interface DescriptionPair {
  0: string; // Description text
  1?: string; // Optional link
} 

interface HeadingScrollItemProps {
  heading: string;
  descriptions: DescriptionPair[]; 
}

import React from 'react';

const HeadingScrollItem: React.FC<HeadingScrollItemProps> = ({ heading, descriptions }) => {
  return (
    <div>
      <h2>{heading}</h2>
      <ul>
        {descriptions.map((descriptionPair, index) => (
          <li key={index}>
            {descriptionPair[0]} 
            {descriptionPair[1] && ( 
              <> 
                <br /> {/* Or any other separator you prefer */}
                {descriptionPair[1]}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadingScrollItem;