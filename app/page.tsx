import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {
  const user = await auth();

  if (!user?.user) {
    redirect('/login', RedirectType.push);
  }

  redirect('/dashboard/employees', RedirectType.push);

}
