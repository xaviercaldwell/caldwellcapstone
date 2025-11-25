import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to my capstone project!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This prototype web app is meant to demonstrate proficiency in my
            three areas of study: Software development, cybersecurity, and
            project management. This application blends facets of each of these
            disciplines to show the strength of interdisciplinary learning and
            how these skills complement one another.
          </p>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            To get started,{" "}
            <a
              href="_blank"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Login
            </a>{" "}
            or{" "}
            <a
              href="_blank"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              sign up
            </a>{" "}
            with an email
          </p>
        </div>
        
      </main>
    </div>
  );
}
