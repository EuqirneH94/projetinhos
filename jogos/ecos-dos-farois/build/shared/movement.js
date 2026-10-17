import { OBSTACLES, WORLD } from './config.js';
export const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
export function blocked(x, z, radius = WORLD.radius) {
    return OBSTACLES.some(o => {
        if (o.r !== undefined)
            return Math.hypot(x - o.x, z - o.z) < radius + o.r;
        const dx = Math.max(Math.abs(x - o.x) - o.w / 2, 0);
        const dz = Math.max(Math.abs(z - o.z) - o.d / 2, 0);
        return dx * dx + dz * dz < radius * radius;
    });
}
export function move(position, dx, dz, dt, speed = WORLD.speed, radius = WORLD.radius) {
    const length = Math.hypot(dx, dz);
    if (!length || !Number.isFinite(length) || !Number.isFinite(dt))
        return;
    const scale = speed * Math.min(Math.max(dt, 0), 0.05) / Math.max(1, length);
    const x = Math.max(WORLD.minX + radius, Math.min(WORLD.maxX - radius, position.x + dx * scale));
    const z = Math.max(WORLD.minZ + radius, Math.min(WORLD.maxZ - radius, position.z + dz * scale));
    if (!blocked(x, position.z, radius))
        position.x = x;
    if (!blocked(position.x, z, radius))
        position.z = z;
}
//# sourceMappingURL=movement.js.map