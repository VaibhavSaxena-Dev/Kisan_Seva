import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAuditLogForUser } from "@/hooks/useAuditLog";
import { useMemo } from "react";

const ActivityLog = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const logs = useAuditLogForUser(user?.email);

  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });
  }, [logs]);

  const formatter = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return null;
    }
  }, []);

  const resolveEventLabel = (event: string) => {
    switch (event) {
      case "register":
        return t("auditEventRegister");
      case "register_failed":
        return t("auditEventRegisterFailed");
      case "login":
        return t("auditEventLogin");
      case "login_failed":
        return t("auditEventLoginFailed");
      case "logout":
        return t("auditEventLogout");
      default:
        return event;
    }
  };

  const resolveDetailLabel = (metadata?: Record<string, unknown>) => {
    if (!metadata || typeof metadata !== "object") return "";
    if ("reason" in metadata && typeof metadata.reason === "string") {
      switch (metadata.reason) {
        case "email_exists":
          return t("auditReasonEmailExists");
        case "user_not_found":
          return t("auditReasonUserNotFound");
        case "invalid_password":
          return t("auditReasonInvalidPassword");
        default:
          return t("auditReasonUnknown");
      }
    }
    if ("name" in metadata && typeof metadata.name === "string") {
      return metadata.name;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t("activityLogTitle")}</CardTitle>
              <CardDescription>{t("activityLogSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              {sortedLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t("activityLogEmpty")}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {t("activityLogTableEvent")}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {t("activityLogTableDetails")}
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {t("activityLogTableTimestamp")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {sortedLogs.map((entry) => (
                        <tr key={entry.id} className="bg-background/60 hover:bg-muted transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-foreground">
                            {resolveEventLabel(entry.event)}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {resolveDetailLabel(entry.metadata)}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {formatter
                              ? formatter.format(new Date(entry.timestamp))
                              : new Date(entry.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ActivityLog;

