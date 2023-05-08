import { useNuxtApp } from "#app";
import { sendRedirect } from "h3";


export default function useExternalRedirect(url: string|null, code = 301): never | Promise<void>  {

  if (!url) {
    throw new Error("Original link not found.")
  }

  if (/^https?:\/\//.test(url)) {
    if (process.server) {

      const nuxtApp = useNuxtApp();

      if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
        return nuxtApp.callHook("app:redirected").then(() => {
          if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            return sendRedirect(nuxtApp.ssrContext.event, url, code);
          }
        })
      }
    }

    else {
      window.location.href = url;
    }
  }

  throw new Error("Cannot redirect to invalid URL.");
}