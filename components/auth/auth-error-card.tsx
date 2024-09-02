import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./auth-backButton";
import Header from "./auth-header";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header lable="oops! something went wrong" />
      </CardHeader>
      <CardFooter>
        <BackButton lable="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
