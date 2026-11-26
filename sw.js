// GTX-A 시간표 — 서비스 워커
// 안드로이드 크롬은 페이지에서 new Notification() 을 막기 때문에, 시스템 알림은 이 서비스 워커를 통해 띄웁니다.
// (시간표 계산·진동 타이밍은 여전히 페이지가 열려 있어야 동작합니다.)

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

// 알림을 누르면 열려 있는 시간표 화면으로 돌아가고, 없으면 새로 엽니다.
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of list) if ("focus" in c) return c.focus();
    return self.clients.openWindow(self.registration.scope);
  })());
});
