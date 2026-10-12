"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartCount } from "@/components/cart/cart-store";
import { BRAND } from "@/lib/brand";

const NAV = [
  { href: "/steamer", label: "The steamer" },
  { href: "/how", label: "How it works" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/policies", label: "Policies" },
  { href: "/cart", label: "Cart" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const cartCount = useCartCount();

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        lifted ? "bg-ground/86 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ height: "var(--head-h)" }}
    >
      <nav
        aria-label="Primary"
        className="wrap flex h-full items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="tap font-serif text-[26px] leading-none tracking-[0.02em] text-ink no-underline"
        >
          {BRAND.name}
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const isCart = item.href === "/cart";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={isCart ? `Cart, ${cartCount} items` : undefined}
                  className={`tap label no-underline transition-opacity hover:opacity-100 ${
                    active ? "text-ink" : "opacity-70"
                  }`}
                >
                  {item.label}
                  {isCart && cartCount > 0 ? (
                    <span aria-hidden="true" className="mono ml-2 text-signal">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-5">
          <Link href="/steamer" className="button button-signal hidden sm:inline-flex" data-magnetic>
            Buy · $89
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="label flex min-h-11 min-w-11 cursor-pointer items-center justify-center bg-transparent text-ink md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 top-[var(--head-h)] z-40 bg-ground md:hidden"
      >
        <ul className="wrap flex flex-col gap-2 pt-10">
          {NAV.map((item) => (
            <li key={item.href} className="border-b border-hair">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-label={item.href === "/cart" ? `Cart, ${cartCount} items` : undefined}
                className="title-m block py-5 text-ink no-underline"
              >
                {item.label}
                {item.href === "/cart" && cartCount > 0 ? (
                  <span aria-hidden="true" className="mono ml-3 align-middle text-signal">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
          <li className="pt-8">
            <Link
              href="/steamer"
              onClick={() => setOpen(false)}
              className="button button-signal button-block"
            >
              Buy the steamer
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}