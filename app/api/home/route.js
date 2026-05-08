export async function GET() {
  try {
    const res = await fetch(
      "https://www.verifiedequalaccess.com/backend/index.php/api/pages/home",
      { cache: "no-store" }
    );

    const data = await res.json();

    return Response.json(data);

  } catch (error) {
    console.error(error);
    return Response.json({ error: "API failed" }, { status: 500 });
  }
} git add .
git commit -m "Fix legal API parsing"
git push