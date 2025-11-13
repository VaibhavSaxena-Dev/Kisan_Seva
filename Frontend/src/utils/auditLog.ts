type AuditLogEvent =
  | "register"
  | "register_failed"
  | "login"
  | "login_failed"
  | "logout";

export type AuditLogEntry = {
  id: string;
  event: AuditLogEvent;
  email: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

const LOG_STORAGE_KEY = "kisan-seva-audit-log";
const isBrowser = typeof window !== "undefined";

const listeners = new Set<() => void>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

if (isBrowser) {
  window.addEventListener("storage", (event) => {
    if (event.key === LOG_STORAGE_KEY) {
      emitChange();
    }
  });
}

const readLogFromStorage = (): AuditLogEntry[] => {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(LOG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) =>
      item && typeof item === "object" && typeof item.id === "string"
    ) as AuditLogEntry[];
  } catch (error) {
    console.error("Failed to read audit log", error);
    return [];
  }
};

const writeLogToStorage = (entries: AuditLogEntry[]) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(entries));
    emitChange();
  } catch (error) {
    console.error("Failed to persist audit log", error);
  }
};

const createId = () => {
  if (!isBrowser) {
    return `audit-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
  if (typeof window.crypto?.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `audit-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const subscribeToAuditLog = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getAuditLogSnapshot = (): AuditLogEntry[] => readLogFromStorage();

export const appendAuditLogEntry = (
  event: AuditLogEntry["event"],
  email: string,
  metadata?: Record<string, unknown>
) => {
  if (!email) return;

  const entry: AuditLogEntry = {
    id: createId(),
    event,
    email: email.trim().toLowerCase(),
    timestamp: new Date().toISOString(),
    metadata,
  };

  const currentLog = readLogFromStorage();
  const nextLog = [...currentLog, entry].slice(-500);
  writeLogToStorage(nextLog);
};

export const clearAuditLog = () => {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(LOG_STORAGE_KEY);
    emitChange();
  } catch (error) {
    console.error("Failed to clear audit log", error);
  }
};

export const getAuditLogForEmail = (email: string): AuditLogEntry[] => {
  if (!email) return [];
  const normalisedEmail = email.trim().toLowerCase();
  return readLogFromStorage().filter((entry) => entry.email === normalisedEmail);
};

