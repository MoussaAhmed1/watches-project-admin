import { cn } from "@/lib/utils"
import Image from "next/image"

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
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
        <div className={cn("overflow-hidden w-[100px] h-[100px] flex justify-center relative rounded-full", className)} {...props}>
            <Image
                src={src}
                alt={alt}
                fill
                className={cn(
                    "object-cover rounded-full",
                )}
            />
        </div>
    )
}

export default ProfileImg