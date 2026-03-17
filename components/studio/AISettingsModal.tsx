"use client"

import { useState, useEffect } from "react"
import { X, Save, Key, Settings2 } from "lucide-react"

export type AIProvider = "google" | "anthropic" | "openrouter" | "openai" | "system"

export interface AISettings {
    provider: AIProvider
    model: string
    apiKey: string
}

export const DEFAULT_AI_SETTINGS: AISettings = {
    provider: "system",
    model: "system-default",
    apiKey: "",
}

interface AISettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AISettingsModal({ isOpen, onClose }: AISettingsModalProps) {
    const [settings, setSettings] = useState<AISettings>(DEFAULT_AI_SETTINGS)
    const [saved, setSaved] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("codeboard_ai_settings")
        if (stored) {
            try {
                setSettings(JSON.parse(stored))
            } catch (e) {
                console.error("Failed to parse AI settings")
            }
        }
    }, [isOpen])

    const handleSave = () => {
        localStorage.setItem("codeboard_ai_settings", JSON.stringify(settings))
        setSaved(true)
        setTimeout(() => {
            setSaved(false)
            onClose()
        }, 1000)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-[#1f1f1f] bg-[#121212]">
                    <div className="flex items-center gap-2 text-white font-medium">
                        <Settings2 className="w-5 h-5 text-blue-400" />
                        AI Settings (BYOK)
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-[#222]"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-5 space-y-5">
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Configure your own AI provider and API key for Code Reviews and Chat. 
                        If left on <strong>System Default</strong>, we will use our built-in keys if available.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">Provider</label>
                            <select
                                value={settings.provider}
                                onChange={(e) => {
                                    const provider = e.target.value as AIProvider;
                                    setSettings({
                                        ...settings,
                                        provider,
                                        // Reset model to a logical default based on provider changes
                                        model: provider === 'system' ? 'system-default' :
                                               provider === 'google' ? 'gemini-2.5-flash' :
                                               provider === 'anthropic' ? 'claude-3-5-sonnet-20241022' :
                                               provider === 'openai' ? 'gpt-4o' :
                                               'anthropic/claude-3.5-sonnet' // openrouter default
                                    })
                                }}
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="system">System Default</option>
                                <option value="google">Google Gemini</option>
                                <option value="anthropic">Anthropic</option>
                                <option value="openai">OpenAI</option>
                                <option value="openrouter">OpenRouter</option>
                            </select>
                        </div>

                        {settings.provider !== 'system' && (
                            <>
                                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-sm font-medium text-gray-300">Model Name</label>
                                    <input
                                        type="text"
                                        value={settings.model}
                                        onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="e.g. gemini-2.5-flash"
                                    />
                                </div>

                                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center justify-between">
                                        API Key
                                        <Key className="w-3.5 h-3.5 text-gray-500" />
                                    </label>
                                    <input
                                        type="password"
                                        value={settings.apiKey}
                                        onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="sk-..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Keys are stored securely in your browser's local storage.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-[#1f1f1f] bg-[#121212] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#222] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        {saved ? (
                            <>Saved!</>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Settings
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
