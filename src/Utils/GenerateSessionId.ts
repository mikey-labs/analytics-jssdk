import { MurmurHash3 } from "../Core/Footprint/MurmurHash3";

export function generateSessionId(footprint: string) {
  return MurmurHash3.x86.hash128(footprint + Date.now(), 31);
}