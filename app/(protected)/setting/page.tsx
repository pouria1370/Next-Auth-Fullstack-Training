import { auth, signOut } from "@/auth";
import React from "react";
const SettingPage = async () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">signout</button>
    </form>
  );
};

export default SettingPage;
