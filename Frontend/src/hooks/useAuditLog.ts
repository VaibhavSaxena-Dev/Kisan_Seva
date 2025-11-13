import { useState, useEffect } from "react";
import { auditLogApi } from "@/Backend/api/auditLogApi";

export interface AuditLogEntry {
  id: string;
  event: string;
  email: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export const useAuditLog = (): AuditLogEntry[] => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const auditLogs = await auditLogApi.getAll();
        setLogs(auditLogs);
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return logs;
};

export const useAuditLogForUser = (
  email?: string | null
): AuditLogEntry[] => {
  const logs = useAuditLog();

  return logs.filter((entry) => {
    if (!email) return false;
    const normalised = email.trim().toLowerCase();
    return entry.email === normalised;
  });
};

