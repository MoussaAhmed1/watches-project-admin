import Image from "next/image";
import userAvatar from "../../public/assets/user-avatar.png";
function AvatarPreview({ selectedAvatar }: { selectedAvatar?: string}) {


  return (
    <div className="w-full flex justify-center">
      <div style={{ width: "70px", height: '70px', overflow: "hidden", position: 'relative', }}>
        <Image
          src={selectedAvatar ?? userAvatar}
          alt="selected Avatar"
          fill
          objectFit="cover"
          style={{
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
}

export default AvatarPreview;
