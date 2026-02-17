import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Newsletter from "@/components/newsletter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-cream">
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </div>
  );
}
