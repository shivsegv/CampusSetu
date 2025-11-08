import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { useUI } from "../contexts/UIContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { openAuthModal } = useUI();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => [
      { label: "Product", href: "#product" },
      { label: "Solutions", href: "#solutions" },
      { label: "Analytics", href: "/analytics" },
      { label: "Pricing", href: "#pricing" },
    ],
    []
  );

  const goToDashboard = () => {
    if (user?.role) {
      navigate(`/${user.role}/dashboard`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderLinks = (className = "") => (
    <ul className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.href}
            className="text-sm font-medium text-slate-500 transition hover:text-brand-600"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="relative z-30">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white via-white/90 to-transparent" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/95 px-4 py-3 shadow-soft backdrop-blur lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-lg font-semibold text-white shadow-soft">
            C
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-slate-900">Campus SETU</p>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-400">Bridging careers</p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          {renderLinks()}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Button variant="ghost" onClick={goToDashboard}>
                My dashboard
              </Button>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/analytics")}>Live analytics</Button>
              <Button onClick={openAuthModal}>Get started</Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white text-slate-600 shadow-soft lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Bars3BottomRightIcon className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute right-4 top-20 w-[85vw] max-w-sm rounded-3xl border border-white/70 bg-white/95 p-6 shadow-elevated"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-lg font-semibold text-slate-900">
                    Campus SETU
                  </p>
                  <p className="text-xs text-slate-400">Premium campus hiring suite</p>
                </div>
                <button
                  type="button"
                  className="h-9 w-9 rounded-xl border border-slate-100 text-slate-500"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              {renderLinks("border-t border-slate-100 pt-4")}
              <div className="mt-6 flex flex-col gap-3">
                {user ? (
                  <>
                    <Button onClick={goToDashboard}>Open dashboard</Button>
                    <Button variant="secondary" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={openAuthModal}>Create account</Button>
                    <Button variant="secondary" onClick={() => navigate("/analytics")}>
                      Explore analytics
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
