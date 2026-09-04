interface Env {}

export const onRequest: PagesFunction<Env> = async (context) => {
  const response = await context.next();
  const url = new URL(context.request.url);
  const newHeaders = new Headers(response.headers);

  // 1. Staging/Preview Protection: Block search engine crawlers from indexing *.pages.dev
  if (url.hostname.endsWith('.pages.dev')) {
    newHeaders.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // 2. Embeddable Widgets: Allow cross-origin framing and gamepad permissions for /embed/*
  if (url.pathname.startsWith('/embed/')) {
    newHeaders.delete('X-Frame-Options');
    newHeaders.set(
      'Permissions-Policy',
      'camera=(), geolocation=(), microphone=(self "*"), midi=(self "*"), gamepad=(self "*")'
    );
    newHeaders.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' blob:; frame-ancestors *;"
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};
