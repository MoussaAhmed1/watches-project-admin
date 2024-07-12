export type Language = "ar" | "en";


const changeLanguage = (language: Language , pathName : string ) : string => {
    
  const newLanguage = language
    let newPath: string;
    const pathParts = pathName.split("/");
    if (!pathParts[2]) {
      newPath = `${newLanguage}`;
    } else {
      newPath = `/${newLanguage}/${pathParts
        .splice(2, pathParts.length)
        .join("/")}`
    }
    return newPath
  };

export default changeLanguage