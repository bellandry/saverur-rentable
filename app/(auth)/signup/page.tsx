import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignupClient from "./signup-client";

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si déjà connecté, rediriger
  if (session) {
    redirect("/");
  }

  return <SignupClient />;
}
