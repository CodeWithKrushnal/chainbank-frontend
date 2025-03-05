import { Card } from "@/components/ui/card.tsx";
import { User } from "@/types/types.ts";

const ProfileCard = ({ user }: { user: User | null }) => {
  return (
    <Card className="rounded-2xl p-6 shadow-none border">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="rounded-full object-cover"
            style={{ height: "80px", width: "80px" }}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">{user?.full_name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-700">Username:</p>
              <p className="text-gray-700">{user?.username}</p>
              <p className="font-medium text-gray-700">Email:</p>
              <p className="text-gray-700">{user?.email}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">User ID:</p>
              <p className="text-gray-700">{user?.user_id}</p>
              <p className="font-medium text-gray-700">Wallet ID:</p>
              <p className="text-gray-700">{user?.wallet_id}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;