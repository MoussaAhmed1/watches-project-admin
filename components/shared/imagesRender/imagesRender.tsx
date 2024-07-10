import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";


interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function ImageRender({
    src,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: AlbumArtworkProps) {
    return (
        <Dialog>
            <DialogTrigger asChild >
                <div className={cn("space-y-3", className)} {...props}>
                    <div className="overflow-hidden rounded-md">
                        <Image
                            src={src}
                            alt={src}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-105 cursor-pointer",
                                aspectRatio === "portrait" ? "aspect-[2/2]" : "aspect-square"
                            )}
                        />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[425px]">
                <div className={"space-y-3 h-full w-full flex justify-center"} {...props}>
                    <div className="overflow-hidden rounded-md  flex justify-center">
                        <Image
                            src={src}
                            alt={src}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover",
                            )}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}