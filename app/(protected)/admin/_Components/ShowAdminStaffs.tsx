"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { adminServerHandler } from "@/lib/adminServerHandler";

const ShowAdminStaffs = () => {
  const toast = useToast();
  const routeHandler = async () => {
    const result = await fetch("/api/admin");
    if (!result.ok) {
      toast.toast({
        description: "your request could not be satisfied",
      });
    } else {
      toast.toast({
        description: "your request  be satisfied",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row border p-5">
        <Button onClick={routeHandler}>Test me in server action</Button>
      </div>
      <div
        onClick={async () => {
          const result = await adminServerHandler();
          if (result.error) {
            toast.toast({ description: "you have not successfully done it" });
          } else {
            toast.toast({ description: "you have  successfully done it" });
          }
        }}
        className="flex flex-row border p-5"
      >
        <Button>Test me in route handler</Button>
      </div>
    </div>
  );
};

export default ShowAdminStaffs;
