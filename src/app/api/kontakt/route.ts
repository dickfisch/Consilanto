import { Resend } from "resend";

/**
 * Kontaktformular-Versand über Resend.
 *
 * Benötigte Umgebungsvariablen (in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  – der API-Key aus dem Resend-Dashboard (geheim)
 *   CONTACT_TO      – Adresse, an die Anfragen gehen (im Test = die Resend-Login-Mail)
 *   CONTACT_FROM    – optional, Absender. Default = Resend-Testabsender.
 *                     Stufe 2 später: "Consilanto <kontakt@consilanto.de>"
 */

const FROM = process.env.CONTACT_FROM || "Consilanto Website <onboarding@resend.dev>";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  // Honeypot: unsichtbares Feld – wenn ausgefüllt, ist es ein Bot.
  const honey = String(body.company ?? "").trim();

  // Bots still „erfolgreich" abweisen, ohne zu versenden.
  if (honey) return Response.json({ ok: true });

  if (!name || !isEmail(email)) {
    return Response.json(
      { ok: false, error: "Bitte Name und eine gültige E-Mail-Adresse angeben." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO;
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) {
    // Konfigurationsfehler – im Log sichtbar, dem Besucher neutral gemeldet.
    console.error("Resend nicht konfiguriert: RESEND_API_KEY oder CONTACT_TO fehlt.");
    return Response.json(
      { ok: false, error: "Versand momentan nicht möglich. Bitte später erneut versuchen." },
      { status: 500 },
    );
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [to],
    replyTo: email, // Antwort geht direkt an den Interessenten
    subject: `Neue Anfrage über die Website – ${name}`,
    text:
      `Neue Kontaktanfrage über consilanto.de\n\n` +
      `Name:   ${name}\n` +
      `E-Mail: ${email}\n\n` +
      `Nachricht:\n${message || "(keine Nachricht)"}\n`,
  });

  if (error) {
    console.error("Resend-Fehler:", error);
    return Response.json(
      { ok: false, error: "Versand fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
