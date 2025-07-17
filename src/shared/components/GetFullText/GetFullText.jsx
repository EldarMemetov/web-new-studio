export function GetFullText() {
  return `<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8">
    <title>Virtual Terminal</title>
  </head>
  <body>
    <h1 id="welcome">Welcome, user!</h1>
    <h2>Qvrix — ваш партнер в галузі сучасної
     веб-розробки та відео-продукції</h2>
    <p id="status">Initializing terminal...</p>

    <script>
      const messages = [
        'Loading core modules...',
        'Connecting to the server...',
        'Verifying identity...',
        'Access granted.',
        'System online.',
        'Welcome to Qvrix Terminal!'
      ];

      let index = 0;
      const status =
      document.getElementById('status');

      function showNext() {
        if (index < messages.length) {
          status.textContent = messages[index];
          index++;
          setTimeout(showNext, 1000);
        } else {
          status.textContent = '>>>
         Terminal ready.';
        }
      }

      setTimeout(showNext, 1000);
    </script>
  </body>
</html>`;
}
