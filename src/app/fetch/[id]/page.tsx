async function generateAuthSecret() {
  const res = await fetch("https://generate-secret.vercel.app/32", {
    next: {
      tags: ["test"],
    },
  });
  const text = await res.text();
  return text;
}

export default async function FetchPage({
  params,
}: {
  params: { id: string };
}) {
  const secret = await generateAuthSecret();
  return (
    <main className="container mx-auto">
      <p>fetch</p>
      <h1>param id: {params.id}</h1>
      <h1>secret: {secret}</h1>
      <h2>{new Date().toString()}</h2>
    </main>
  );
}

export function generateStaticParams() {
  return [1, 2, 3, 4].map((n) => ({ id: n.toString() }));
}
