import { Button } from "@/components/ui/button";
import { useSendSMS } from "../api-services/send-sms-api";
import { toast } from "sonner";
import React, { useEffect } from "react";

interface SendSMSProps {
  userUuid: string;
}

function SendSMS({ userUuid }: SendSMSProps) {
  const { mutateAsync, isPending, isSuccess } = useSendSMS();

  const handleSendSMS = async () => {
    try {
      await mutateAsync(userUuid);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send SMS";
      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("SMS sent successfully");
    }
  }, [isSuccess]);

  return (
    <div>
      <Button size="sm" onClick={handleSendSMS} disabled={isPending}>
        {isPending ? "Sending..." : "Resend SMS"}
      </Button>
    </div>
  );
}

export default SendSMS;
