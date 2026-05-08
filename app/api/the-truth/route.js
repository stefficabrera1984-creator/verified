export async function GET() {
  try {
    const res = await fetch(
      "https://www.verifiedequalaccess.com/backend/index.php/api/pages/the-truth",
      { cache: "no-store" }
    );

    const data = await res.json();

    let parsedContent = data.content;

    // ✅ Parse if needed
    if (typeof data.content === "string") {
      try {
        parsedContent = JSON.parse(data.content);
      } catch (e) {
        console.error("Parse error:", e);
        parsedContent = {};
      }
    }

    return Response.json({
      ...data,
      content: parsedContent || {}
    });

  } catch (error) {
    return Response.json({ error: "API failed" }, { status: 500 });
  }
}