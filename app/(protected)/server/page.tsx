import ShowSession from "@/app/auth/show-session/ShowSession";
import { CurrentUser } from "@/lib/auth";

const ServerPage = async () => {
  const currentUser = await CurrentUser();
  return <ShowSession user={currentUser} label="server component" />;
};

export default ServerPage;
