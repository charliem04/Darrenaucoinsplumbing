import { client } from "@/client.config";

/**
 * The online-booking band. DA has no scheduler, so with
 * `booking.provider: "none"` this renders nothing and the page is
 * exactly the live one.
 *
 * It exists so that adding one later (Cal.com is the likely choice) is
 * a config change plus filling in the branch below — not a rebuild.
 * When that happens: add the provider's origin to frame-src in
 * scripts/csp.mjs, or the build's drift check will fail (by design).
 */
export function BookingBand() {
  const booking = client.booking;
  if (booking.provider === "none") return null;

  // provider === "calcom": not built yet. Fail the build rather than
  // ship an empty band nobody designed.
  throw new Error(
    `[BookingBand] booking provider "${booking.provider}" is configured but the band is not implemented.`
  );
}
