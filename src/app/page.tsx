import { unstable_cache } from "next/cache";

async function generateAuthSecret() {
  const res = await fetch("https://generate-secret.vercel.app/32");
  const text = await res.text();
  return text;
}

function unstableAuthSecret() {
  return unstable_cache(generateAuthSecret, ["authSecret"], {
    tags: ["test"],
  })();
}

export default async function Home() {
  const secret = await unstableAuthSecret();
  return (
    <main className="container mx-auto">
      <p>unstable_cache</p>
      <h1>secret: {secret}</h1>
      <h2>{new Date().toString()}</h2>
    </main>
  );
}
