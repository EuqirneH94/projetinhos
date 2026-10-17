export function diagnostic(event, error, fields = {}) {
    const e = error instanceof Error ? error : error === undefined ? undefined : new Error(String(error));
    const redact = (s) => s.replace(/(?<![A-Za-z0-9_-])[A-Za-z0-9_-]{43}(?![A-Za-z0-9_-])/g, '[REDACTED_TOKEN]');
    console.error(JSON.stringify({ time: new Date().toISOString(), event, pid: process.pid, ppid: process.ppid,
        node: process.version, platform: process.platform, ...fields,
        ...(e ? { error: { name: e.name, code: e.code, message: redact(e.message), stack: redact(e.stack ?? '') } } : {}) }));
}
//# sourceMappingURL=diagnostics.js.map