import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten auf der Website der Consilanto GmbH.",
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <p>
        Liebe Besucherin, lieber Besucher, wir freuen uns über Ihren Besuch auf
        unserer Website. Der Schutz Ihrer Privatsphäre hat für uns einen hohen
        Stellenwert. Die folgenden Datenschutzbestimmungen informieren Sie über
        die Erhebung, Verwendung und Weitergabe personenbezogener Daten auf dieser
        Website.
      </p>

      <h2>Verantwortliche Stelle</h2>
      <address>
        Consilanto Gesellschaft für Finanzdienstleistungen mbH
        <br />
        Erol Tezsevin-Weiss
        <br />
        Theresienstraße 1, 80333 München
        <br />
        E-Mail: kontakt@consilanto.de
      </address>

      <h2>Hosting</h2>
      <p>
        Diese Website wird bei der Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA
        91789, USA) gehostet. Beim Aufruf der Website verarbeitet Vercel
        technisch erforderliche Daten (z.&nbsp;B. IP-Adresse, Zeitpunkt des
        Zugriffs), um die Website auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten
        Bereitstellung). Mit Vercel besteht ein Auftragsverarbeitungsvertrag; die
        Auslieferung erfolgt soweit möglich über Server innerhalb der EU.
      </p>

      <h2>Server-Logfiles</h2>
      <p>
        Zur Gewährleistung von Betrieb, Sicherheit und Funktionsfähigkeit werden
        beim Zugriff auf unsere Seiten automatisch Daten erhoben, die Ihr Browser
        übermittelt. Dieser Datensatz besteht aus:
      </p>
      <ul>
        <li>der Seite, von der aus die Datei angefordert wurde,</li>
        <li>dem Namen der abgerufenen Datei,</li>
        <li>dem Datum und der Uhrzeit der Abfrage,</li>
        <li>der übertragenen Datenmenge,</li>
        <li>dem Zugriffsstatus (Datei übertragen, Datei nicht gefunden),</li>
        <li>der Beschreibung des Typs des verwendeten Webbrowsers,</li>
        <li>der IP-Adresse des anfragenden Rechners.</li>
      </ul>
      <p>
        Rechtsgrundlage für diese Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse des Verantwortlichen).
      </p>

      <h2>Kontaktformular</h2>
      <p>
        Sie können sich über unser Kontaktformular jederzeit mit Fragen oder
        Anregungen an uns wenden. Um Ihre Anfrage beantworten zu können, benötigen
        wir Ihren Namen und Ihre E-Mail-Adresse; weitere Angaben in der Nachricht
        sind freiwillig. Diese Daten verwenden wir ausschließlich zur Bearbeitung
        Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; zielt der
        Kontakt auf den Abschluss eines Vertrages ab, zusätzlich Art. 6 Abs. 1 lit.
        b DSGVO.
      </p>
      <p>
        Für den technischen Versand der Formular-Nachrichten als E-Mail nutzen wir
        den Dienst Resend (Resend, Inc., USA). Resend verarbeitet die übermittelten
        Inhalte in unserem Auftrag ausschließlich zum Zweck der E-Mail-Zustellung.
      </p>

      <h2>Cookies</h2>
      <p>
        Diese Website setzt <strong>keine</strong> Tracking-, Analyse- oder
        Marketing-Cookies ein. Es findet keine Webanalyse und kein Tracking durch
        Dritte statt. Technisch notwendige Speicherungen erfolgen, soweit
        überhaupt erforderlich, nur zur Bereitstellung der Website.
      </p>

      <h2>Schriftarten</h2>
      <p>
        Die auf dieser Website verwendeten Schriftarten werden lokal von unserem
        Server ausgeliefert. Es besteht dabei <strong>keine</strong> Verbindung zu
        Servern Dritter (z.&nbsp;B. Google Fonts); es werden hierfür keine Daten an
        Dritte übertragen.
      </p>

      <h2>Ihre Rechte als Nutzer</h2>
      <h3>a) Recht auf Bestätigung</h3>
      <p>
        Jede betroffene Person hat das Recht, Auskunft zu verlangen, ob über sie
        personenbezogene Daten verarbeitet werden.
      </p>
      <h3>b) Recht auf Auskunft (Art. 15 DSGVO)</h3>
      <p>
        Jede betroffene Person hat das Recht, unentgeltliche Auskunft über die zu
        ihrer Person gespeicherten personenbezogenen Daten und eine Kopie dieser
        Auskunft zu erhalten.
      </p>
      <h3>c) Recht auf Berichtigung (Art. 16 DSGVO)</h3>
      <p>
        Die betroffene Person hat das Recht, vom Verantwortlichen unverzüglich die
        Berichtigung sie betreffender unrichtiger personenbezogener Daten zu
        verlangen.
      </p>
      <h3>d) Recht auf Löschung (Art. 17 DSGVO)</h3>
      <p>
        Jede betroffene Person hat das Recht, zu verlangen, dass die sie
        betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern
        einer der gesetzlich genannten Gründe zutrifft und soweit die Verarbeitung
        nicht erforderlich ist.
      </p>
      <h3>e) Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
      <p>
        Jede betroffene Person hat das Recht, die Einschränkung der Verarbeitung zu
        verlangen, sofern einer der gesetzlich genannten Gründe zutrifft.
      </p>
      <h3>f) Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
      <p>
        Jede betroffene Person hat das Recht, die sie betreffenden
        personenbezogenen Daten in einem strukturierten, gängigen und
        maschinenlesbaren Format zu erhalten und diese Daten einem anderen
        Verantwortlichen zu übermitteln, soweit die Voraussetzungen des Art. 20
        DSGVO vorliegen.
      </p>
      <h3>g) Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</h3>
      <p>
        Jede betroffene Person hat das Recht, eine erteilte Einwilligung zur
        Verarbeitung personenbezogener Daten jederzeit zu widerrufen, ohne dass die
        Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt wird.
      </p>
      <h3>h) Recht auf Widerspruch (Art. 21 DSGVO)</h3>
      <p>
        Jede betroffene Person hat das Recht, aus Gründen, die sich aus ihrer
        besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie
        betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 lit. e
        oder f DSGVO erfolgt, Widerspruch einzulegen.
      </p>
      <h3>i) Beschwerderecht bei einer Aufsichtsbehörde</h3>
      <p>
        Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen
        Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer
        Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres
        Aufenthaltsorts.
      </p>

      <h2>Dauer der Speicherung</h2>
      <p>
        Das Kriterium für die Dauer der Speicherung personenbezogener Daten ist die
        jeweilige gesetzlich vorgeschriebene Aufbewahrungsfrist. Nach Ablauf der
        Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie
        nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind.
      </p>
    </LegalLayout>
  );
}
