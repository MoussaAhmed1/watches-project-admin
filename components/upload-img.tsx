import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

function ImgUpload({ imageLink, name, selectedFile,
  setSelectedFile }: { imageLink?: string, name?: string, selectedFile:string | undefined, setSelectedFile:(file:string)=>void }) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(selectedFile);

  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };



  // handleUploadImage old upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center"
    >
      <div className="relative ">
        <Avatar className="h-16 w-16 " onClick={() => { fileInputRef?.current?.click() }}>
          <AvatarImage
            src={previewUrl ?? imageLink ?? ""}
            alt={name ?? ""}
            className="border-1 rounded bg-gray-200"
          />
          {<AvatarFallback>?</AvatarFallback>}
          <input ref={fileInputRef} type="file" onChange={handleFileSelect} hidden />
        </Avatar>
      </div>
    </div>
  );
}

export default ImgUpload;
