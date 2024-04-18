import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/components/upload-files-context";
import { IconX } from "@tabler/icons-react";
import { type Id } from "@/convex/_generated/dataModel";

type Props = {
  fileId?: Id<"_storage">,
  isPublished: boolean
  isVideo: boolean
  isImage: boolean
}

type PreviewProps = {
  src: string
  isPublished: boolean
  onClick: () => void
}

const DeletePreviewButton = ({
  children,
  onClick
}: {
  children: React.ReactNode,
  onClick: () => void
}) => {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      className="flex items-center absolute top-2 right-4 p-2 h-8 text-purple-500 font-semibold"
    >
      {children} <IconX className="ml-1.5 size-4" />
    </Button>
  )

}

const ImagePreview = ({ src, isPublished, onClick }: PreviewProps) => {
  return (
    <div className="relative mt-4 size-full">
      <Image
        src={src}
        alt="image file"
        width={500}
        height={500}
        className="size-full max-h-[500px] object-contain"
        // unoptimized <-------- disable if necessary ⚠️
      />
      {!isPublished && (
        <DeletePreviewButton onClick={onClick}>
          Delete image
        </DeletePreviewButton>
      )}
    </div>
  )
}

const VideoPreview = ({ src, isPublished, onClick }: PreviewProps) => {
  return (
    <div className="relative mt-4 size-full">
      <video
        controls
        muted
        src={src}
        className="block size-full max-h-[500px] object-contain"
      />
      {!isPublished && (
        <DeletePreviewButton onClick={onClick}>
          Delete video
        </DeletePreviewButton>
      )}
    </div>
  )
}

export function FilePreviewThumbnail({ fileId, isVideo, isImage, isPublished }: Props) {
  const { file, draftImg, onSetDraftImg, onFileSelected, onSetFiles } = useFileUpload()

  const isFileImage = file?.type.includes("image")
  const isFileVideo = file?.type.includes("video")

  return (
    <>
      {file && isFileVideo && (
        <VideoPreview
          isPublished={isPublished}
          src={URL.createObjectURL(file)}
          onClick={() => {
            onSetFiles([])
            onFileSelected(null)
          }}
        />
      )}
      {file && isFileImage && (
        <ImagePreview
          src={URL.createObjectURL(file)}
          isPublished={isPublished}
          onClick={() => {
            onSetFiles([])
            onFileSelected(null)
          }}
        />
      )}
      {(!file && draftImg && isImage) && (
        <ImagePreview
          src={draftImg}
          isPublished={isPublished}
          onClick={() => onSetDraftImg(null, fileId)}
        />
      )}
      {(!file && draftImg && isVideo) && (
        <VideoPreview
          isPublished={isPublished}
          src={draftImg}
          onClick={() => onSetDraftImg(null, fileId)}
        />
      )}
    </>
  );
}
