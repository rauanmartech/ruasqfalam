import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Gem, Hotel, ShoppingCart, ArrowRight, X, Lock, LogOut, CheckCircle, Clock, Trash2, AlertTriangle, Play, RefreshCw, Trophy, Info, PlusCircle, UserPlus, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { supabase } from './supabase';
import MainLogo from '../assets/Ruas que falam.png';
import SecondaryLogo from '../assets/Mulheres em cena.png';
import PartnerPousada from '../assets/Pousada dos Ofícios.png';
import PartnerDaphine from '../assets/Daphine Ateliê.png';
import PartnerBrecho from '../assets/Brechó das Anas.png';

// --- Shared Components ---

function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-pop-pink border-b-pop border-pop-dark shadow-[0_6px_0_#1d1e1c] flex items-center justify-between py-3 px-5 relative z-50">
      <Link to="/">
        <img src={MainLogo} alt="Ruas Que Falam" className="h-10 object-contain drop-shadow-[2px_2px_0_rgba(255,255,255,1)]" />
      </Link>
      <div className="flex gap-2">
        <button 
          onClick={() => navigate('/admin')}
          className="bg-pop-white border-2 border-pop-dark shadow-pop-sm py-2 px-3 font-black text-pop-dark transition-all hover:bg-pop-dark hover:text-white"
        >
          <Lock size={16} />
        </button>
        <button 
          onClick={() => {
            if (window.location.pathname !== '/') {
              navigate('/');
              setTimeout(() => document.getElementById('raffle-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            } else {
              document.getElementById('raffle-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="bg-pop-orange border-2 border-pop-dark shadow-pop-sm py-2 px-4 font-black text-[0.65rem] text-pop-dark uppercase active:translate-y-0.5"
        >
          Escolher números
        </button>
      </div>
    </header>
  );
}

function CustomModal({ isOpen, title, message, type = 'info', onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancelar' }) {
  if (!isOpen) return null;
  const colors = {
    info: 'bg-pop-orange',
    warning: 'bg-pop-pink',
    danger: 'bg-[#ff3b30]'
  };
  return (
    <div className="fixed inset-0 z-[500] bg-pop-dark/90 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-xs bg-pop-white border-4 border-pop-dark shadow-[10px_10px_0_#1d1e1c] p-8 text-center animate-in zoom-in-95">
        <div className="flex justify-center mb-6">
          <div className={`${colors[type]} border-2 border-pop-dark p-3 rotate-3 shadow-pop-xs`}>
            {type === 'danger' ? <Trash2 size={32} className="text-white" /> : type === 'warning' ? <AlertTriangle size={32} className="text-white" /> : <Info size={32} className="text-white" />}
          </div>
        </div>
        <h3 className="font-sans font-black text-xl text-pop-dark uppercase mb-4 leading-tight">{title}</h3>
        <p className="font-sans font-bold text-[0.7rem] opacity-60 mb-8 uppercase tracking-widest leading-relaxed">{message}</p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className={`w-full ${type === 'danger' ? 'bg-[#ff3b30]' : 'bg-pop-dark'} text-white border-2 border-pop-dark py-3 font-black uppercase text-xs shadow-pop-xs active:translate-y-1 active:shadow-none transition-all`}
          >
            {confirmText}
          </button>
          {onCancel && (
            <button 
              onClick={onCancel}
              className="w-full bg-pop-white text-pop-dark border-2 border-pop-dark py-3 font-black uppercase text-xs hover:bg-pop-beige active:translate-y-1 transition-all"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Home Components ---

function Hero() {
  return (
    <section className="w-full px-5 py-12 flex flex-col items-center text-center relative z-10">
      <div className="mb-8 w-full px-4 flex justify-center">
        <img src={SecondaryLogo} alt="Mulheres em cena" className="w-full max-w-[320px] object-contain drop-shadow-[6px_6px_0_#ba006a] -rotate-3" />
      </div>
      <div className="flex flex-row gap-4 mb-10 w-full max-w-sm items-stretch text-center">
        <div className="flex-1 bg-pop-white border-pop border-pop-dark shadow-[4px_4px_0_#1d1e1c] p-3 transform -rotate-2 flex flex-col justify-center">
          <p className="font-sans font-black text-[1.05rem] leading-tight text-pop-dark uppercase">
            Rifa das Minas: <span className="text-pop-pink italic lowercase">várias histórias</span> pra contar.
          </p>
        </div>
        <div className="flex-1 font-sans font-bold text-[0.75rem] leading-tight flex flex-col items-center justify-center">
          <span className="bg-pop-dark text-pop-white px-2 py-1.5 rotate-1 border-2 border-pop-dark w-full text-center tracking-tighter uppercase">GARANTA POR APENAS</span>
          <span className="bg-pop-pink text-pop-white px-2 py-2 -rotate-2 shadow-[3px_3px_0_#1d1e1c] border-2 border-pop-dark mt-[-4px] text-2xl font-black z-10 w-[110%] text-center">R$ 5</span>
          <span className="bg-pop-dark text-pop-white px-2 py-1.5 rotate-1 border-2 border-pop-dark mt-[-4px] w-[95%] text-center tracking-tighter uppercase">E PARTICIPE</span>
        </div>
      </div>
    </section>
  );
}

function ContextSection() {
  return (
    <section className="px-5 py-2 -mt-8 flex flex-col items-center relative z-10">
      <div className="relative w-full max-w-sm">
        <div className="bg-pop-dark text-pop-white border-pop border-pop-dark p-6 relative transform rotate-1 shadow-[8px_8px_0_#ba006a]">
           <p className="font-sans font-black text-lg leading-tight text-center italic uppercase">
             "Presenteie uma mina que representa: participe da Rifa das Minas e fortaleça quem faz a rua acontecer."
           </p>
           <div className="absolute -top-3 -left-3 bg-pop-orange text-pop-dark p-1 border-2 border-pop-dark font-black text-xs rotate-[-12deg] z-20 uppercase">MANIFESTO</div>
           <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-pop-white border-2 border-pop-dark rounded-full z-10 flex items-center justify-center">
             <div className="w-2 h-2 bg-pop-dark rounded-full"></div>
           </div>
        </div>
      </div>
    </section>
  );
}

function Prizes() {
  const prizeData = [
    { rank: '1º PRÊMIO', name: 'Uma jóia exclusiva feita à mão pela Daphine Ateliê', desc: 'Peça única, criada com identidade e significado.', color: 'bg-pop-orange', icon: <Gem size={42} strokeWidth={2.5} /> },
    { rank: '2º PRÊMIO', name: 'Uma diária na Pousada dos Ofícios', desc: 'Um tempo pra desacelerar e viver algo novo.', color: 'bg-pop-pink', icon: <Hotel size={42} strokeWidth={2.5} /> },
    { rank: '3º PRÊMIO', name: 'Vale compra de R$100 no Brechó das Anas', desc: 'Pra garimpar estilo do seu jeito.', color: 'bg-pop-white', icon: <ShoppingCart size={42} strokeWidth={2.5} /> },
  ];
  return (
    <section className="px-5 py-12 flex flex-col items-center relative z-10 w-full mb-10">
      <h2 className="font-pop-title text-4xl mb-12 -rotate-2 bg-pop-white border-pop border-pop-dark px-6 py-2 shadow-pop text-center leading-tight uppercase">O QUE VOCÊ PODE GANHAR</h2>
      <div className="grid grid-cols-1 gap-8 w-full max-w-sm">
        {prizeData.map((item, index) => (
          <div key={index} className={`flex items-stretch overflow-hidden border-pop border-pop-dark shadow-pop transition-all hover:scale-[1.03] ${index === 0 ? 'ring-4 ring-pop-orange shadow-[12px_12px_0_#1d1e1c]' : ''}`}>
            <div className={`w-28 flex-shrink-0 flex flex-col items-center justify-center border-r-pop border-pop-dark ${item.color}`}>
              <div className="p-2 text-pop-dark">{item.icon}</div>
              <span className="font-sans font-black text-[0.6rem] bg-pop-dark text-pop-white px-2 py-0.5 transform -rotate-3 border border-pop-dark uppercase">{item.rank}</span>
            </div>
            <div className="flex-1 bg-pop-white p-4 flex flex-col justify-center min-h-[120px]">
              <h3 className="font-sans font-black text-[1.1rem] leading-tight mb-2 uppercase">{item.name}</h3>
              <p className="font-sans font-bold text-[0.8rem] leading-tight text-pop-dark opacity-80 lowercase italic">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RaffleSection({ selectedNumbers, reservedNumbers, onToggleNumber }) {
  const allNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
  return (
    <section id="raffle-section" className="px-5 py-16 flex flex-col items-center relative z-10 w-full bg-pop-white border-y-pop border-pop-dark shadow-[inset_0_10px_0_#1d1e1c]">
      <div className="w-full max-w-sm flex flex-col items-center">
        <h2 className="font-pop-title text-5xl mb-4 -rotate-1 text-center leading-[0.9] text-pop-pink uppercase font-black">ESCOLHA SEUS NÚMEROS</h2>
        <p className="bg-pop-dark text-pop-white px-4 py-1.5 font-sans font-black text-xs mb-10 transform rotate-1 uppercase tracking-widest border-2 border-pop-dark shadow-[4px_4px_0_#ba006a]">SÃO APENAS 100 NÚMEROS DISPONÍVEIS</p>

        <div className="grid grid-cols-1 gap-3 w-full mb-12">
           <div className="flex justify-start"><span className="bg-pop-orange border-pop border-pop-dark px-4 py-2 text-xs font-black rotate-[-3deg] shadow-pop-sm uppercase tracking-tight">Cada número custa R$5</span></div>
           <div className="flex justify-end"><span className="bg-pop-pink text-pop-white border-pop border-pop-dark px-4 py-2 text-xs font-black rotate-[2deg] shadow-pop-sm uppercase tracking-tight">Quanto mais números, mais chances</span></div>
           <div className="flex justify-center"><span className="bg-pop-white border-pop border-pop-dark px-4 py-2 text-xs font-black rotate-[-1deg] shadow-pop-sm uppercase animate-bounce tracking-tight">Escolha rápido antes que acabe!</span></div>
        </div>

        <div id="raffle-grid-container" className="w-full bg-pop-beige border-pop border-pop-dark p-4 shadow-[12px_12px_0_#1d1e1c] relative">
          <div className="flex justify-between mb-6 font-sans font-black text-[0.55rem] border-b-2 border-pop-dark pb-3 uppercase tracking-tighter">
             <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 bg-pop-white border-2 border-pop-dark"></div> LIVRE</div>
             <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 bg-pop-orange border-2 border-pop-dark"></div> ESCOLHIDO</div>
             <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 bg-pop-dark border-2 border-pop-dark"></div> RESERVADO / PAGO</div>
          </div>
          <div className="grid grid-cols-10 gap-1.5 w-full">
            {allNumbers.map((n) => {
              const isSelected = selectedNumbers.includes(n);
              const isReserved = reservedNumbers.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => !isReserved && onToggleNumber(n)}
                  disabled={isReserved}
                  className={`aspect-square flex items-center justify-center text-[0.65rem] font-black border-2 border-pop-dark transition-all duration-100 active:scale-90 ${isReserved ? 'bg-pop-dark text-white opacity-40 cursor-not-allowed shadow-none' : isSelected ? 'bg-pop-orange scale-110 -translate-y-1 shadow-[4px_4px_0_#1d1e1c] z-10' : 'bg-pop-white hover:bg-pop-orange/30 shadow-none'}`}
                >
                  {n.toString().padStart(2, '0')}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const partners = [
    { name: 'Pousada dos Ofícios', logo: PartnerPousada },
    { name: 'Daphine Ateliê', logo: PartnerDaphine },
    { name: 'Brechó das Anas', logo: PartnerBrecho }
  ];
  return (
    <footer className="w-full bg-transparent text-pop-dark pt-6 pb-20 px-6 flex flex-col items-center border-t-8 border-pop-orange relative z-10">
      <div className="w-full max-sm flex flex-col items-center">
        <h3 className="font-pop-title text-2xl mb-4 text-pop-pink text-center tracking-wide uppercase">NOSSOS ALIADOS</h3>
        <div className="w-full overflow-hidden relative mb-4 py-2">
          <div className="animate-scroll flex items-center gap-16 whitespace-nowrap">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div key={i} className="flex-shrink-0">
                <img src={p.logo} alt={p.name} className="h-14 w-auto object-contain filter drop-shadow-[4px_4px_0_rgba(186,0,106,0.2)]" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full pt-2 flex flex-col items-center text-center">
          <p className="font-pop-title text-2xl mb-1 text-pop-pink uppercase">Ruas que Falam ©</p>
          <p className="font-sans font-bold text-[0.6rem] tracking-widest opacity-60 uppercase">FEITO COM IDENTIDADE.</p>
        </div>
      </div>
    </footer>
  );
}

// --- Admin Components ---

function SlotMachine({ winners, isSpinning, currentNumbers }) {
  const prizes = [{ icon: <Gem size={24} />, name: 'Jóia' }, { icon: <Hotel size={24} />, name: 'Pousada' }, { icon: <ShoppingCart size={24} />, name: 'Brechó' }];
  return (
    <div className="grid grid-cols-3 gap-3 w-full mb-8">
      {prizes.map((p, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-pop-pink text-white p-2 border-2 border-pop-dark w-full flex justify-center mb-2 shadow-pop-xs">{p.icon}</div>
          <div className="bg-pop-white border-pop border-pop-dark w-full h-24 flex items-center justify-center relative overflow-hidden shadow-pop-sm">
            <span className={`font-pop-title text-4xl leading-none ${isSpinning ? 'animate-bounce text-pop-pink' : 'text-pop-dark'}`}>
              {(currentNumbers[idx] || (winners[idx]?.numero || 0)).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'info', onConfirm: null, onCancel: null });
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentNumbers, setCurrentNumbers] = useState([0, 0, 0]);
  const spinInterval = useRef(null);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const [manualEntry, setManualEntry] = useState({ numero: '', nome: '', telefone: '', pago: true });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); if (session?.user) fetchTickets(); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); if (session?.user) fetchTickets(); });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchTickets() { setLoading(true); const { data } = await supabase.from('rifa_numeros').select('*').order('created_at', { ascending: false }); if (data) setTickets(data); setLoading(false); }
  const handleLogin = async (e) => { e.preventDefault(); const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) setModal({ isOpen: true, title: 'Erro Login', message: error.message, type: 'danger', onConfirm: () => setModal({ ...modal, isOpen: false }) }); };
  const markAsPaid = async (id) => { await supabase.from('rifa_numeros').update({ status: 'pago' }).eq('id', id); fetchTickets(); };
  const askToDelete = (ticket) => { setModal({ isOpen: true, title: 'Quer apagar?', message: `Número ${ticket.numero}.`, type: 'danger', onConfirm: async () => { await supabase.from('rifa_numeros').delete().eq('id', ticket.id); setModal({ ...modal, isOpen: false }); fetchTickets(); }, onCancel: () => setModal({ ...modal, isOpen: false }), confirmText: 'Apagar', cancelText: 'Voltar' }); };
  const resetRaffle = () => { 
    setModal({ 
      isOpen: true, 
      title: 'RECOMEÇAR TUDO?', 
      message: 'Esta ação irá apagar os atuais ganhadores e limpar o painel. Tem certeza absoluta que deseja iniciar um novo ciclo de sorteio?', 
      type: 'warning', 
      onConfirm: async () => { 
        await supabase.from('rifa_numeros').update({ sorteado: 0 }).neq('id', '00000000-0000-0000-0000-000000000000'); 
        setModal({ ...modal, isOpen: false }); 
        fetchTickets(); 
      }, 
      onCancel: () => setModal({ ...modal, isOpen: false }), 
      confirmText: 'SIM, LIMPAR!', 
      cancelText: 'VOLTAR' 
    }); 
  };

  const startDraw = async () => {
    const winnersSorted = tickets.filter(t => t.sorteado > 0);
    if (winnersSorted.length > 0) { 
      setModal({ 
        isOpen: true, 
        title: 'SORTEIO JÁ REALIZADO', 
        message: 'Já temos ganhadores definidos! Se desejar realizar um novo sorteio, você precisa resetar os resultados atuais primeiro no botão laranja.', 
        type: 'warning', 
        onConfirm: () => setModal({ ...modal, isOpen: false }) 
      }); 
      return; 
    }
    const paidTickets = tickets.filter(t => t.status === 'pago');
    if (paidTickets.length < 3) { 
      setModal({ 
        isOpen: true, 
        title: 'QUASE LÁ PARA O SORTEIO!', 
        message: 'Precisamos de pelo menos 3 números marcados como PAGOS para realizar um sorteio justo. Assim que você confirmar os pagamentos no painel administrativo, o sorteio será liberado!', 
        type: 'info', 
        onConfirm: () => setModal({ ...modal, isOpen: false }) 
      }); 
      return; 
    }
    setIsSpinning(true);
    const paidNumbers = paidTickets.map(t => t.numero);
    const winners = [...paidTickets].sort(() => 0.5 - Math.random()).slice(0, 3);
    let n = 0; spinInterval.current = setInterval(() => { n++; setCurrentNumbers([n > 25 ? winners[0].numero : paidNumbers[Math.floor(Math.random()*paidNumbers.length)], n > 30 ? winners[1].numero : paidNumbers[Math.floor(Math.random()*paidNumbers.length)], n > 35 ? winners[2].numero : paidNumbers[Math.floor(Math.random()*paidNumbers.length)]]); if (n >= 40) { clearInterval(spinInterval.current); finishDraw(winners); } }, 80);
  };

  async function finishDraw(winners) { for (let i = 0; i < winners.length; i++) { await supabase.from('rifa_numeros').update({ sorteado: i+1 }).eq('id', winners[i].id); } setIsSpinning(false); fetchTickets(); }

  const downloadGrid = async () => {
    if (!gridRef.current) return;
    const dataUrl = await toPng(gridRef.current, { 
      quality: 1, 
      pixelRatio: 4, // Higher quality
      backgroundColor: '#f5f0e6', // Force beige
      cacheBust: true 
    });
    const link = document.createElement('a'); 
    link.download = `tabela-rifa-das-minas-${new Date().toLocaleDateString()}.png`; 
    link.href = dataUrl; 
    link.click();
  };

  const handlesManual = async (e) => { e.preventDefault(); const { error } = await supabase.from('rifa_numeros').insert([{ numero: parseInt(manualEntry.numero), nome: manualEntry.nome, telefone: manualEntry.telefone, status: manualEntry.pago ? 'pago' : 'reservado' }]); if (error) { setModal({ isOpen: true, title: 'Erro', message: 'Ocupado.', type: 'danger', onConfirm: () => setModal({ ...modal, isOpen: false }) }); } else { setManualEntry({ numero: '', nome: '', telefone: '', pago: true }); fetchTickets(); } };

  const availableNumbers = Array.from({ length: 100 }, (_, i) => i + 1).filter(n => !tickets.map(t => t.numero).includes(n));
  const winnersSortedByDraw = tickets.filter(t => t.sorteado > 0).sort((a,b) => a.sorteado - b.sorteado);

  if (!user) {
    return (
      <div className="w-full bg-pop-pink min-h-screen flex items-center justify-center p-6 text-left relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1d1e1c 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        <div className="w-full max-w-sm bg-pop-white border-4 border-pop-dark shadow-[12px_12px_0_#1d1e1c] p-10 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-pop-orange p-4 border-2 border-pop-dark rotate-3 shadow-pop-xs"><Lock size={40} className="text-white" /></div>
          </div>
          <h2 className="font-pop-title text-5xl mb-8 -rotate-1 text-center text-pop-dark uppercase tracking-tighter">ÁREA RESTRITA</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-sans font-black text-[0.65rem] mb-2 uppercase opacity-50">E-mail</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full bg-pop-beige border-2 border-pop-dark p-4 font-sans font-bold outline-none focus:ring-4 ring-pop-pink/20" 
              />
            </div>
            <div>
              <label className="block font-sans font-black text-[0.65rem] mb-2 uppercase opacity-50">Senha</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full bg-pop-beige border-2 border-pop-dark p-4 font-sans font-bold outline-none focus:ring-4 ring-pop-pink/20" 
              />
            </div>
            <button type="submit" className="w-full bg-pop-dark text-white border-2 border-pop-dark py-5 font-black uppercase text-sm shadow-pop-sm active:translate-y-1 transition-all">Entrar</button>
            <button type="button" onClick={() => navigate('/')} className="w-full text-center font-sans font-black text-[0.65rem] uppercase opacity-40 hover:opacity-100 py-2">Voltar para o site</button>
          </form>
        </div>
        <CustomModal {...modal} />
      </div>
    );
  }

  return (
    <div className="w-full bg-pop-beige min-h-screen flex flex-col items-center p-4 relative text-left">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1d1e1c 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
      <div className="w-full max-w-md pb-12 relative z-10">
        <div className="flex justify-between items-center mb-8 mt-4 bg-pop-pink text-white p-4 border-2 border-pop-dark shadow-pop-sm">
           <h2 className="font-sans font-black text-lg uppercase">PAINEL ADMIN</h2>
           <div className="flex gap-2">
             <button 
               onClick={async () => { await supabase.auth.signOut(); setUser(null); }} 
               className="bg-[#ff3b30] p-2 border-2 border-white active:translate-y-1 transition-all" 
               title="Sair"
             >
               <LogOut size={18}/>
             </button>
             <button onClick={() => navigate('/')} className="bg-pop-white text-pop-dark p-2 border-2 border-pop-dark active:translate-y-1 transition-all"><X size={18}/></button>
           </div>
        </div>

        {/* Saldo Section */}
        <div className="mb-8 bg-pop-dark text-white p-6 border-4 border-pop-dark shadow-[8px_8px_0_#ff9500] flex items-center justify-between relative overflow-hidden">
           <div className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12"><Gem size={100} /></div>
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-1">
               <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse shadow-[0_0_8px_#25D366]"></div>
               <span className="font-sans font-black text-[0.65rem] uppercase tracking-widest text-[#25D366]">ARRECADAÇÃO TOTAL</span>
             </div>
             <div className="font-pop-title text-4xl leading-none">R$ {(tickets.filter(t => t.status === 'pago').length * 5).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
           </div>
           <div className="text-right flex flex-col items-end relative z-10">
             <span className="font-sans font-black text-[1.4rem] leading-none text-pop-orange">{tickets.filter(t => t.status === 'pago').length}</span>
             <span className="font-sans font-black text-[0.6rem] uppercase opacity-60">PAGOS</span>
           </div>
        </div>

        <div className="mb-10 bg-pop-white border-4 border-pop-dark p-6 shadow-pop text-left">
          <div className="flex items-center gap-3 mb-6"><Trophy className="text-pop-orange" size={24} /><h3 className="font-sans font-black uppercase italic">SORTEIO</h3></div>
          <SlotMachine winners={winnersSortedByDraw} isSpinning={isSpinning} currentNumbers={currentNumbers} />
          <div className="flex gap-3">
            <button onClick={startDraw} disabled={isSpinning} className="flex-1 bg-[#25D366] text-white border-2 border-pop-dark py-4 font-black uppercase shadow-pop-sm active:translate-y-1">SORTEAR</button>
            <button onClick={resetRaffle} className="bg-pop-orange text-white border-2 border-pop-dark px-4 shadow-pop-sm active:translate-y-1"><RefreshCw size={18} /></button>
          </div>
          {winnersSortedByDraw.length > 0 && (
            <div className="mt-8 border-t-2 border-pop-dark pt-6 text-left">
              <span className="font-sans font-black text-[0.6rem] uppercase tracking-widest opacity-50 block mb-3">Ganhadores</span>
              <div className="space-y-3">
                {winnersSortedByDraw.map((w, i) => {
                  const prizes = ["Joia exclusiva Daphine Ateliê", "Diária na Pousada dos Ofícios", "Vale R$100 no Brechó das Anas"];
                  const message = `Olá ${w.nome}! Parabéns! Seu número #${w.numero.toString().padStart(2, '0')} foi o ganhador do ${i + 1}º prêmio (${prizes[i]}) da Rifa das Minas - Ruas Que Falam! 💎✨`;
                  return (
                    <div key={w.id} className="flex items-center justify-between bg-pop-beige p-3 border-2 border-pop-dark">
                      <div className="flex items-center gap-3">
                        <span className="bg-pop-pink text-white font-black px-2 py-0.5 text-xs">{i+1}º</span>
                        <div className="flex flex-col">
                          <span className="font-sans font-black text-xs uppercase">{w.nome}</span>
                          <span className="font-sans font-bold text-[0.6rem] opacity-50">{w.telefone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`https://wa.me/55${w.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="bg-[#25D366] text-white p-2 border-2 border-pop-dark shadow-pop-xs active:translate-y-0.5 flex items-center justify-center rounded-lg"
                          title="Notificar Ganhador"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
                        <span className="font-pop-title text-xl text-pop-pink">#{w.numero.toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-10 mb-12">
            <div><div className="flex items-center gap-3 mb-6 bg-pop-orange/20 p-2 border-2 border-pop-orange/40"><Clock className="text-pop-orange" size={20} /><h3 className="font-sans font-black text-sm uppercase">Reservas ({tickets.filter(t=>t.status==='reservado').length})</h3></div><div className="space-y-4">{tickets.filter(t=>t.status==='reservado').map(t=>(<div key={t.id} className="bg-pop-white border-2 border-pop-dark shadow-pop-sm p-4 relative"><div className="flex justify-between items-start mb-2"><span className="bg-pop-orange border-2 border-pop-dark text-white font-black px-2 py-0.5 text-xs">Nº {t.numero}</span><button onClick={()=>askToDelete(t)} className="text-[#ff3b30] p-1"><Trash2 size={18}/></button></div><p className="font-sans font-black text-sm uppercase mb-0.5">{t.nome}</p><p className="font-sans font-bold text-[0.65rem] opacity-60 mb-4">{t.telefone}</p><button onClick={()=>markAsPaid(t.id)} className="w-full bg-[#25D366] text-white border-2 border-pop-dark py-2 font-black text-[0.65rem] uppercase active:translate-y-1 shadow-pop-xs">Confirmar</button></div>))}</div></div>
            <div><div className="flex items-center gap-3 mb-6 bg-pop-pink/10 p-2 border-2 border-pop-pink/20"><CheckCircle className="text-pop-pink" size={20} /><h3 className="font-sans font-black text-sm uppercase">Pagos ({tickets.filter(t=>t.status==='pago').length})</h3></div><div className="space-y-2">{tickets.filter(t=>t.status==='pago').map(t=>(<div key={t.id} className="bg-pop-white border-2 border-pop-dark py-2 px-4 flex justify-between items-center shadow-pop-xs"><div className="flex items-center gap-4"><span className="font-black text-pop-pink text-xs uppercase">#{t.numero}</span><span className="font-sans font-bold text-[0.65rem] uppercase truncate max-w-[120px]">{t.nome}</span></div><button onClick={()=>askToDelete(t)} className="text-[#ff3b30]/60 hover:text-[#ff3b30]"><Trash2 size={16}/></button></div>))}</div></div>
        </div>

        <div className="mb-12 flex flex-col gap-6">
           <button onClick={downloadGrid} className="w-full bg-pop-orange border-4 border-pop-dark py-4 px-6 font-black uppercase shadow-pop active:translate-y-1 flex items-center justify-center gap-3 text-lg"><Download size={24}/> BAIXAR TABELA PNG</button>
           <div className="bg-pop-white border-4 border-pop-dark p-6 shadow-pop">
            <div className="flex items-center gap-3 mb-6"><UserPlus className="text-pop-pink" size={24} /><h3 className="font-sans font-black uppercase">VENDA MANUAL</h3></div>
            <form className="space-y-4" onSubmit={handlesManual}>
              <div><label className="block font-sans font-black text-[0.6rem] mb-1 uppercase opacity-50">Número</label><select value={manualEntry.numero} onChange={(e) => setManualEntry({ ...manualEntry, numero: e.target.value })} required className="w-full bg-pop-beige border-2 border-pop-dark p-3 font-sans font-bold text-sm outline-none">{availableNumbers.length === 0 ? <option>Esgotado</option> : <><option value="">Selecione...</option>{availableNumbers.map(n => (<option key={n} value={n}>Nº {n.toString().padStart(2, '0')}</option>))}</>}</select></div>
              <div><label className="block font-sans font-black text-[0.6rem] mb-1 uppercase opacity-50">Nome</label><input type="text" placeholder="Nome" value={manualEntry.nome} onChange={(e) => setManualEntry({ ...manualEntry, nome: e.target.value })} required className="w-full bg-pop-beige border-2 border-pop-dark p-3 font-sans font-bold text-sm outline-none" /></div>
              <div><label className="block font-sans font-black text-[0.6rem] mb-1 uppercase opacity-50">Celular</label><input type="tel" placeholder="(00) 00000-0000" value={manualEntry.telefone} onChange={(e) => setManualEntry({ ...manualEntry, telefone: e.target.value })} className="w-full bg-pop-beige border-2 border-pop-dark p-3 font-sans font-bold text-sm outline-none" /></div>
              <div className="flex items-center gap-3 py-2"><input type="checkbox" id="manual-pago" checked={manualEntry.pago} onChange={(e) => setManualEntry({ ...manualEntry, pago: e.target.checked })} className="w-5 h-5 border-2 border-pop-dark accent-pop-pink" /><label htmlFor="manual-pago" className="font-sans font-black text-xs uppercase">Já está pago?</label></div>
              <button type="submit" className="w-full bg-pop-pink text-white border-2 border-pop-dark py-4 font-black uppercase shadow-pop-xs active:translate-y-1">Registrar Venda</button>
            </form>
          </div>
        </div>

        {/* Hidden Export Grid Styled for Sharing */}
        <div style={{ position: 'absolute', left: '-10000px', top: 0 }}>
          <div ref={gridRef} className="w-[1000px] bg-pop-beige p-16 flex flex-col items-center justify-center relative overflow-hidden text-center border-[20px] border-pop-dark">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#101110 3px, transparent 3px)', backgroundSize: '60px 60px' }} />
             <div className="mb-14 relative z-10 flex flex-col items-center">
                <div className="mb-8 p-6 bg-pop-white border-[8px] border-pop-dark shadow-[16px_16px_0_#ba006a] -rotate-2">
                   <img src={SecondaryLogo} className="h-44 object-contain drop-shadow-[6px_6px_0_#1d1e1c]" alt="Secondary Logo"/>
                </div>
                <h2 className="font-pop-title text-8xl text-pop-pink uppercase drop-shadow-[6px_6px_0_#1d1e1c] tracking-tighter">RIFA DAS MINAS</h2>
                <div className="bg-pop-dark text-white px-8 py-3 border-4 border-pop-dark shadow-[8px_8px_0_#ff9500] mt-4 uppercase font-black text-3xl transform rotate-1">Ruas Que Falam</div>
             </div>
             <div className="bg-pop-white border-[12px] border-pop-dark p-10 shadow-[24px_24px_0_#1d1e1c] relative z-10 w-full">
                <div className="grid grid-cols-10 gap-4 mb-10">
                  {Array.from({ length: 100 }, (_, i) => i + 1).map(n => {
                    const status = tickets.find(t => t.numero === n)?.status || 'livre';
                    return (<div key={n} className={`w-16 h-16 border-[5px] border-pop-dark flex items-center justify-center font-black text-2xl shadow-none ${status === 'pago' ? 'bg-pop-dark text-white' : status === 'reservado' ? 'bg-pop-orange text-white' : 'bg-pop-white text-pop-dark'}`}>{n.toString().padStart(2, '0')}</div>);
                  })}
                </div>
                <div className="flex justify-center gap-14 font-black text-xl uppercase pt-8 border-t-[8px] border-pop-dark">
                   <div className="flex items-center gap-4"><div className="w-8 h-8 bg-pop-white border-[5px] border-pop-dark shadow-pop-xs"></div> Livre</div>
                   <div className="flex items-center gap-3"><div className="w-8 h-8 bg-pop-orange border-[5px] border-pop-dark shadow-pop-xs"></div> Reservado</div>
                   <div className="flex items-center gap-3"><div className="w-8 h-8 bg-pop-dark border-[5px] border-pop-dark shadow-pop-xs"></div> Pago</div>
                </div>
             </div>
             <div className="mt-16 flex flex-col items-center gap-4">
                <img src={MainLogo} className="h-16 opacity-80" alt="Main Logo"/>
                <div className="font-sans font-black text-2xl text-pop-dark bg-pop-white border-4 border-pop-dark px-10 py-3 shadow-[8px_8px_0_#ba006a] uppercase tracking-widest italic">@ruasqfalam</div>
             </div>
          </div>
        </div>
      </div>
      <CustomModal {...modal} />
    </div>
  );
}

// --- Landing Page ---

function LandingPage() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [reservedNumbers, setReservedNumbers] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'info', onConfirm: null });
  const TICKET_PRICE = 5;
  const totalAmount = (selectedNumbers.length * TICKET_PRICE).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  
  useEffect(() => { fetchReserved(); }, []);
  async function fetchReserved() { 
    try { 
      const { data } = await supabase.from('rifa_numeros').select('numero').eq('status', 'pago'); 
      if (data) setReservedNumbers(data.map(r => r.numero)); 
    } catch (err) { } 
  }

  const handleConfirm = async (name, phone) => {
    try {
      const inserts = selectedNumbers.map(n => ({ numero: n, nome: name, telefone: phone, status: 'reservado' }));
      const { error } = await supabase.from('rifa_numeros').insert(inserts);
      if (error) { setModal({ isOpen: true, title: 'Ops!', message: 'Ocupados. Atualizando...', type: 'warning', onConfirm: () => { setModal({ ...modal, isOpen: false }); fetchReserved(); } }); return; }
      const formatted = selectedNumbers.map(n => n.toString().padStart(2, '0')).join(', ');
      const whatsappMessage = `✨ NOVO PEDIDO DE RIFA - RUAS QUE FALAM ✨\n\n👤 Nome: ${name}\n🔢 Números: [${formatted}]\n💰 Total: R$ ${totalAmount}\n\nOlá! Gostaria de confirmar minha participação na Rifa das Minas e realizar o pagamento dos números acima. Como posso proceder?`;
      window.open(`https://wa.me/553592682791?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      setIsCheckoutOpen(false); setSelectedNumbers([]); fetchReserved();
    } catch (err) { setModal({ isOpen: true, title: 'Erro', message: 'Falha.', type: 'danger', onConfirm: () => setModal({ ...modal, isOpen: false }) }); }
  };

  return (
    <>
      <main className="flex-1 pb-20 text-left relative z-10">
        <Hero /><ContextSection /><Prizes />
        <RaffleSection 
          selectedNumbers={selectedNumbers} 
          reservedNumbers={reservedNumbers} 
          onToggleNumber={(num) => {
            const isAdding = !selectedNumbers.includes(num);
            setSelectedNumbers(prev => isAdding ? [...prev, num] : prev.filter(n => n !== num));
            if (isAdding) {
              document.getElementById('raffle-grid-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        />
        <Footer />
      </main>
      {selectedNumbers.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
          <div className="w-full max-w-[460px] bg-pop-white border-pop border-pop-dark shadow-[-8px_-8px_0_#ba006a,8px_8px_0_#1d1e1c] p-6 relative">
            <button onClick={() => setSelectedNumbers([])} className="absolute -top-4 -right-2 bg-[#ff3b30] text-white w-9 h-9 border-2 border-pop-dark shadow-pop-sm flex items-center justify-center"><X size={20}/></button>
            <div className="flex justify-between items-end mb-6 text-left">
              <div><span className="font-sans font-black text-[0.65rem] mb-1 uppercase opacity-60">Números</span><div className="flex items-center gap-2"><span className="font-pop-title text-5xl text-pop-dark">{selectedNumbers.length}</span><span className="font-sans font-black text-xs bg-pop-pink text-pop-white px-2 py-1 rotate-[-10deg] border-2 border-pop-dark tracking-tighter uppercase">QTD</span></div></div>
              <div className="text-right"><span className="font-sans font-black text-[0.65rem] mb-1 uppercase opacity-60">Total</span><span className="font-pop-title text-4xl text-pop-pink">R$ {totalAmount}</span></div>
            </div>
            <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-pop-orange border-pop border-pop-dark shadow-pop-sm py-4 font-black uppercase flex items-center justify-center gap-3">Finalizar <ArrowRight size={24}/></button>
          </div>
        </div>
      )}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pop-dark/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-pop-white border-pop border-pop-dark shadow-[12px_12px_0_#1d1e1c] p-8 relative animate-in zoom-in-95">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute -top-3 -right-3 bg-[#ff3b30] text-white w-9 h-9 border-2 border-pop-dark flex items-center justify-center"><X size={20}/></button>
            <h2 className="font-pop-title text-4xl mb-6 -rotate-1 text-pop-dark uppercase text-left tracking-tighter">QUASE LÁ!</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleConfirm(e.target.nome.value, e.target.tel.value); }} className="space-y-6 text-left">
              <div><label className="block font-sans font-black text-[0.65rem] mb-2 uppercase text-pop-pink tracking-widest">Nome</label><input name="nome" type="text" placeholder="Nome" required className="w-full bg-pop-beige border-2 border-pop-dark p-4 font-sans font-bold outline-none" /></div>
              <div><label className="block font-sans font-black text-[0.65rem] mb-2 uppercase text-pop-pink tracking-widest">WhatsApp</label><input name="tel" type="tel" placeholder="(00) 00000-0000" required className="w-full bg-pop-beige border-2 border-pop-dark p-4 font-sans font-bold outline-none" /></div>
              <div className="bg-pop-beige/50 border-2 border-dashed border-pop-dark/20 p-4">
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto mb-4">{selectedNumbers.sort((a,b)=>a-b).map(n=>(<span key={n} className="bg-pop-orange border border-pop-dark px-2 py-1 font-black text-xs shadow-pop-xs">{n.toString().padStart(2,'0')}</span>))}</div>
                <div className="flex justify-between items-center pt-2 border-t border-pop-dark/10"><span className="font-sans font-black text-xs uppercase">Total:</span><span className="font-pop-title text-xl text-pop-pink">R$ {totalAmount}</span></div>
              </div>
              <button type="submit" className="w-full bg-[#25D366] text-white border-pop border-pop-dark shadow-pop-sm py-4 font-black uppercase active:translate-y-1 flex items-center justify-center gap-3">WhatsApp <ArrowRight size={24}/></button>
            </form>
          </div>
        </div>
      )}
      <CustomModal {...modal} />
    </>
  );
}

function App() { return (<Router><div className="w-full max-w-[500px] mx-auto min-h-screen flex flex-col items-center"><div className="w-full bg-pop-beige min-h-screen border-x-pop border-pop-dark shadow-pop flex flex-col relative overflow-hidden"><div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#1d1e1c 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} /><Header /><Routes><Route path="/" element={<LandingPage />} /><Route path="/admin" element={<AdminPage />} /></Routes></div></div></Router>); }
export default App;
