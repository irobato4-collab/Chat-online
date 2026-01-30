self.addEventListener("push", (event) => {
  const data = event.data?.json();

  if (!data) return;

  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/badge.png",
    data: {
      room: data.room
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const room = event.notification.data?.room;
  if (!room) return;

  event.waitUntil(
    clients.openWindow(`/index.html?room=${room}`)
  );
});
