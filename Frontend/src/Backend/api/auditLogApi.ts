import { apiClient } from '@/lib/api';

export const auditLogApi = {
  
  getAll: async () => {
    const response = await apiClient.getAuditLogs();
    return response.logs;
  },

  // Log an audit event
  logEvent: async (event: string, metadata?: Record<string, unknown>) => {
    const response = await apiClient.logAuditEvent(event, metadata);
    return response.log;
  },
};
