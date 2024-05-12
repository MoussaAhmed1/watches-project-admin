import { Card } from "@/components/ui/card";
import UserIcon from "../../../public/assets/user.png";
import Image from "next/image";
import { ClientInfo, FamilyMember } from "@/types/reservations";
interface IProps {
  user: { id: string, name: string; avatar: string };
}

function UserInfoCard({ user }: IProps) {
  return (
    <Card className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-1 py-6 md:p-3 xl:p-4 flex-col">
      <h6
        style={{ paddingBottom: "1px" }}
        className="text-xl dark:text-white font-semibold leading-5"
      >
        User Info
      </h6>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        {
          <div className="flex flex-col justify-start items-start flex-shrink-0">
            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8">
              <Image
                width={50}
                height={50}
                src={UserIcon || user?.avatar}
                alt="avatar"
              />
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                  {user?.name}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </Card>
  );
}

export default UserInfoCard;
