"use client";
import GenericTable from "@/components/ui/react-table";
import React from "react";
import { allFactoryDistributors } from "./components/table-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateAccount from "./components/create-account";
import { useGetAllUsers } from "./api-services/get-all-user-api";

function Dashboard() {
  const { data, isLoading, isFetching } = useGetAllUsers();
  const datar = React.useMemo(() => data || [], [data]);
  const [tab, setTab] = React.useState<"users" | "create-user">("users");
  if (isLoading || isFetching)
    return <div className="flex items-center w-full h-screen">Loading...</div>;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Tabs defaultValue="users" className="w-full">
        <div className="flex items-center justify-center my-4">
          <TabsList>
            <TabsTrigger value={tab}>Account</TabsTrigger>
            <TabsTrigger value={tab === "users" ? "create-user" : "users"}>
              Create User
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={tab} className="w-full">
          <div className="border border-gray-200 p-4 rounded-lg">
            <GenericTable data={datar} columns={allFactoryDistributors} />
          </div>
        </TabsContent>
        <TabsContent value={tab === "users" ? "create-user" : "users"}>
          <div>
            <CreateAccount setTab={setTab} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Dashboard;
