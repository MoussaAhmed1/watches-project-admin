import { getImageUrl } from "@/actions/storage-actions";
import { toFormData } from "axios";
import { useCallback } from "react";


function UseImagesStore() {
    // store
    const getUrls = useCallback(
        async (fileList: FileList | File) => {
            const formData = new FormData();
            console.log(fileList);
            toFormData(fileList, formData);
            let imagesUrls: string[] = [];
            if (fileList instanceof FileList) {
                const imagesArray = Array.from(fileList);
                const _images: FormData[] = [];
                await imagesArray.forEach((img) => {
                    _images.push(new FormData());
                    _images[_images.length - 1].set('file', img);
                });
                imagesUrls = await Promise.all(
                    _images.map(async (img) => (await getImageUrl({ image: img })) as string)
                );
            } else {
                const image = new FormData();
                image.set('file', fileList);
                imagesUrls = await getImageUrl({ image })
            }
            return imagesUrls;
        },
        [],
    )
    return { getUrls }
}

export default UseImagesStore