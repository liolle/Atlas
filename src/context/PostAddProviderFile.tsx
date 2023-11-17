"use client";
import React, { Dispatch, createContext, useState } from "react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface PostAddContextProps {
  files: File[];
  setFiles: Dispatch<React.SetStateAction<File[]>>;
}

export const PostAddContextFile = createContext<PostAddContextProps>(
  {} as PostAddContextProps
);

export function PostAddProviderFile({ children }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <PostAddContextFile.Provider
      value={{
        files: files,
        setFiles: setFiles
      }}
    >
      {children}
    </PostAddContextFile.Provider>
  );
}
