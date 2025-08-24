export default function Heading({
  text,
  lvl,
  ...props
}: {
  text: string;
  lvl: 1 | 2 | 3;
} & React.ComponentProps<"h1" | "h2" | "h3">) {
  if (lvl === 1)
    return (
      <h1 className={props.className + " text-2xl font-bold uppercase"}>
        {text}
      </h1>
    );
  if (lvl === 2)
    return (
      <h2 className={props.className + " mb-2 text-xl uppercase"}>{text}</h2>
    );
  if (lvl === 3)
    return (
      <h3 className={props.className + " mb-2 text-lg uppercase"}>{text}</h3>
    );
}
