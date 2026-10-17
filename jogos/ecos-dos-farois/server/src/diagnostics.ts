export function diagnostic(event: string, error?: unknown, fields: Record<string, unknown> = {}) {
  const e = error instanceof Error ? error : error === undefined ? undefined : new Error(String(error));
  const redact = (s: string) => s.replace(/(?<![A-Za-z0-9_-])[A-Za-z0-9_-]{43}(?![A-Za-z0-9_-])/g, '[REDACTED_TOKEN]');
  console.error(JSON.stringify({ time: new Date().toISOString(), event, pid: process.pid, ppid: process.ppid,
    node: process.version, platform: process.platform, ...fields,
    ...(e ? { error: { name: e.name, code: (e as NodeJS.ErrnoException).code, message: redact(e.message), stack: redact(e.stack ?? '') } } : {}) }));
}
