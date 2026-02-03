import React, { useState, useEffect } from 'react';
import { Ruler, Scale, Thermometer, ArrowRight } from 'lucide-react';

type UnitType = 'length' | 'weight' | 'temperature';

const UNITS: Record<UnitType, Record<string, number | ((val: number) => number)>> = {
    length: {
        'Meter (m)': 1,
        'Kilometer (km)': 1000,
        'Centimeter (cm)': 0.01,
        'Millimeter (mm)': 0.001,
        'Mile (mi)': 1609.34,
        'Yard (yd)': 0.9144,
        'Foot (ft)': 0.3048,
        'Inch (in)': 0.0254,
    },
    weight: {
        'Kilogram (kg)': 1,
        'Gram (g)': 0.001,
        'Milligram (mg)': 0.000001,
        'Pound (lb)': 0.453592,
        'Ounce (oz)': 0.0283495,
        'Metric Ton (t)': 1000,
    },
    temperature: {
        // Temp is special, handled separately
        'Celsius (°C)': 1,
        'Fahrenheit (°F)': 1,
        'Kelvin (K)': 1,
    }
};

const UnitConverter = () => {
    const [activeTab, setActiveTab] = useState<UnitType>('length');
    const [amount, setAmount] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState<string>('Meter (m)');
    const [toUnit, setToUnit] = useState<string>('Foot (ft)');
    const [result, setResult] = useState<number>(0);

    // Reset defaults when tab changes
    useEffect(() => {
        const keys = Object.keys(UNITS[activeTab]);
        setFromUnit(keys[0]);
        setToUnit(keys[1] || keys[0]);
    }, [activeTab]);

    useEffect(() => {
        calculate();
    }, [amount, fromUnit, toUnit, activeTab]);

    const calculate = () => {
        if (activeTab === 'temperature') {
            let cel = 0;
            // Convert TO Celsius first
            if (fromUnit === 'Celsius (°C)') cel = amount;
            if (fromUnit === 'Fahrenheit (°F)') cel = (amount - 32) * 5/9;
            if (fromUnit === 'Kelvin (K)') cel = amount - 273.15;

            // Convert FROM Celsius to target
            if (toUnit === 'Celsius (°C)') setResult(cel);
            if (toUnit === 'Fahrenheit (°F)') setResult((cel * 9/5) + 32);
            if (toUnit === 'Kelvin (K)') setResult(cel + 273.15);
        } else {
            // Factor based conversion
            const fromFactor = UNITS[activeTab][fromUnit] as number;
            const toFactor = UNITS[activeTab][toUnit] as number;
            
            // Convert to base unit (factor 1) then to target
            const base = amount * fromFactor;
            const final = base / toFactor;
            setResult(final);
        }
    };

    const tabs = [
        { id: 'length', label: 'Length', icon: Ruler },
        { id: 'weight', label: 'Weight', icon: Scale },
        { id: 'temperature', label: 'Temperature', icon: Thermometer },
    ];

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex bg-[var(--bg-secondary)] p-1 rounded-xl border border-[var(--border-subtle)] w-fit mx-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as UnitType)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                            activeTab === tab.id 
                            ? 'bg-[var(--bg-card)] text-[var(--accent-red)] shadow-sm' 
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Converter Card */}
            <div className="grid md:grid-cols-7 gap-4 items-center bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-subtle)]">
                {/* FROM */}
                <div className="md:col-span-3 space-y-4">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">From</label>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-2xl font-bold focus:border-[var(--accent-red)] focus:outline-none"
                    />
                    <select 
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-3 font-bold text-[var(--text-secondary)] focus:outline-none cursor-pointer"
                    >
                        {Object.keys(UNITS[activeTab]).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>

                {/* Arrow */}
                <div className="flex justify-center md:col-span-1">
                    <div className="bg-[var(--bg-secondary)] p-3 rounded-full text-[var(--text-muted)]">
                        <ArrowRight className="w-6 h-6 md:rotate-0 rotate-90" />
                    </div>
                </div>

                {/* TO */}
                <div className="md:col-span-3 space-y-4">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">To</label>
                    <div className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-2xl font-bold text-[var(--accent-red)] overflow-hidden text-ellipsis">
                        {parseFloat(result.toFixed(6))} {/* Formatting to avoid long decimals */}
                    </div>
                     <select 
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-3 font-bold text-[var(--text-secondary)] focus:outline-none cursor-pointer"
                    >
                        {Object.keys(UNITS[activeTab]).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;
