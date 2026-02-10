export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl p-8 text-sm text-slate-600 dark:text-slate-300 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} GEEVIH (SEISIDA)</p>

        <p>
          Web desarrollada por{" "}
          <a
            href="https://github.com/Popooov"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-white"
          >
            Oleksandr Popov
          </a>
        </p>
      </div>
    </footer>
  );
}
