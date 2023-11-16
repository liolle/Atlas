import { PostAddContextFile } from "@/src/context/PostAddProviderFile";
import React, { useContext } from "react";
import { X } from "lucide-react";
import Image from "next/image";

const FileArea = () => {
  const { files } = useContext(PostAddContextFile);

  if (files.length <= 0) return <></>;

  return (
    <div
      className={` grid h-[18rem] w-full  ${
        files.length > 1 ? "grid-cols-2" : "grid-cols-1"
      } gap-2`}
    >
      {files.map((file) => {
        return <PreviewFile key={file.name} file={file} />;
      })}
    </div>
  );
};

const PreviewFile = ({ file }: { file: File }) => {
  const { setFiles } = useContext(PostAddContextFile);

  const handleDelete = () => {
    setFiles((prev) => prev.filter((value) => value.name != file.name));
  };

  return (
    <div className=" relative h-[18rem] overflow-hidden rounded-xl ">
      <X
        onClick={handleDelete}
        className=" absolute right-2 top-2 z-10 h-7 w-7 cursor-pointer rounded-full bg-bgc p-1 text-content hover:text-accent-1"
      />
      <Image
        className=" object-cover"
        src={URL.createObjectURL(file)}
        fill
        alt="I"
      />

      <div className="absolute bottom-2 left-2 z-10    p-1 text-content ">
        <span>{formatFileSize(file.size)}</span>
      </div>
    </div>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default FileArea;
