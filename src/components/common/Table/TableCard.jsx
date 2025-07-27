import React from 'react';

const TableCard = ({ 
    headers = [], 
    data = [], 
    selectable = false,
    selectedItems = [],
    onSelectAll = () => {},
    onSelectItem = () => {},
    className = "",
    tableClassName = "",
    headerClassName = "",
    rowClassName = "",
    cellClassName = "",
    onRowClick = null,
    emptyMessage = "No data available"
}) => {
    
    const handleSelectAll = () => {
        if (selectedItems.length === data.length && data.length > 0) {
            onSelectAll([]);
        } else {
            onSelectAll(data.map(item => item.id || item._id));
        }
    };

    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            onSelectAll(selectedItems.filter(id => id !== itemId));
        } else {
            onSelectAll([...selectedItems, itemId]);
        }
    };

    const renderCellContent = (item, header) => {
        if (header.render && typeof header.render === 'function') {
            return header.render(item, header);
        }
        
        if (header.key) {
            const value = header.key.split('.').reduce((obj, key) => obj?.[key], item);
            return value ?? '-';
        }
        
        return '-';
    };

    const getCellAlignment = (align) => {
        switch (align) {
            case 'center': return 'text-center';
            case 'right': return 'text-right';
            default: return 'text-left';
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
            <div className="overflow-x-auto">
                <table className={`min-w-full divide-y divide-gray-200 ${tableClassName}`}>
                    <thead className={`bg-gray-50 ${headerClassName}`}>
                        <tr>
                            {selectable && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === data.length && data.length > 0}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                </th>
                            )}
                            {headers.map((header, index) => (
                                <th
                                    key={header.id || header.key || index}
                                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${getCellAlignment(header.align)} ${header.headerClassName || ''}`}
                                    style={{ width: header.width }}
                                >
                                    <span className="text-sm font-medium text-gray-900">
                                        {header.title || header.label}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td 
                                    colSpan={headers.length + (selectable ? 1 : 0)} 
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr
                                    key={item.id || item._id || rowIndex}
                                    className={`hover:bg-gray-50 transition-colors ${rowClassName} ${onRowClick ? 'cursor-pointer' : ''}`}
                                    onClick={() => onRowClick && onRowClick(item, rowIndex)}
                                >
                                    {selectable && (
                                        <td className="px-6 py-4 whitespace-nowrap w-12">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id || item._id)}
                                                onChange={() => handleSelectItem(item.id || item._id)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                        </td>
                                    )}
                                    {headers.map((header, cellIndex) => (
                                        <td
                                            key={header.id || header.key || cellIndex}
                                            className={`px-6 py-4 whitespace-nowrap ${getCellAlignment(header.align)} ${cellClassName} ${header.cellClassName || ''}`}
                                        >
                                            {renderCellContent(item, header)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableCard;