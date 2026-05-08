export async function GET() {
  try {
    const res = await fetch(
      "https://www.verifiedequalaccess.com/backend/index.php/api/pages/the-legal",
      { cache: "no-store" }
    );

    const data = await res.json();

    // ✅ Parse content here (so frontend stays clean)
    let parsedContent = data.content;

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