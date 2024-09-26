import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Redoc: any;
  }
}

export const RedocAPI: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && window.Redoc) {
      window.Redoc.init('openapi.yaml', {
        scrollYOffset: 20,
        tryItOutEnabled: true,
        hideDownloadButton: true,
        expandResponses: "all",
        nativeScrollbars: true,
        onlyRequiredInSamples: false,
        pathInMiddlePanel: true,
        requiredPropsFirst: true,
        sortEnumValuesAlphabetically: true,
        jsonSampleExpandLevel: 2,
        theme: {
          spacing: {
            unit: 10,
            sectionHorizontal: 60,
            sectionVertical: 50,
          },
          sidebar: {
            width: '250px',
          },
          rightPanel: {
            width: '450px',
            position: 'absolute', // Add this line
            top: '250px', // Adjust this value to match the sidebar height
            left: 0, 
          },
        },
      }, document.getElementById('redoc-container'));
    }
  }, [isLoaded]);

  return <div id="redoc-container" style={{ width: '150%' }}></div>;
};
