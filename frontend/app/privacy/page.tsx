export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-20">
      <article className="prose prose-slate lg:prose-lg mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter text-[#0B1F3A] uppercase">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500">Last Updated: March 6, 2026</p>

        <hr className="my-8 border-t-2 border-[#C8A75A]" />

        <section>
          <h2 className="text-[#0B1F3A]">1. Information We Collect</h2>
          <p>
            National Chronicle collects minimal data to provide a better reading
            experience. This includes:
          </p>
          <ul>
            <li>
              <strong>Usage Data:</strong> IP addresses, browser types, and
              pages visited (via cookies and analytics).
            </li>
            <li>
              <strong>Voluntary Data:</strong> Information you provide when
              using our "Have A Tip?" form or contacting us.
            </li>
          </ul>
        </section>
        <br />
        <section>
          <h2 className="text-[#0B1F3A]">2. How We Use Your Information</h2>
          <p>We use the collected data to:</p>
          <ul>
            <li>Maintain and improve the performance of our website.</li>
            <li>Respond to news tips, inquiries, or feedback.</li>
            <li>Protect against spam and unauthorized access.</li>
          </ul>
        </section>
        <br />
        <section>
          <h2 className="text-[#0B1F3A]">3. Cookies and Tracking</h2>
          <p>
            We use cookies to analyze traffic and understand reader preferences.
            You can choose to disable cookies through your individual browser
            settings; however, this may affect your experience on our site.
          </p>
        </section>
        <br />
        <section>
          <h2 className="text-[#0B1F3A]">4. Data Security</h2>
          <p>
            We implement standard security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure. While we strive to protect your data, we cannot
            guarantee its absolute security.
          </p>
        </section>
        <br />
        <section>
          <h2 className="text-[#0B1F3A]">5. Third-Party Services</h2>
          <p>
            We may use third-party service providers (such as hosting platforms
            or analytics tools) to monitor and analyze the use of our service.
            These third parties have access to your data only to perform these
            tasks on our behalf.
          </p>
        </section>
        <br />
        <section>
          <h2 className="text-[#0B1F3A]">6. Children's Privacy</h2>
          <p>
            National Chronicle does not knowingly collect information from
            children under the age of 13. If we become aware that we have
            collected personal data from a child without parental consent, we
            will take steps to remove that information.
          </p>
        </section>
      </article>
    </main>
  );
}
