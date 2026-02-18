// Simple API smoke test — run after starting the dev server
// node ./scripts/test-api.js

(async () => {
  const base = "http://localhost:3000";
  try {
    console.log("GET /api/news");
    let res = await fetch(`${base}/api/news`);
    console.log("status:", res.status);
    const news = await res.json();
    console.log("articles:", Array.isArray(news) ? news.length : "invalid response");

    console.log("POST /api/contact");
    res = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "API Test", email: "apitest@example.com", subject: "smoke", message: "Hello from test script" }),
    });
    console.log("status:", res.status);
    console.log(await res.json());

    // If ADMIN_TOKEN is provided in env, try the admin GET
    if (process.env.ADMIN_TOKEN) {
      console.log("GET /api/contact (admin)");
      res = await fetch(`${base}/api/contact`, {
        method: "GET",
        headers: { "x-admin-token": process.env.ADMIN_TOKEN },
      });
      console.log("status:", res.status);
      console.log(await res.json());
    } else {
      console.log("Skipping admin GET: set ADMIN_TOKEN in env to test");
    }

    if (process.env.ADMIN_TOKEN) {
      console.log("GET /api/contact/export (admin CSV)");
      res = await fetch(`${base}/api/contact/export?limit=10`, {
        method: "GET",
        headers: { "x-admin-token": process.env.ADMIN_TOKEN },
      });
      console.log("status:", res.status);
      const text = await res.text();
      console.log(text.split('\n').slice(0,5).join('\n'));
    }
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
})();
