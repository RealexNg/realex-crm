import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export const statusStates = {
  pending: "bg-orange-100 text-orange-900 border-orange-900",
  cancelled: "bg-red-100 text-red-400",
  rejected: "bg-red-100 text-red-400",
  un_verified: "bg-red-500 text-white",
  credit: "bg-green-100 text-green-800 border-green-800",
  active: "bg-green-100 text-green-800 border-green-800",
  success: "bg-green-100 text-green-800 border-green-800",
  verified: "bg-green-100 text-green-800 border-green-800",

  subscribed: "bg-green-100 text-green-500 border-green-500",
  admin: "bg-green-100 text-green-500 border-green-500",
  staff: "bg-purple-100 text-purple-900 border-purple-900",
  user: "bg-blue-100 text-blue-900 border-blue-900",
  debit: "bg-red-100 text-red-400",
  activated: "bg-green-100 text-green-800 border-green-800",
  suspended: "bg-orange-100 text-orange-400",
  sent: "bg-green-400 text-green-800 border-green-800",
  draft: "bg-secondary-hover text-text/70",
};

export function StatusBadge({
  status,
  className,
}: {
  status: keyof typeof statusStates | string;
  className?: string;
}) {
  const _status = status.toLowerCase() as keyof typeof statusStates;
  return (
    <Badge
      className={cn(
        statusStates[_status] || statusStates.pending,
        "flex min-w-fit justify-center rounded-lg text-xs font-medium",
        className
      )}
    >
      {status}
    </Badge>
  );
}
