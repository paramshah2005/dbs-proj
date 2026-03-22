"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const linkStyle = (href: string): string =>
    `px-4 py-2 rounded-lg transition text-sm ${
      path === href
        ? "bg-white/20 text-white"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="w-full flex justify-center pt-3 pb-0">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex gap-2">

        <Link href="/" className={linkStyle("/")}>
           Transactions
        </Link>

        <Link href="/create-account" className={linkStyle("/create-account")}>
           Create
        </Link>

        <Link href="/delete-account" className={linkStyle("/delete-account")}>
           Delete
        </Link>

      </div>
    </div>
  );
}