import { format } from "date-fns";

interface Campaign {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  status: "active" | "draft" | "ended";
  end_date?: string;
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="flex items-center gap-3 p-4 sp-card">
      <span className="text-2xl">{campaign.icon ?? "🚀"}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold">{campaign.name}</p>
        {campaign.description && (
          <p className="text-xs text-slate-400 truncate">{campaign.description}</p>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            campaign.status === "active"
              ? "bg-emerald-500/15 text-emerald-400"
              : campaign.status === "draft"
              ? "bg-slate-400/10 text-slate-500"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {campaign.status === "active" ? "● Active" : campaign.status === "draft" ? "● Draft" : "Ended"}
        </span>
        {campaign.end_date && (
          <p className="text-xs text-slate-500 mt-1">
            Ends {format(new Date(campaign.end_date), "MMM d")}
          </p>
        )}
      </div>
    </div>
  );
}
