// Calculate position based on angle and radius
export const getPosition = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180
  return { x: radius * Math.cos(rad), y: -radius * Math.sin(rad) }
}
