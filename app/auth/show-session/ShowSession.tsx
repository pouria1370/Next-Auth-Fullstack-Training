import { TExtendedUser } from "@/auth.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
interface IProps {
  label: string;
  user: TExtendedUser;
}
const ShowSession = ({ label, user }: IProps) => {
  return (
    <Card className="w-[600px] mt-2">
      <CardHeader>{label}</CardHeader>
      <CardContent>
        <span className="flex justify-between items-center p-3">
          <label className="text-slate-600">address</label>
          <label className="bg-slate-100 p-2 truncate max-w-[300px]">
            {user?.address}
          </label>
        </span>
        <span className="flex justify-between items-center p-3">
          <label className="text-slate-600">email</label>
          <label className="bg-slate-100 p-2 truncate max-w-[300px]">
            {user?.email}
          </label>
        </span>
        <span className="flex justify-between items-center p-3">
          <label className="text-slate-600">id</label>
          <label className="bg-slate-100 p-2 truncate max-w-[300px]">
            {user?.userID}
          </label>
        </span>
        <span className="flex justify-between items-center p-3">
          <label className="text-slate-600">image</label>
          <label className="bg-slate-100 p-2 truncate max-w-[300px]">
            <Avatar>
              <AvatarImage src={user?.image} />
            </Avatar>
            {}
          </label>
        </span>
        <span className="flex justify-between items-center p-3">
          <label className="text-slate-600">Name</label>
          <label className="bg-slate-100 p-2 truncate max-w-[300px]">
            {user?.name}
          </label>
        </span>
        <span className="flex justify-between items-center p-3">
          <label className="text-slate-600">User?id</label>
          <label className="bg-slate-100 p-2 truncate max-w-[300px]">
            {user?.userID}
          </label>
        </span>
        <span className="flex justify-between items-center p-3">
          <label className="text-slate-600">2af</label>
          <Badge
            variant={user?.IsTwofactoredEnabled ? "success" : "error"}
            className="p-2 truncate max-w-[300px]"
          >
            {user?.IsTwofactoredEnabled ? "true" : "false"}
          </Badge>
        </span>
      </CardContent>
    </Card>
  );
};

export default ShowSession;
