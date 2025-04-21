"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/utils/network";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Store, User, LucideIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface Store {
  id: string;
  name: string;
  country: string;
  state: string;
  website: string;
  address: string;
  whatsapp: string;
  type: string;
  created_at: string;
}

interface Order {
  id: number;
  amount: number;
  status: string;
  shipping_name: string;
  shipping_country: string;
  shipping_lga: string;
  shipping_state: string;
  shipping_address: string;
  shipping_phone: string;
  shipping_postal: string;
  createdAt: string;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  profile_picture: string;
  company_name: string;
  role: string;
  status: string;
  category: string;
  contact_name: string;
  region: string;
  created_at: string;
}

interface DistributorDetailsProps {
  id: string;
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function DistributorDetails({ id }: DistributorDetailsProps) {
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      request<User>({
        url: `users/agent/user/${id}`,
        method: "GET",
      }),
  });

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", id],
    queryFn: () =>
      request<Order[]>({
        url: `orders/agent/all/${id}`,
        method: "GET",
      }),
  });

  const { data: storesData, isLoading: isLoadingStores } = useQuery({
    queryKey: ["stores", id],
    queryFn: () =>
      request<Store[]>({
        url: `stores/agent/distributor/all/${id}`,
        method: "GET",
      }),
  });

  const isLoading = isLoadingUser || isLoadingOrders || isLoadingStores;

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  const user = userData;
  const orders = ordersData || [];
  const stores = storesData || [];

  if (!user) {
    return (
      <div className="container mx-auto py-6">
        <EmptyState
          icon={User}
          title="User Not Found"
          description="The requested user could not be found."
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Link href="/crm" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft className="w-4 h-4" />
      </Link>
      <h1 className="text-3xl font-bold mb-6">{user.full_name}</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="stores">Stores</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader className="pl-0">
              <CardTitle className="text-2xl font-bold">
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{user.company_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{user.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium">{user.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge
                    variant={
                      user.status === "UN_VERIFIED" ? "destructive" : "default"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">{formatDate(user.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader className="pl-0">
              <CardTitle className="text-2xl font-bold">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="No Orders Found"
                  description="This user hasn't placed any orders yet."
                />
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="font-medium">#{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium">
                              ₦{order.amount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <Badge
                              variant={
                                order.status === "PENDING"
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-gray-500">
                              Shipping Address
                            </p>
                            <p className="font-medium">
                              {order.shipping_address}, {order.shipping_lga},{" "}
                              {order.shipping_state}, {order.shipping_country}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stores">
          <Card>
            <CardHeader className="pl-0">
              <CardTitle className="text-2xl font-bold">Stores</CardTitle>
            </CardHeader>
            <CardContent>
              {stores.length === 0 ? (
                <EmptyState
                  icon={Store}
                  title="No Stores Found"
                  description="This user hasn't created any stores yet."
                />
              ) : (
                <div className="space-y-4">
                  {stores.map((store) => (
                    <Card key={store.id}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Store Name</p>
                            <p className="font-medium">{store.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Type</p>
                            <Badge>{store.type}</Badge>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{store.address}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">WhatsApp</p>
                            <p className="font-medium">{store.whatsapp}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <a
                              href={store.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {store.website}
                            </a>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Created At</p>
                            <p className="font-medium">
                              {formatDate(store.created_at)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
