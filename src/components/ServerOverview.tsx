import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import NumericText from "@numeric-text/react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { useStatus } from "@/hooks/use-status";
import { formatBytes } from "@/lib/format";
import { cn, formatSpeedCompact } from "@/lib/utils";

type ServerOverviewProps = {
	online: number;
	offline: number;
	total: number;
	up: number;
	down: number;
	upSpeed: number;
	downSpeed: number;
};

export default function ServerOverview({
	online,
	total,
	up,
	down,
	upSpeed,
	downSpeed,
}: ServerOverviewProps) {
	const { t } = useTranslation();
	const { status, setStatus } = useStatus();

	// @ts-expect-error DisableAnimatedMan is a global variable
	const disableAnimatedMan = window.DisableAnimatedMan as boolean;

	// @ts-expect-error CustomIllustration is a global variable
	const customIllustration = window.CustomIllustration || "/animated-man.webp";

	const customBackgroundImage =
		(window.CustomBackgroundImage as string) !== ""
			? window.CustomBackgroundImage
			: undefined;

	return (
		<section className="grid grid-cols-2 gap-4 lg:grid-cols-4 server-overview">
			<Card
				onClick={() => {
					setStatus("all");
				}}
				className={cn(
					"group cursor-pointer transition-all hover:ring-blue-500 dark:hover:ring-blue-600",
					{
						"bg-card/70": customBackgroundImage,
					},
				)}
			>
				<CardContent className="flex h-full min-h-[92px] items-center px-6 py-4">
					<section className="flex flex-col gap-1">
						<p className="text-sm font-medium md:text-base">
							{t("serverOverview.totalServers")}
						</p>
						<div className="flex items-center gap-2">
							<span className="relative flex h-2 w-2">
								<span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
							</span>
							<NumericText value={total} className="text-lg font-semibold" />
						</div>
					</section>
				</CardContent>
			</Card>
			<Card
				onClick={() => {
					setStatus("online");
				}}
				className={cn(
					"cursor-pointer ring-1 transition-all hover:ring-green-500 dark:hover:ring-green-600",
					{
						"bg-card/70": customBackgroundImage,
					},
					{
						"border-transparent ring-2 ring-green-500 dark:ring-green-600":
							status === "online",
					},
				)}
			>
				<CardContent className="flex h-full min-h-[92px] items-center px-6 py-4">
					<section className="flex flex-col gap-1">
						<p className="text-sm font-medium md:text-base">
							{t("serverOverview.onlineServers")}
						</p>
						<div className="flex items-center gap-2">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
								<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
							</span>
							<NumericText value={online} className="text-lg font-semibold" />
						</div>
					</section>
				</CardContent>
			</Card>
			<Card
				onClick={() => {
					setStatus("all");
				}}
				className={cn(
					"cursor-pointer ring-1 transition-all hover:ring-blue-500 dark:hover:ring-blue-600",
					{
						"bg-card/70": customBackgroundImage,
					},
				)}
			>
				<CardContent className="flex h-full min-h-[92px] items-center px-6 py-4">
					<section className="flex min-w-0 flex-col gap-1.5 w-full">
						<p className="text-sm font-medium md:text-base">流量</p>
						<section className="flex min-w-0 flex-col items-start gap-1 overflow-hidden">
							<p className="flex items-center text-nowrap text-xs font-semibold text-blue-800 dark:text-blue-400">
								<ArrowUpCircleIcon className="size-3.5 mr-1" />
								{formatBytes(up)}
							</p>
							<p className="flex items-center text-nowrap text-xs font-semibold text-purple-800 dark:text-purple-400">
								<ArrowDownCircleIcon className="size-3.5 mr-1" />
								{formatBytes(down)}
							</p>
						</section>
					</section>
				</CardContent>
			</Card>
			<Card
				className={cn(
					"group ring-1 hover:ring-purple-500 dark:hover:ring-purple-600",
					{
						"bg-card/70": customBackgroundImage,
					},
				)}
			>
				<CardContent className="flex h-full min-h-[92px] items-center relative px-6 py-4">
					<section className="flex flex-col gap-1.5 w-full">
						<div className="flex items-center w-full justify-between">
							<p className="text-sm font-medium md:text-base">速度</p>
						</div>
						<section className="flex min-w-0 flex-col items-start gap-1 overflow-hidden">
							<p className="flex items-center text-nowrap text-xs font-semibold">
								<ArrowUpCircleIcon className="size-3.5 mr-1 sm:mb-px" />
								{formatSpeedCompact(upSpeed)}
							</p>
							<p className="flex items-center text-nowrap text-xs font-semibold">
								<ArrowDownCircleIcon className="size-3.5 mr-1" />
								{formatSpeedCompact(downSpeed)}
							</p>
						</section>
					</section>
					{!disableAnimatedMan && (
						<img
							className="absolute right-3 top-[-85px] z-50 w-20 scale-90 group-hover:opacity-50 md:scale-100 transition-all"
							alt={"animated-man"}
							src={customIllustration}
							loading="eager"
						/>
					)}
				</CardContent>
			</Card>
		</section>
	);
}
