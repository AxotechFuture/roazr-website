import { Reveal } from "@/components/ui/Reveal";

export function SectionHead({
  kicker,
  title,
  sub,
  align = "center",
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  const alignCls =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignCls}`}>
      <p className={`kicker ${align === "center" ? "justify-center" : ""}`}>{kicker}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {sub}
        </p>
      )}
    </Reveal>
  );
}
