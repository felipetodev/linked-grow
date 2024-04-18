import { IconPhotoPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFileUpload } from "../upload-files-context";
import { FilePond, registerPlugin } from 'react-filepond'

import "filepond/dist/filepond.min.css";

// @ts-ignore
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginMediaPreview
);

const label = `
Arrastra y suelta tu imagen o <span class="filepond--label-action font-semibold text-purple-500">Haga click para buscar</span>
<span class="block !text-xs mt-2">SVG, PNG, JPG or GIF (10MB max)</span>
`;

export function HeaderFileUpload() {
  const {
    files,
    draftImg,
    onFileSelected,
    onSetFiles,
  } = useFileUpload()

  return (
    <div className="ml-auto">
      <AlertDialog>
        <AlertDialogTrigger asChild disabled={!!draftImg}>
          <Button size="sm" variant="outline">
            <IconPhotoPlus className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            Agregar imagen
          </AlertDialogHeader>
          <FilePond
            files={files}
            onupdatefiles={onSetFiles}
            onremovefile={() => onFileSelected(null)}
            acceptedFileTypes={["image/*", "video/mp4"]}
            allowMultiple={false}
            imagePreviewMaxHeight={400}
            name="files"
            labelIdle={label}
            credits={false}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={files.length === 0}
              onClick={() => {
                onFileSelected(files[0].file)
              }}
              className={files.length > 0 ? "bg-green-600 text-white hover:bg-green-600/80" : ""}
            >
              Usar imagen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
