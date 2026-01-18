import React, { useEffect, useRef, useState } from 'react';

const Game404 = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('v-rex-highscore');
        if (saved) setHighScore(parseInt(saved));

        const handleKey = (e: KeyboardEvent) => {
            if (e.code === 'Space') e.preventDefault();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Config
        const SPEED = 6;
        const JUMP = -12;
        const GRAVITY = 0.6;
        const GROUND_Y = canvas.height - 40;

        // State
        let frameId = 0;
        let gameScore = 0;
        let obstacles: { x: number; y: number; w: number; h: number }[] = [];
        let clouds: { x: number; y: number }[] = [];

        const player = {
            x: 50,
            y: GROUND_Y - 40,
            w: 40,
            h: 40,
            vy: 0,
            grounded: true
        };

        let jumpPressed = false;

        // Input
        const onDown = (e: KeyboardEvent | TouchEvent) => {
            const isSpace = e.type === 'keydown' && (e as KeyboardEvent).code === 'Space';
            const isTouch = e.type === 'touchstart';
            
            if (isSpace || isTouch) {
                if (!jumpPressed && player.grounded) {
                    player.vy = JUMP;
                    player.grounded = false;
                }
                jumpPressed = true;
            }
        };

        const onUp = () => { jumpPressed = false; };

        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup', onUp);
        window.addEventListener('touchstart', onDown);
        window.addEventListener('touchend', onUp);

        // Loop
        const loop = () => {
            ctx.clearRect(0,0, canvas.width, canvas.height);

            // Sky
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(0,0, canvas.width, canvas.height);

            // Cloud Gen
            if (gameScore % 100 === 0 && Math.random() > 0.5) {
                clouds.push({ x: canvas.width, y: 30 + Math.random() * 100 });
            }
            clouds.forEach(c => {
                c.x -= 2;
                ctx.fillStyle = '#e5e7eb';
                ctx.beginPath();
                ctx.arc(c.x, c.y, 20, 0, Math.PI*2);
                ctx.arc(c.x+15, c.y-10, 25, 0, Math.PI*2);
                ctx.fill();
            });
            clouds = clouds.filter(c => c.x > -50);

            // Ground
            ctx.fillStyle = '#171717';
            ctx.fillRect(0, GROUND_Y, canvas.width, 2);

            // Obstacle Gen
            if (gameScore % 90 === 0 && Math.random() > 0.5) {
                 const h = Math.random() > 0.5 ? 50 : 30;
                 const w = 30;
                 obstacles.push({ x: canvas.width, y: GROUND_Y - h, w, h });
            }

            // Player Physics
            player.vy += GRAVITY;
            player.y += player.vy;
            
            if (player.y + player.h > GROUND_Y) {
                player.y = GROUND_Y - player.h;
                player.vy = 0;
                player.grounded = true;
            }

            // Obstacle Logic
            let collided = false;
            obstacles.forEach(ob => {
                ob.x -= SPEED;
                
                // Draw Obstacle (Cactus-like)
                ctx.fillStyle = '#dc2626'; // Red
                ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
                
                // Collision (Simple AABB with padding)
                const pad = 6;
                if (
                    player.x + pad < ob.x + ob.w - pad &&
                    player.x + player.w - pad > ob.x + pad &&
                    player.y + pad < ob.y + ob.h - pad &&
                    player.y + player.h > ob.y
                ) {
                    collided = true;
                }
            });
            obstacles = obstacles.filter(o => o.x > -50);

            if (collided) {
                if (gameScore > highScore) {
                    setHighScore(gameScore);
                    localStorage.setItem('v-rex-highscore', gameScore.toString());
                }
                setScore(gameScore);
                setGameState('gameover');
                return;
            }

            // Draw Player (V-Rex)
            const p = player;
            ctx.fillStyle = '#000';
            // Simple V Shape
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.w, p.y);
            ctx.lineTo(p.x + p.w/2, p.y + p.h);
            ctx.fill();
            
            // Eye
            ctx.fillStyle = '#fff';
            ctx.fillRect(p.x + p.w/2 + 2, p.y + 10, 6, 6);

            // Score
            ctx.fillStyle = '#525252';
            ctx.font = '20px monospace';
            ctx.fillText(`SCORE: ${gameScore}`, canvas.width - 150, 30);
            ctx.fillText(`HI: ${highScore}`, canvas.width - 150, 55);

            gameScore++;
            if (gameScore % 10 === 0) setScore(gameScore); // Sync UI rarely
            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('keydown', onDown);
            window.removeEventListener('keyup', onUp);
            window.removeEventListener('touchstart', onDown);
            window.removeEventListener('touchend', onUp);
        };
    }, [gameState, highScore]);

    return (
        <div className="w-full max-w-[800px] mx-auto bg-white border-2 border-slate-200 p-1 rounded-lg shadow-sm select-none">
            <div className="relative h-[300px] overflow-hidden bg-[#fafafa] border border-slate-100">
                {gameState === 'start' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">V-RUNNER</h2>
                        <p className="text-slate-500 mb-6 font-mono text-sm">Space to Jump</p>
                        <button 
                            onClick={() => setGameState('playing')}
                            className="px-6 py-2 bg-black text-white font-bold hover:bg-slate-800 transition"
                        >
                            START
                        </button>
                    </div>
                )}
                
                {gameState === 'gameover' && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10">
                        <h2 className="text-3xl font-black text-red-600 mb-2">GAME OVER</h2>
                        <p className="text-slate-800 mb-6 font-mono font-bold">SCORE: {score}</p>
                        <button 
                            onClick={() => setGameState('playing')}
                            className="px-6 py-2 bg-black text-white font-bold hover:bg-slate-800 transition"
                        >
                            TRY AGAIN
                        </button>
                    </div>
                )}

                <canvas ref={canvasRef} width={800} height={300} className="w-full h-full block" />
            </div>
        </div>
    );
};

export default Game404;
