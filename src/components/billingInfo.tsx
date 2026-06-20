import { cn, getBillingDisplay, type PublicNoteData } from "@/lib/utils";

import RemainPercentBar from "./RemainPercentBar";

export default function BillingInfo({
	parsedData,
	layout = "stacked",
	showInlineLabels = false,
	className,
	barClassName,
}: {
	parsedData?: PublicNoteData | null;
	layout?: "stacked" | "inline";
	showInlineLabels?: boolean;
	className?: string;
	barClassName?: string;
}) {
	const billing = getBillingDisplay(parsedData);

	if (layout === "inline") {
		return (
			<div
				className={cn(
					"flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-muted-foreground",
					className,
				)}
			>
				<span className="shrink-0">
					{showInlineLabels ? "价格: " : ""}
					{billing.price}
				</span>
				<span
					className={cn("shrink-0", {
						"text-red-500": billing.expired,
					})}
				>
					{showInlineLabels
						? billing.expired
							? "已过期: "
							: "剩余天数: "
						: ""}
					<RemainingText value={billing.remaining} />
				</span>
				<RemainPercentBar
					value={billing.progress}
					className={cn("w-[70px] shrink-0", barClassName)}
				/>
			</div>
		);
	}

	return (
		<div className={cn("flex w-full flex-col", className)}>
			<p className="truncate text-xs leading-4 text-muted-foreground">
				{billing.price}
			</p>
			<div
				className={cn("flex h-4 items-center text-xs font-semibold leading-4", {
					"text-red-500": billing.expired,
				})}
			>
				<RemainingText value={billing.remaining} />
			</div>
			<RemainPercentBar
				value={billing.progress}
				className={cn("mt-0.5 w-full", barClassName)}
			/>
		</div>
	);
}

function RemainingText({ value }: { value: string }) {
	if (value !== "+∞") return value;

	return (
		<span className="inline-flex h-4 items-center leading-none">
			<span className="leading-none">+</span>
			<span className="pl-[1px] text-[13px] leading-none">∞</span>
		</span>
	);
}
