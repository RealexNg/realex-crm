import { DistributorDetails } from "../../../../features/dashboard/distributor/components/distributor-details";

export default async function DistributorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DistributorDetails id={id} />;
}
