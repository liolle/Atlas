"use client";
import React, { Dispatch, createContext, useState } from "react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  options: {
    reference?: string;
    maxCharacter: number;
    onStatusChange: Dispatch<React.SetStateAction<boolean>>;
  };
}

interface PostAddContextProps {
  maxCharacter: number;
  isSending: boolean;
  files: File[];
  content: string;
  setFiles: Dispatch<React.SetStateAction<File[]>>;
  setIsSending: Dispatch<React.SetStateAction<boolean>>;
  setContent: Dispatch<React.SetStateAction<string>>;
  onStatusChange: Dispatch<React.SetStateAction<boolean>>;
}

export const PostAddContext = createContext<PostAddContextProps>(
  {} as PostAddContextProps
);

export function PostAddProvider({ children, options }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  return (
    <PostAddContext.Provider
      value={{
        files: files,
        setFiles: setFiles,
        content: content,
        setContent: setContent,
        isSending: isSending,
        setIsSending: setIsSending,
        onStatusChange: options.onStatusChange,
        maxCharacter: options.maxCharacter
      }}
    >
      {children}
    </PostAddContext.Provider>
  );
}
