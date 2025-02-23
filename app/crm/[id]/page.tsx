import EditUserAccount from "@/features/dashboard/components/edit-user-account";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditUserAccount id={id} />;
}

export default page;
