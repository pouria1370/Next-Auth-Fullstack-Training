import RoleGaurd from "../setting/_Components/RoleGaurd";
import ShowAdminStaffs from "./_Components/ShowAdminStaffs";

const AdminPage = () => {
  return (
    <RoleGaurd>
      <ShowAdminStaffs />
    </RoleGaurd>
  );
};

export default AdminPage;
