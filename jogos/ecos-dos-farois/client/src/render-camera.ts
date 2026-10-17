import { Box3, Ray, Vector3 } from "three";

/** A swept camera body, rather than a zero-width ray, keeps the near plane out
 * of wall corners. The target is the actor's chest; gameplay collision is
 * independent and never changed here. */
export function cameraPosition(
  target: Vector3,
  desired: Vector3,
  obstacles: readonly Box3[],
  ground: (x: number, z: number) => number,
  radius = 0.32,
): { position: Vector3; distance: number; blocked: boolean } {
  const vector = desired.clone().sub(target);
  const requested = vector.length();
  if (requested < 1e-5)
    return { position: target.clone(), distance: 0, blocked: false };
  const direction = vector.divideScalar(requested);
  const ray = new Ray(target, direction);
  let distance = requested;
  for (const bounds of obstacles) {
    const expanded = bounds.clone().expandByScalar(radius);
    // A player on a collider boundary must not send the camera through the
    // building to its far exit. Collapse locally; let the player orbit out.
    if (expanded.containsPoint(target)) {
      distance = Math.min(distance, 0.45);
      continue;
    }
    const intersection = ray.intersectBox(expanded, new Vector3());
    if (intersection)
      distance = Math.min(distance, Math.max(0.35, intersection.distanceTo(target) - 0.04));
  }
  // Search along the whole segment: testing only the destination lets a
  // camera pass through a ridge and emerge on its other side.
  const steps = Math.max(1, Math.ceil(distance / 0.3));
  for (let i = 1; i <= steps; i++) {
    const at = (distance * i) / steps;
    const point = target.clone().addScaledVector(direction, at);
    if (point.y < ground(point.x, point.z) + radius) {
      distance = Math.max(0.35, (distance * (i - 1)) / steps);
      break;
    }
  }
  const position = target.clone().addScaledVector(direction, distance);
  position.y = Math.max(position.y, ground(position.x, position.z) + radius);
  return { position, distance, blocked: distance < requested - 0.001 };
}
