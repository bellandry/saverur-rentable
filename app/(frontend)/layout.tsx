import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Newsletter from "@/components/newsletter";
import ScrollToTop from "@/components/scroll-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-cream relative">
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
