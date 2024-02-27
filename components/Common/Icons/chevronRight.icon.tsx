import React from "react";

type Props = {
  className?: string;
};

export const ChevronRightIcon = (props: Props) => {
  return (
    <svg
      {...props}
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.25 14.5C28.25 18.1467 26.8014 21.6441 24.2227 24.2227C21.6441 26.8014 18.1467 28.25 14.5 28.25C12.6943 28.25 10.9063 27.8944 9.23811 27.2034C7.56988 26.5124 6.05409 25.4995 4.77728 24.2227C2.19866 21.6441 0.75 18.1467 0.75 14.5C0.75 10.8533 2.19866 7.35591 4.77728 4.77728C7.35591 2.19866 10.8533 0.75 14.5 0.75C16.3057 0.75 18.0937 1.10565 19.7619 1.79666C21.4301 2.48766 22.9459 3.50048 24.2227 4.77728C25.4995 6.05409 26.5124 7.56988 27.2034 9.23811C27.8944 10.9063 28.25 12.6943 28.25 14.5ZM25.5 14.5C25.5 11.5826 24.3411 8.78473 22.2782 6.72183C20.2153 4.65893 17.4174 3.5 14.5 3.5C11.5826 3.5 8.78473 4.65893 6.72183 6.72183C4.65893 8.78473 3.5 11.5826 3.5 14.5C3.5 17.4174 4.65893 20.2153 6.72183 22.2782C8.78473 24.3411 11.5826 25.5 14.5 25.5C17.4174 25.5 20.2153 24.3411 22.2782 22.2782C24.3411 20.2153 25.5 17.4174 25.5 14.5ZM9.82501 20.825L16.15 14.5L9.82501 8.17501L11.75 6.25L20 14.5L11.75 22.75L9.82501 20.825Z"
        fill="black"
        fillOpacity="0.15"
      />
    </svg>
  );
};
