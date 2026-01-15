import React, { useState } from 'react'
import {
    Plus, Search, MoreHorizontal, Calendar, Bug, AlertCircle, CheckCircle2, Clock,
    TrendingUp, TrendingDown, FolderOpen, Eye, Edit, Trash2, Archive, Star,
    Activity, Target, X, LayoutGrid, List
} from 'lucide-react';
import ConfirmationModal from "../../common/ConfirmationModal";
import StyledSpinner from '../../StyledSpinner/StyledSpinner';

const getStatusColor = (status) => {
    switch (status) {
        case 'active': return 'text-green-600 bg-green-50 border-green-200';
        case 'testing': return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'planning': return 'text-purple-600 bg-purple-50 border-purple-200';
        case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
        case 'on_hold': return 'text-red-600 bg-red-50 border-red-200';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};
const getPriorityColor = (priority) => {
    switch (priority) {
        case 'critical': return 'text-red-600 bg-red-50 border-red-200';
        case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
        case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'low': return 'text-green-600 bg-green-50 border-green-200';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};

const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-red-500';
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const ProjectCard = ({ project, selectedProjects, toggleProjectSelection, archivingProjectId, onArchive,onDelete,deletingProjectId, loadingDeleteProject }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleArchiveClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmArchiveProject = async () => {
        setIsModalOpen(false);
        // Call the parent's delete function
        onArchive(project.projectId);
    };

    const handleCloseModal = () => {
        // Only allow closing if not currently deleting
        if (archivingProjectId !== project.id) {
            setIsModalOpen(false);
        }
    };

    //TO DO Delete  Project
    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };
    const handleConfirmDeleteProject = async () => {
        setIsDeleteModalOpen(false);
        // Call the parent's delete function
        onDelete(project.projectId);
    };
    const handleCloseDeleteProjectModal = () => {
        // Only allow closing if not currently deleting
        if (deletingProjectId !== project.id) {
            setIsDeleteModalOpen(false);
        }
    };
    return <>
        <div
            className={`
                bg-white rounded-lg shadow-sm border border-gray-200
                transition-shadow
                ${project.isTrash ? 'opacity-50 pointer-events-none cursor-not-allowed': 'hover:shadow-md'}
            `}
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={selectedProjects.includes(project?.id)}
                            onChange={() => toggleProjectSelection(project?.id)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg mb-1">{project?.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{project?.description}</p>
                            <p className="text-sm text-gray-500">Client: {project?.client}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => toggleStar(project?.id)}
                            className={`p-1 rounded-full ${project?.starred ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                        >
                            <Star className="w-4 h-4" fill={project?.starred ? 'currentColor' : 'none'} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(project?.status)}`}>
                            {project?.status === 'active' && <Activity className="w-3 h-3 mr-1" />}
                            {project?.status === 'testing' && <Bug className="w-3 h-3 mr-1" />}
                            {project?.status === 'planning' && <Calendar className="w-3 h-3 mr-1" />}
                            {project?.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {project?.status === 'on_hold' && <Clock className="w-3 h-3 mr-1" />}
                            {project?.status?.charAt(0).toUpperCase() + project?.status?.slice(1).replace('_', ' ')}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(project?.priority)}`}>
                            {project?.priority === 'critical' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {project?.priority === 'high' && <TrendingUp className="w-3 h-3 mr-1" />}
                            {project?.priority === 'medium' && <Target className="w-3 h-3 mr-1" />}
                            {project?.priority === 'low' && <TrendingDown className="w-3 h-3 mr-1" />}
                            {project?.priority?.charAt(0).toUpperCase() + project?.priority?.slice(1)}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{project?.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project?.progress)}`}
                            style={{ width: `${project?.progress}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Budget</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(project?.budget)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Spent</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(project?.spent)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Due Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(project?.dueDate)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Days Left</p>
                        <p className={`text-sm font-medium ${getDaysRemaining(project?.dueDate) < 0 ? 'text-red-600' : getDaysRemaining(project?.dueDate) < 7 ? 'text-orange-600' : 'text-gray-900'}`}>
                            {getDaysRemaining(project?.dueDate) < 0 ? 'Overdue' : `${getDaysRemaining(project?.dueDate)} days`}
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">Team</span>
                        <span className="text-xs text-gray-500">{project?.team?.length} members</span>
                    </div>
                    <div className="flex -space-x-2">
                        {project?.team?.slice(0, 4).map((member, index) => (
                            <div
                                key={index}
                                className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                                title={`${member?.name} - ${member?.role}`}
                            >
                                {member?.avatar}
                            </div>
                        ))}
                        {project?.team?.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-500 text-white text-xs flex items-center justify-center border-2 border-white">
                                +{project?.team.length - 4}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{project?.bugs?.open}</p>
                        <p className="text-xs text-gray-500">Open Bugs</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{project?.milestones?.completed}/{project?.milestones?.total}</p>
                        <p className="text-xs text-gray-500">Milestones</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{Math.round((project?.spent / project?.budget || 0) * 100)}%</p>
                        <p className="text-xs text-gray-500">Budget Used</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                    {project?.tags?.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                        View Details
                    </button>
                    <div className="flex gap-2">
                        <button className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                            <Edit className="w-4 h-4" />
                        </button>
                        {archivingProjectId === project.projectId ? (
                                <StyledSpinner
                                    borderWidth='3px'
                                    size='1.5rem'
                                    text=''
                                    fontSize='semi bold'
                                    color='yellow'
                                />
                            ) : (
                                <button className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                                <Archive onClick={handleArchiveClick} className="w-4 h-4" />
                            </button>
                            )}
                        <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                            {deletingProjectId === project.projectId ? (
                                <StyledSpinner
                                    borderWidth='3px'
                                    size='1.5rem'
                                    text=''
                                    fontSize='semi bold'
                                    color='red'
                                />
                            ) : (
                                <button className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full">
                                <Trash2 onClick={handleDeleteClick} className="w-4 h-4" />
                            </button>
                            )}
                        </button>
                    </div>
                </div>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmArchiveProject}
                    title="Archive Project"
                    message={
                        <>
                            Are you sure you want to archive <strong>{project?.name || "NA"}</strong>? This action cannot be undone.
                        </>
                    }
                    confirmText="Archive"
                    cancelText="Cancel"
                    isLoading={archivingProjectId === project.projectId}
                    isArchive={true}
                />
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseDeleteProjectModal}
                    onConfirm={handleConfirmDeleteProject}
                    title="Delete Project"
                    message={
                        <>
                            Are you sure you want to delete <strong>{project?.name || "NA"}</strong>? This action cannot be undone.
                        </>
                    }
                    confirmText="Delete"
                    cancelText="Cancel"
                    isLoading={deletingProjectId === project.projectId}
                />
            </div>
        </div>
    </>
};

export default ProjectCard