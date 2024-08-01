"use client"

import Image, { StaticImageData } from "next/image"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";


interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string|StaticImageData
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
                            alt={`${src}`}
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
            <DialogContent className="w-full sm:max-w-[425px] ">
                <div className={"space-y-3 h-full w-full flex justify-center relative"} {...props}>
                    <div className="overflow-hidden rounded-md  flex justify-center ">
                        <Image
                            src={src}
                            alt={`${src}`}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover",
                            )}
                        />
                    </div>
                    <Button onClick={() => {window.open(`${src}`, "_blank")}} className="absolute right-[-22%] top-[-4%] z-10">
                        <Link/>
                    </Button>
            </div>
        </DialogContent>
        </Dialog >

    )
}