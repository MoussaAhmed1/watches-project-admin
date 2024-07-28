import { cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string | StaticImageData
    alt: string
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

function ProfileImg({
    src,
    alt,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: IProps) {
    return (
        <div className={cn("overflow-hidden w-[100px] h-[100px] flex justify-center relative rounded-full ", className)} {...props}>
            <Image
                src={src}
                alt={alt}
                fill
                className={"object-cover rounded-full border-2"}
            />
        </div>
    )
}

export default ProfileImg