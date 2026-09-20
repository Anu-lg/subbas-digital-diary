import { createFileRoute } from "@tanstack/react-router";
import { BirthdayExperience } from "@/components/birthday/BirthdayExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Subba — A Birthday Story" },
      { name: "description", content: "A handcrafted birthday memory book made for Subba." },
      { property: "og:title", content: "For Subba — A Birthday Story" },
      { property: "og:description", content: "A handcrafted birthday memory book made for Subba." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BirthdayExperience />;
}
