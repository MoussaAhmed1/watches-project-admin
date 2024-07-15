import { Card } from "@/components/ui/card";
import UserIcon from "../../../public/assets/user.png";
import ProfileImg from "@/components/shared/imagesRender/profileImg";
interface IProps {
  user: {
    phone: string; id: string, name: string; avatar: string
  };
}

function UserInfoCard({ user }: IProps) {
  const client_data_items =
    [
      {
        data_key: "Phone",
        data_value: user?.phone,
      },
      // {
      //   data_key: "Allergic reactions",
      //   data_value: user?.allergic_reactions,
      // },
      // {
      //   data_key: "Height",
      //   data_value: user?.height + " Cm",
      // },
      // {
      //   data_key: "Weight",
      //   data_value: user?.weight + " Kg",
      // },
      // {
      //   data_key: "Notes",
      //   data_value: user?.notes,
      // },
    ]
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
              <ProfileImg
                className="w-[50px] h-[50px]"
                src={user?.avatar || UserIcon}
                alt={user?.name}
              />
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                  {user?.name}
                </p>
              </div>
            </div>
          </div>
        }
        {client_data_items.map(({ data_key, data_value }) => (
          <div className="flex justify-between w-full border-t py-4" key={data_key}>
            <p className="text-base dark:text-white leading-4 text-gray-800">{data_key}</p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data_value ?? "-"}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default UserInfoCard;
