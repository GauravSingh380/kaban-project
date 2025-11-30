import React from "react";
import { Bug, Loader, CheckCircle, XCircle } from "lucide-react";

const BugStats = ({ originalData, selectedProject }) => {
    const filteredBugs =
        selectedProject && selectedProject.trim() !== ""
            ? originalData.filter((item) => item.project === selectedProject)
            : originalData;

    const openCount = filteredBugs.filter((bug) => bug.status === "open").length;
    const inProgressCount = filteredBugs.filter(
        (bug) => bug.status === "in-progress"
    ).length;
    const fixedCount = filteredBugs.filter(
        (bug) => bug.status === "fixed"
    ).length;
    const closedCount = filteredBugs.filter(
        (bug) => bug.status === "closed"
    ).length;

    const stats = [
        {
            label: "Total Bugs",
            value: filteredBugs.length,
            color: "text-gray-900",
            bg: "bg-gray-100",
            icon: Bug,
        },
        {
            label: "Open",
            value: openCount,
            color: "text-red-600",
            bg: "bg-red-100",
            icon: XCircle,
        },
        {
            label: "In Progress",
            value: inProgressCount,
            color: "text-blue-600",
            bg: "bg-blue-100",
            icon: Loader,
        },
        {
            label: "Fixed",
            value: fixedCount,
            color: "text-green-600",
            bg: "bg-green-100",
            icon: CheckCircle,
        },
        {
            label: "Closed",
            value: closedCount,
            color: "text-purple-600",
            bg: "bg-purple-100",
            icon: CheckCircle,
        },
    ];

    return (
        <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded-xl shadow-md">
            {stats.map((stat, idx) => {
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
