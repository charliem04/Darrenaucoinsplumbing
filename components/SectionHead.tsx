/**
 * The centred heading block that opens Services, Testimonials and FAQ:
 * optional eyebrow, a 36px / 52px heading, an 16px / 18px lede.
 */
export function SectionHead({
  eyebrow,
  heading,
  lede,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  heading: string;
  lede: string;
  as?: "h2" | "h3";
}) {
  const body = (
    <div className="flex flex-col gap-[20px] md:gap-[24px] items-center relative shrink-0 text-center text-white w-full">
      <Tag className="font-display font-medium leading-[1.2] relative shrink-0 text-[36px] tracking-[-0.36px] md:text-[52px] md:tracking-[-0.52px] w-full">
        {heading}
      </Tag>
      <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] md:text-[18px] w-full">
        {lede}
      </p>
    </div>
  );

  if (!eyebrow) {
    return <div className="flex flex-col items-center max-w-[768px] relative shrink-0 w-full">{body}</div>;
  }

  return (
    <div className="flex flex-col gap-[12px] md:gap-[16px] items-center max-w-[768px] relative shrink-0 w-full">
      <p className="font-display font-medium text-[12px] tracking-[0.12em] uppercase text-mint">{eyebrow}</p>
      {body}
    </div>
  );
}
