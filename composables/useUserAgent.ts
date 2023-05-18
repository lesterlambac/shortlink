type UserAgent = {
  userAgent: string | null,
  ip?: string,
}


export function useUserAgent(): UserAgent | null {

  if (process.server) {
    const nuxtApp = useNuxtApp();

    const req = nuxtApp.ssrContext?.event.node.req;

    if (nuxtApp.ssrContext && req) {
      const ip = req.headers['x-forward-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];

      return {
        userAgent: userAgent || '',
        ip: typeof ip === 'string' ? ip : ip?.[0],
      }
    }
  } else {
    const userAgent = navigator.userAgent;

    return {
      userAgent,
      ip: undefined,
    }
  }

  return null;
}