import React, { useEffect, useState } from 'react';

export default function GoogleSheetsDataPage() {
  const customFields = {
    PAYMASTER_TOKENS_GOOGLE_SHEET_ID: process.env.PAYMASTER_TOKENS_GOOGLE_SHEET_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  }

  const [dataLoaded, setDataLoaded] = useState(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [fetchedData, setFetchedData] = useState<Record<string, any[]>>({});
  const cacheExpirationTime = 24 * 60 * 60; // 1 day in seconds

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchDataFromGoogleSheet = async () => {
      try {
        const storedData = localStorage.getItem('fetchedData');
        const storedTimestamp = localStorage.getItem('fetchedDataTimestamp');
        
        if (
          storedData &&
          storedTimestamp &&
          Date.now() - Number(storedTimestamp) < cacheExpirationTime * 1000 
        ) {
          setFetchedData(JSON.parse(storedData));    
          setDataLoaded(true);
          return;      
        }

        console.log({customFields})

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const fetchedData: Record<string, any[]> = {};
      const response = await fetch(
        `https://content-sheets.googleapis.com/v4/spreadsheets/${customFields.PAYMASTER_TOKENS_GOOGLE_SHEET_ID}?includeGridData=true&key=${customFields.GOOGLE_API_KEY}`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 

      const data = await response.json();
      const sheetsData = data.sheets;
      if (sheetsData.length) {

        for (let i = 0; i < sheetsData.length; i++) {
          const sheet = sheetsData[i];
          const sheetTitle = sheet.properties.title;
          fetchedData[sheetTitle] = [];

          if (sheet.data) {

            for (let i = 0; i < sheet.data.length; i++) {
              const data = sheet.data[i];

              if (data.rowData && data.rowData.length > 2) {
                const slicedData = data.rowData.slice(2);

                for (let i = 0; i < slicedData.length; i++) {
                  const row = slicedData[i];

                  if (row.values) {
                    const rowValues = row.values.slice(0, 3);
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    const formattedRowValues = rowValues.map((cell: any) => {
                      if (cell.userEnteredValue) {
                        return cell.userEnteredValue.stringValue || cell.userEnteredValue.numberValue;
                      }
                        return '';
                    });
                    fetchedData[sheetTitle].push(formattedRowValues);
                  }
                }
              }
            }
          }
        }
      } else {
        console.log('No sheets found.');
      }

      localStorage.setItem('fetchedData', JSON.stringify(fetchedData));
      localStorage.setItem('fetchedDataTimestamp', String(Date.now())); // Convert to string
      setFetchedData(fetchedData);
      setDataLoaded(true);
     
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors gracefully (e.g., display an error message)
    }
    };
    fetchDataFromGoogleSheet();
  }, []);

  return (
    <div>
      {dataLoaded ? (
        Object.keys(fetchedData).map(sheetTitle => (
          <div key={sheetTitle}>
            <h4 className='vocs_H4 vocs_Heading'>{sheetTitle}</h4>
            <table className="vocs_Table">
              <thead>
                <tr className="vocs_TableRow">
                  <th className="vocs_TableHeader">Symbol</th>
                  <th className="vocs_TableHeader">Name</th>
                  <th className="vocs_TableHeader">Address</th>
                </tr>
              </thead>
              <tbody>
                {fetchedData[sheetTitle].map((row, rowIndex) => (
                  <tr className="vocs_TableRow" key={`${`n-${rowIndex}`}`}>
                    {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                    {row.map((cell: any, i: number) => (
                      <td className="vocs_TableCell" key={`n-${i + 1}`}>{cell}</td>
                    ))}
                  </tr>
                ))}

              </tbody>
            </table>
            <br />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>

  );
};

