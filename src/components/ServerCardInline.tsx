import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ServerFlag from "@/components/ServerFlag";
import ServerUsageBar from "@/components/ServerUsageBar";
import { formatBytes } from "@/lib/format";
import { cn, formatNezhaInfo, parsePublicNote } from "@/lib/utils";
import type { NezhaServer } from "@/types/nezha-api";
import BillingInfo from "./billingInfo";
import PlanInfo from "./PlanInfo";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

export default function ServerCardInline({
	firstColumnWidth = 160,
	now,
	serverInfo,
}: {
	firstColumnWidth?: number;
	now: number;
	serverInfo: NezhaServer;
}) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const {
		name,
		country_code,
		online,
		cpu,
		up,
		down,
		mem,
		stg,
		uptime,
		net_in_transfer,
		net_out_transfer,
		public_note,
	} = formatNezhaInfo(now, serverInfo);

	const cardClick = () => {
		sessionStorage.setItem("fromMainPage", "true");
		navigate(`/server/${serverInfo.id}`);
	};

	const customBackgroundImage =
		(window.CustomBackgroundImage as string) !== ""
			? window.CustomBackgroundImage
			: undefined;

	const parsedData = parsePublicNote(public_note);
	const statusClassName = online ? "bg-green-500" : "bg-red-500";

	return (
		<section>
			<Card
				className={cn(
					"flex min-h-[61px] w-full min-w-[900px] cursor-pointer items-center justify-start gap-3 p-3 transition-all md:px-5 lg:flex-row",
					online
						? "hover:shadow-sm hover:ring-stone-300 dark:hover:ring-stone-700"
						: "hover:bg-accent/50",
					{
						"bg-card/70": customBackgroundImage,
					},
				)}
				onClick={cardClick}
			>
				<section
					className="flex shrink-0 flex-col gap-1.5 overflow-hidden"
					style={{ width: firstColumnWidth }}
				>
					<div
						className="grid items-center gap-2"
						style={{ gridTemplateColumns: "auto auto 1fr" }}
					>
						<span
							className={cn(
								"h-2 w-2 shrink-0 rounded-full self-center",
								statusClassName,
							)}
						></span>
						<div className="flex min-w-[17px] items-center justify-center">
							<ServerFlag country_code={country_code} />
						</div>
						<div className="relative min-w-0 flex flex-col">
							<p
								className="truncate text-xs font-bold tracking-tight"
								title={name}
							>
								{name}
							</p>
						</div>
					</div>
					<PlanInfo parsedData={parsedData} nowrap />
				</section>
				<Separator orientation="vertical" className="h-8 mx-2" />
				<div className="flex flex-1 flex-col gap-1">
					<section className="grid flex-1 grid-cols-[80px_64px_56px_56px_56px_64px_64px_80px_80px] items-center justify-between gap-3">
						<div className="flex w-16 flex-col">
							<BillingInfo parsedData={parsedData} />
						</div>
						<div className="flex w-20 flex-col">
							<p className="text-xs text-muted-foreground">
								{t("serverCard.uptime")}
							</p>
							<div className="flex items-center text-xs font-semibold">
								{uptime / 86400 >= 1
									? `${(uptime / 86400).toFixed(0)} ${t("serverCard.days")}`
									: `${(uptime / 3600).toFixed(0)} ${t("serverCard.hours")}`}
							</div>
						</div>
						<MetricCell label="CPU" value={`${cpu.toFixed(2)}%`} bar={cpu} />
						<MetricCell
							label={t("serverCard.mem")}
							value={`${mem.toFixed(2)}%`}
							bar={mem}
						/>
						<MetricCell
							label={t("serverCard.stg")}
							value={`${stg.toFixed(2)}%`}
							bar={stg}
						/>
						<MetricCell
							label={t("serverCard.upload")}
							value={formatSpeed(up)}
						/>
						<MetricCell
							label={t("serverCard.download")}
							value={formatSpeed(down)}
						/>
						<MetricCell
							label={t("serverCard.totalUpload")}
							value={formatBytes(net_out_transfer)}
							className="w-20"
						/>
						<MetricCell
							label={t("serverCard.totalDownload")}
							value={formatBytes(net_in_transfer)}
							className="w-20"
						/>
					</section>
				</div>
			</Card>
		</section>
	);
}

function MetricCell({
	label,
	value,
	bar,
	className = "w-14",
}: {
	label: string;
	value: string;
	bar?: number;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-col", className)}>
			<p className="text-xs text-muted-foreground">{label}</p>
			<div className="flex items-center text-xs font-semibold">{value}</div>
			{typeof bar === "number" ? <ServerUsageBar value={bar} /> : null}
		</div>
	);
}

function formatSpeed(valueInMiB: number) {
	if (valueInMiB >= 1024) return `${(valueInMiB / 1024).toFixed(2)}G/s`;
	if (valueInMiB >= 1) return `${valueInMiB.toFixed(2)}M/s`;
	return `${(valueInMiB * 1024).toFixed(2)}K/s`;
}
