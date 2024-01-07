import Navbar from "@/component/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>

        <main>{children}</main>

        <footer></footer>
      </body>
    </html>
  );
}
