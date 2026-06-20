"use client";

export default function UserProfile() {
    return (
        <div className="relative group w-[100%] p-4 border-t border-zinc-800/80 bg-zinc-950 hover:bg-zinc-900/50 transition-colors duration-300 cursor-pointer">

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#D4AF37]/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span className="text-[#D4AF37] font-bold text-sm tracking-wider">SA</span>
                </div>
                
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">Stanly Almeida</p>
                    <p className="text-xs text-zinc-500 truncate">Desenvolvedor Full Stack</p>
                </div>
            </div>

            <div className="absolute left-0 bottom-full w-[100%] pb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 shadow-2xl shadow-black/50 mx-4">
                    <button className="w-[100%] flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Deslogar do sistema
                    </button>
                </div>
            </div>
            
        </div>
    );
}