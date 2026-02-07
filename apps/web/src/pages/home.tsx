import { useState } from "react";
import { useUsers, useCreateUser, useDeleteUser } from "@/hooks/use-users";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Database,
  Globe,
  Layers,
  Loader2,
  Plus,
  RefreshCw,
  Server,
  Trash2,
  Zap,
} from "lucide-react";
import { ApiError } from "@/lib/api";

const techStack = [
  {
    icon: Layers,
    title: "Turborepo",
    description: "Monorepo orchestration with smart caching",
  },
  {
    icon: Server,
    title: "Express 5",
    description: "API server with Helmet, CORS & Zod validation",
  },
  {
    icon: Globe,
    title: "React + Vite",
    description: "Lightning-fast frontend with React Router & TanStack Query",
  },
  {
    icon: Database,
    title: "Drizzle ORM",
    description: "Type-safe PostgreSQL with auto-generated migrations",
  },
];

export function HomePage() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    createUser.mutate(
      { name: name.trim(), email: email.trim() },
      { onSuccess: () => { setName(""); setEmail(""); } }
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-tight">BoilerPautet</span>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="font-mono text-xs">
              v0.0.0
            </Badge>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" className="size-5 fill-current">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section className="py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex justify-center">
              <Badge variant="outline" className="gap-1.5 px-3 py-1">
                <Zap className="size-3.5" />
                Production-ready monorepo
              </Badge>
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Ship faster with
              <br />
              <span className="bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                BoilerPautet
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A fully typed, monorepo-first boilerplate with Express, React,
              Drizzle&nbsp;ORM, and everything wired together so you can focus on
              building your product.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {["TypeScript", "pnpm", "Tailwind v4", "Shadcn/ui", "Zod", "TanStack Query"].map((t) => (
                <Badge key={t} variant="secondary" className="px-3 py-1 text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        <section className="py-16">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">
            What&apos;s inside
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {techStack.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <CardTitle className="text-base">{title}</CardTitle>
                  </div>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Live API demo
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This form talks to the Express API, which writes to PostgreSQL
                via Drizzle. Full-stack, type-safe, end-to-end.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createUser.isPending}
                >
                  {createUser.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Plus />
                  )}
                  Add user
                </Button>
                {createUser.isError && (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <div>
                      <p className="font-medium">
                        {createUser.error instanceof ApiError
                          ? createUser.error.body.message ?? createUser.error.body.error
                          : createUser.error.message}
                      </p>
                      {createUser.error instanceof ApiError &&
                        createUser.error.body.details && (
                          <ul className="mt-1 list-inside list-disc text-xs text-destructive/80">
                            {Object.entries(createUser.error.body.details).map(
                              ([field, errors]) =>
                                errors.map((msg) => (
                                  <li key={`${field}-${msg}`}>
                                    <span className="font-medium">{field}:</span> {msg}
                                  </li>
                                ))
                            )}
                          </ul>
                        )}
                    </div>
                  </div>
                )}
              </form>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Users</CardTitle>
                  <Badge variant="outline" className="font-mono">
                    {isLoading ? "..." : (users?.length ?? 0)}
                  </Badge>
                </div>
                <CardDescription>
                  Fetched from <code className="text-xs">/api/users</code> via
                  TanStack Query
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}

                {error && (
                  <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center text-sm text-destructive">
                    <AlertCircle className="size-6" />
                    <div>
                      <p className="font-medium">
                        {error instanceof ApiError
                          ? error.body.message ?? error.body.error
                          : "Could not connect to server"}
                      </p>
                      <p className="mt-1 text-xs text-destructive/70">
                        Make sure the API is running on port 4000
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                      className="mt-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <RefreshCw className="size-3" />
                      Retry
                    </Button>
                  </div>
                )}

                {users && users.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-sm text-muted-foreground">
                    <Database className="size-8 stroke-1" />
                    <p>No users yet</p>
                    <p className="text-xs">
                      Use the form to create your first user
                    </p>
                  </div>
                )}

                {users && users.length > 0 && (
                  <ul className="divide-y">
                    {users.map((user) => (
                      <li
                        key={user.id}
                        className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => deleteUser.mutate(user.id)}
                          disabled={deleteUser.isPending}
                        >
                          <Trash2 />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Built with BoilerPautet — star it on GitHub
      </footer>
    </div>
  );
}
