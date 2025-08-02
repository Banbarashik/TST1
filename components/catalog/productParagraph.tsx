export default function ProductParagraph({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"p">) {
  return <p className={props.className + " text-[17px]"}>{children}</p>;
}
