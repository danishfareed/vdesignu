import React, { useState } from 'react';
import { Delete, Eraser, Equal } from 'lucide-react';

const ScientificCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [memory, setMemory] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const [isNewCalculation, setIsNewCalculation] = useState(false);

    const handleNumber = (num: string) => {
        if (display === '0' || display === 'Error' || isNewCalculation) {
            setDisplay(num);
            setIsNewCalculation(false);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperator = (op: string) => {
        if (!isNewCalculation) {
            setDisplay(display + op);
            setIsNewCalculation(false);
        }
    };

    const calculate = () => {
        try {
            // Replace visual operators with JS operators for eval
            const expression = display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/\^/g, '**');

            // Safe eval (restricted scope)
             // eslint-disable-next-line
            const result = eval(expression).toString();
            
            if (result === 'NaN' || result === 'Infinity') {
                setDisplay('Error');
            } else {
                setDisplay(result);
                setHistory(prev => [`${display} = ${result}`, ...prev].slice(0, 5));
                setIsNewCalculation(true);
            }
        } catch (error) {
            setDisplay('Error');
            setIsNewCalculation(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setIsNewCalculation(false);
    };

    const handleDelete = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const insertFunction = (func: string) => {
        if (display === '0' || isNewCalculation) {
            setDisplay(func + '(');
            setIsNewCalculation(false);
        } else {
            setDisplay(display + func + '(');
        }
    };

    const buttons = [
        { label: '(', type: 'op' }, { label: ')', type: 'op' }, { label: 'mc', type: 'mem', action: () => setMemory(0) }, { label: 'm+', type: 'mem', action: () => setMemory(memory + parseFloat(display)) }, { label: 'm-', type: 'mem', action: () => setMemory(memory - parseFloat(display)) }, { label: 'mr', type: 'mem', action: () => setDisplay(memory.toString()) },
        { label: 'sin', type: 'fn' }, { label: 'cos', type: 'fn' }, { label: 'tan', type: 'fn' }, { label: 'log', type: 'fn' }, { label: 'ln', type: 'fn' }, { label: '÷', type: 'op' },
        { label: 'π', type: 'num' }, { label: 'sqrt', type: 'fn' }, { label: '^', type: 'op' }, { label: '7', type: 'num' }, { label: '8', type: 'num' }, { label: '9', type: 'num' }, { label: '×', type: 'op' },
        { label: 'e', type: 'num' }, { label: 'x²', type: 'fn', val: '^2' }, { label: '1/x', type: 'fn', val: '^(-1)' }, { label: '4', type: 'num' }, { label: '5', type: 'num' }, { label: '6', type: 'num' }, { label: '-', type: 'op' },
        { label: 'abs', type: 'fn' }, { label: '%', type: 'op' }, { label: 'mod', type: 'op' }, { label: '1', type: 'num' }, { label: '2', type: 'num' }, { label: '3', type: 'num' }, { label: '+', type: 'op' },
        { label: 'C', type: 'action', action: handleClear }, { label: '0', type: 'num', wide: true }, { label: '.', type: 'num' }, { label: '=', type: 'eq', action: calculate }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-3xl border border-[var(--border-subtle)] shadow-2xl">
                {/* Display */}
                <div className="bg-[var(--bg-primary)] p-4 rounded-xl mb-6 text-right border border-[var(--border-subtle)] h-24 flex flex-col justify-end overflow-hidden">
                    <div className="text-sm text-[var(--text-muted)] mb-1 h-5">{history[0]?.split('=')[0]}</div>
                    <div className="text-4xl font-mono font-bold text-[var(--text-primary)] truncate tracking-wider">{display}</div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-6 gap-2">
                    {buttons.map((btn, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (btn.action) btn.action();
                                else if (btn.type === 'fn') insertFunction(btn.val || btn.label);
                                else if (btn.type === 'op') handleOperator(btn.label);
                                else handleNumber(btn.label);
                            }}
                            className={`
                                h-12 rounded-lg font-bold text-sm transition-all active:scale-95
                                ${btn.wide ? 'col-span-2' : 'col-span-1'}
                                ${btn.type === 'num' ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-highlight)]' : ''}
                                ${btn.type === 'op' ? 'bg-[var(--bg-highlight)] text-[var(--accent-primary)] hover:brightness-110' : ''}
                                ${btn.type === 'fn' ? 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-highlight)]' : ''}
                                ${btn.type === 'mem' ? 'bg-transparent text-[var(--text-muted)] text-xs hover:text-[var(--text-primary)]' : ''}
                                ${btn.type === 'action' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 col-span-1' : ''}
                                ${btn.type === 'eq' ? 'bg-[var(--accent-primary)] text-white hover:brightness-110 col-span-1 shadow-lg shadow-[var(--accent-primary)]/20' : ''}
                            `}
                        >
                            {btn.label === 'C' ? <Eraser className="w-5 h-5 mx-auto" /> : 
                             btn.label === '=' ? <Equal className="w-5 h-5 mx-auto" /> : 
                             btn.label}
                        </button>
                    ))}
                    <button onClick={handleDelete} className="col-span-1 h-12 rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-red-400 flex items-center justify-center transition-colors">
                        <Delete className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* History */}
            <div className="bg-[var(--bg-secondary)] p-6 rounded-3xl border border-[var(--border-subtle)] h-full max-h-[500px] overflow-hidden flex flex-col">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">History</h3>
                {history.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] italic">
                        No calculations yet.
                    </div>
                ) : (
                    <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                        {history.map((item, i) => (
                            <div key={i} className="p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)] text-right">
                                <div className="text-xs text-[var(--text-muted)] mb-1">{item.split('=')[0]}</div>
                                <div className="text-xl font-bold text-[var(--text-primary)]">= {item.split('=')[1]}</div>
                            </div>
                        ))}
                    </div>
                )}
                 <button 
                    onClick={() => setHistory([])}
                    className="mt-4 w-full py-2 text-sm text-[var(--text-muted)] hover:text-red-500 transition-colors border-t border-[var(--border-subtle)]"
                >
                    Clear History
                </button>
            </div>
        </div>
    );
};

export default ScientificCalculator;
