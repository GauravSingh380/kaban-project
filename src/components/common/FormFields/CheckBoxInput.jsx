import React from 'react'

const CheckBoxInput = ({input, onChange,label, mandatory}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label || ""}
            <span className='text-red-700'>{mandatory ? "*" : ""}</span>
            </label>
            <div className="flex flex-wrap gap-2">
                {input.options.map(env => (
                    <label key={env} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={input}
                            name={input.name}
                            // onChange={(e) => {
                            //     if (e.target.checked) {
                            //         setNewBug({ ...newBug, issueEnv: [...newBug.issueEnv, env] });
                            //     } else {
                            //         setNewBug({ ...newBug, issueEnv: newBug.issueEnv.filter(e => e !== env) });
                            //     }
                            // }}
                            onChange={onChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{env}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default CheckBoxInput