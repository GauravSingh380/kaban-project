// utils/validateCsv.js
export const validateCSVContent = (headers, rows) => {
    const requiredHeaders = [
        'title',
        'description',
        'priority',
        'status',
        'reportedBy',
        'assignedTo',
        'issueEnv',
        'comments',
    ];

    const priorityValues = ['P1', 'P2', 'P3', 'P4', ''];
    const statusValues = ['open', 'fixed', 'in-progress', 'closed'];
    const envValues = ['dev', 'stg', 'demo', 'prod', ''];

    // Check for missing headers
    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));
    if (missingHeaders.length > 0) {
        return {
            isValid: false,
            message: `Missing headers: ${missingHeaders.join(', ')}`,
        };
    }

    // Validate each row
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        console.log("row.priority-----", row.priority);

        if (!priorityValues.includes(row.priority)) {
            return {
                isValid: false,
                message: `Row ${i + 2}: Invalid priority '${row.priority}' (allowed: P1, P2, P3, P4)`,
            };
        }

        if (!statusValues.includes(row.status)) {
            return {
                isValid: false,
                message: `Row ${i + 2}: Invalid status '${row.status}' (allowed: open, fixed, closed, blocked)`,
            };
        }

        const envs = row.issueEnv?.split(',').map((env) => env.trim()) || [];
        const invalidEnvs = envs.filter((env) => !envValues.includes(env));
        if (invalidEnvs.length > 0) {
            return {
                isValid: false,
                message: `Row ${i + 2}: Invalid environments: ${invalidEnvs.join(', ')} (allowed: dev, stg, demo, prod)`,
            };
        }
    }

    return { isValid: true, message: 'Valid CSV' };
};
