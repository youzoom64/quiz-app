import React, { useRef, useEffect } from 'react';

const ScoreCard = ({ score, total }) => {
  return (
    <svg
      viewBox="0 0 800 400"
      width="800"
      height="400"
      style={{ backgroundColor: 'white' }}
    >
      <rect width="800" height="400" fill="#f8fafc" />
      <text
        x="400"
        y="150"
        fontSize="40"
        textAnchor="middle"
        fill="#1e293b"
      >
        あなたの科学知識テストは...
      </text>
      <text
        x="400"
        y="250"
        fontSize="60"
        fontWeight="bold"
        textAnchor="middle"
        fill="#1e293b"
      >
        {total}点中{score}点でした！
      </text>
    </svg>
  );
};

export default ScoreCard;