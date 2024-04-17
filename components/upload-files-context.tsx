"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type FileUploadContextProps = {
  file?: File | null
  files: any[]
  draftImg?: string | null
  onSetFiles: (files: any[]) => void
  onSetDraftImg: (img: string | null, fileId?: Id<"_storage">) => void
  onDeletePostFile: (opts: { fileId: Id<"_storage">, postId: Id<"posts">, deletePreview: boolean }) => void
  onFileSelected: (file: File | null) => void
}

export const FileUploadContext = React.createContext<FileUploadContextProps | null>(null);

function useFileUpload() {
  const context = React.useContext(FileUploadContext);

  if (!context) {
    throw new Error("useFileUpload must be used within a <FileUploadProvider />");
  }

  return context;
}

const FileUploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [draftImg, setDraftImg] = React.useState<string | null>()
  const [file, setFile] = React.useState<File | null>()
  const [files, setFiles] = React.useState<any[]>([])
  const { id: postId } = useParams<{ id: Id<"posts"> }>()

  const deleteFile = useMutation(api.posts.deleteFile)

  const onFileSelected = (file: File | null) => {
    setFile(file)
  }

  const onDeleteFile = async (url: string | null, fileId?: Id<"_storage">) => {
    setDraftImg(url)

    if (!url && fileId) {
      await deleteFile({ imgFileId: fileId, postId })
    }
  }

  const onDeletePostFile = async ({
    fileId,
    postId,
    deletePreview
  }: {
    fileId: Id<"_storage">,
    postId: Id<"posts">,
    deletePreview: boolean
  }) => {
    deletePreview && setFile(null)
    await deleteFile({ imgFileId: fileId, postId })
  }

  return (
    <FileUploadContext.Provider
      value={{
        file,
        files,
        draftImg,
        onFileSelected,
        onSetFiles: setFiles,
        onSetDraftImg: onDeleteFile,
        onDeletePostFile
      }}
    >
      {children}
    </FileUploadContext.Provider>
  )
}

export {
  FileUploadProvider,
  useFileUpload,
}
