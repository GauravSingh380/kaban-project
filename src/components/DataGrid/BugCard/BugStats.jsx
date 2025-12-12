import React from "react";
import { Bug, Loader, CheckCircle, XCircle } from "lucide-react";

const BugStats = ({ globalStats, statsByProject, selectedProjectid }) => {
    // Determine which stats to display
    // If a project is selected, use project-specific stats, otherwise use global stats
    const currentStats = (selectedProjectid && selectedProjectid !== "" && selectedProjectid !== "all") 
        ? (statsByProject?.[selectedProjectid] || {
            total: 0,
            open: 0,
            inProgress: 0,
            fixed: 0,
            closed: 0
          })
        : (globalStats || {
            total: 0,
            open: 0,
            inProgress: 0,
            fixed: 0,
            closed: 0
          });

    const statsConfig = [
        {
            label: "Total Bugs",
            value: currentStats.total || 0,
            color: "text-gray-900",
            bg: "bg-gray-100",
            icon: Bug,
        },
        {
            label: "Open",
            value: currentStats.open || 0,
            color: "text-red-600",
            bg: "bg-red-100",
            icon: XCircle,
        },
        {
            label: "In Progress",
            value: currentStats.inProgress || 0,
            color: "text-blue-600",
            bg: "bg-blue-100",
            icon: Loader,
        },
        {
            label: "Fixed",
            value: currentStats.fixed || 0,
            color: "text-green-600",
            bg: "bg-green-100",
            icon: CheckCircle,
        },
        {
            label: "Closed",
            value: currentStats.closed || 0,
            color: "text-purple-600",
            bg: "bg-purple-100",
            icon: CheckCircle,
        },
    ];

    return (
        <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded-xl shadow-md">
            {statsConfig.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-4 rounded-lg transition hover:bg-[#e2cfef] hover:shadow-lg border bg-[#f4eff7]"
                    >
                        <div
                            className={`p-3 rounded-full ${stat.bg} flex items-center justify-center mb-2`}
                        >
                            <Icon className={`${stat.color}`} size={26} />
                        </div>

                        <div className={`text-3xl font-semibold ${stat.color}`}>
                            {stat.value}
                        </div>

                        <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default BugStats;