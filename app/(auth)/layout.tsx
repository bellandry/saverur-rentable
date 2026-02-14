// Layout pour les pages d'authentification (pas de vérification d'auth)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
