import React from 'react'

const EmailInput = () => {
    return (
        <div>
            <label className="block text-purple-200 text-sm font-medium mb-2">
                Email Address
            </label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300 ${errors.email ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                        }`}
                    placeholder="Enter your email"
                />
            </div>
            {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
        </div>
    )
}

export default EmailInput