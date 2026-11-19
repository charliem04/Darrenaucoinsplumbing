/**
 * "Request this service" → the contact form, with that service already
 * chosen.
 *
 * The buttons are plain <a href="#contact"> links, so they still scroll
 * to the form without JavaScript. On click they also announce which
 * service was picked; ContactForm listens and pre-selects it — but only
 * if it is one of client.form.serviceOptions, so nothing can put a
 * value in the dropdown that the form would then refuse.
 *
 * A DOM event rather than shared React state, because the two ends live
 * in different sections and nothing else needs to know.
 */
export const REQUEST_SERVICE_EVENT = "da:request-service";

export function requestService(service: string) {
  window.dispatchEvent(new CustomEvent<string>(REQUEST_SERVICE_EVENT, { detail: service }));
}
