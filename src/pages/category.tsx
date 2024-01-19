// import React, { useState } from "react";
// import { graphql } from "gatsby";
// import Layout from "../components/layout";

// const Category = ({ data }: any) => {
//   const dataResult = data.allContentfulProjects.nodes;
//   const [categoryData, setCategoryData] = useState("Select category");

//   const allCategories = Array.from(
//     new Set(dataResult.flatMap((post: any) => post.categories))
//   );

//   const filteredPosts = dataResult.filter((post: any) => {
//     if (categoryData !== "Select category") {
//       return post.categories.includes(categoryData);
//     }
//   });

//   return (
//     <Layout>
//       <select onChange={(e) => setCategoryData(e.target.value)}>
//         <option value="Select category">Select category</option>
//         {allCategories.map((category: any, index) => (
//           <option key={index} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>
//       <ul>
//         {filteredPosts.map((item: any) => (
//           <li key={item.id}>{item.projectTitle}</li>
//         ))}
//       </ul>
//     </Layout>
//   );
// };
// export const query = graphql`
//   query MyQuery {
//     allContentfulProjects {
//       nodes {
//         id
//         categories
//         slug
//         projectTitle
//       }
//     }
//   }
// `;
// export default Category;
