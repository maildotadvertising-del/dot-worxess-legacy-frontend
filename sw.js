// The DOT Team App moved to DOT worXess (https://dot-worxess.vercel.app) on 20 Nov 2026.
// This worker replaces the old one on every phone that had the app: it clears the old caches,
// unregisters itself and reloads open windows, which the site then redirects to the new app.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var windows = await self.clients.matchAll({ type: 'window' });
    windows.forEach(function (c) { c.navigate(c.url); });
  })());
});
