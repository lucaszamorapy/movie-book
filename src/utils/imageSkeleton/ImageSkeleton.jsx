import React from "react";
import "./skeleton.css";

const ImageSkeleton = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true);

  const handleLoad = ({ target }) => {
    setSkeleton(!skeleton);
    target.style.opacity = 1;
  };

  return (
    <div>
      {skeleton && <div className="skeleton h-full"></div>}
      <img
        onLoad={handleLoad}
        className="rounded-t-lg
       "
        src=""
        alt={alt}
        {...props}
      />
    </div>
  );
};

export default ImageSkeleton;
