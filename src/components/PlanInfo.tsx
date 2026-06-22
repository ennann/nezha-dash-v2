import {
	cn,
	getPlanTags,
	type PublicNoteData,
	planTagClassName,
} from "@/lib/utils";

export default function PlanInfo({
	parsedData,
	className,
	nowrap = false,
}: {
	parsedData?: PublicNoteData | null;
	className?: string;
	nowrap?: boolean;
}) {
	const tags = getPlanTags(parsedData);

	if (tags.length === 0) {
		return null;
	}

	return (
		<section
			className={cn(
				"flex gap-1 items-center mt-0.5",
				nowrap ? "flex-nowrap pr-px" : "flex-wrap",
				className,
			)}
		>
			{tags.map((tag, index) => (
				<p
					key={`${tag}-${index}`}
					className={cn(
						"box-border w-fit shrink-0 rounded-[5px] border px-[4px] py-[1.5px] text-[9px] leading-none",
						planTagClassName(index),
					)}
				>
					{tag}
				</p>
			))}
		</section>
	);
}
