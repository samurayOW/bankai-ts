interface HeadingProps {
  title: string;
  description: string;
  align?: "center" | "left";
}

export default function Heading({
  title,
  description,
  align = "center",
}: HeadingProps): JSX.Element {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="text-3xl font-bold text-stone-50 lg:text-5xl">{title}</h2>
      <p className="my-2 text-stone-50/75">{description}</p>
    </div>
  );
}
