// import React, { createContext, useContext, useState, ReactNode } from "react";

// type DataContextProps = {
//   data: any; // Adjust the type based on your GraphQL query structure
//   setData: React.Dispatch<React.SetStateAction<any>>;
// };

// const DataContext = createContext<DataContextProps | undefined>(undefined);

// export const DataProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [data, setData] = useState<any>({}); // Initialize with an empty object or null if needed

//   return (
//     <DataContext.Provider value={{ data, setData }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error("useData must be used within a DataProvider");
//   }
//   return context;
// };
