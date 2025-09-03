import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function AuthorHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary mb-4 text-balance">
            Behind Narrativa.
          </h1>
          <Image
            width={128}
            height={128}
            src="/yaser-profile.png"
            alt="Author"
            className="size-32 object-cover object-bottom aspect-square rounded-full mx-auto mt-14 mb-6 border-4 border-primary/20 shadow-lg"
          />
          <h1 className="text-4xl font-bold text-primary mb-4 text-balance">
            Yaser Syafa
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
            A Junior Full-Stack Developer and Game Developer, also working as a
            Tech Writer and remote professional. Sharing insights, lessons, and
            experiences from my journey in software and game development.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">Web Developer</Badge>
            <Badge variant="secondary">Unity Programmer</Badge>
            <Badge variant="secondary">Writer</Badge>
            <Badge variant="secondary">Tech Enthusiast</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
