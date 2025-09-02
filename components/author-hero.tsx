import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AuthorHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <img
            src="/professional-author-headshot.png"
            alt="Author"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/20 shadow-lg"
          />
          <h1 className="text-5xl font-bold text-primary mb-4 text-balance">
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="px-8">
            Read My Articles
          </Button>
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Subscribe to Newsletter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Articles Published</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Monthly Readers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5 Years</div>
            <div className="text-muted-foreground">Writing Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
