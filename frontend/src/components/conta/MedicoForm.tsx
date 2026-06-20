export default function MedicoForm({ onBack }: { onBack: () => void }) {
    return (
        <div className="w-[100%] max-w-md mx-auto space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Perfil Médico</h2>
                <p className="text-zinc-400 mt-2 text-sm">Insira suas credenciais profissionais</p>
            </div>

            <form className="space-y-5 w-[100%]" onSubmit={(e) => e.preventDefault()}>
                <div className="w-[100%]">
                    <label className="block text-sm font-medium text-zinc-300 mb-1">CRM</label>
                    <input 
                        type="text" 
                        maxLength={10}
                        placeholder="123456-UF"
                        className="w-[100%] px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all uppercase"
                    />
                </div>
                
                <div className="w-[100%]">
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Especialidade Principal</label>
                    <input 
                        type="text" 
                        maxLength={100}
                        placeholder="Ex: Cardiologia, Pediatria..."
                        className="w-[100%] px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    />
                </div>
                
                <div className="flex gap-4 mt-6">
                    <button 
                        type="button"
                        onClick={onBack}
                        className="w-[30%] py-3 px-4 bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-semibold rounded-lg transition-all duration-200"
                    >
                        Voltar
                    </button>
                    <button 
                        type="submit" 
                        className="w-[70%] py-3 px-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold rounded-lg transition-all duration-200"
                    >
                        Validar CRM e Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}