import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TarotMessage = { title: string; message: string };

// ─── Tarot Messages (Title + Message) ─────────────────────────────────────
const TAROT_MESSAGES: TarotMessage[] = [
  {
    title: "✦✦ Intuition ✦✦",
    message:
      "Your intuition whispers.\nYour fear shouts.\nChoose carefully which voice you follow",
  },
  {
    title: "✦✦ Flow ✦✦",
    message:
      "Stop forcing. What belongs to you will flow toward you naturally",
  },
  {
    title: "✦✦ Rest ✦✦",
    message:
      "Rest is not a reward. It is part of the journey.\nGive yourself a break",
  },
  {
    title: "✦✦ Transformation ✦✦",
    message:
      "The person you are becoming could never exist without the person you once were",
  },
  {
    title: "✦✦ Presence ✦✦",
    message: "Life is happening here.\nNot yesterday. Not tomorrow. Now",
  },
  {
    title: "✦✦ Trust ✦✦",
    message: "You are exactly where you need to be",
  },
  {
    title: "✦✦ Trust ✦✦",
    message:
      "You are not behind.\nLife is unfolding in perfect timing, even when you cannot see it",
  },
  {
    title: "✦✦ Patience ✦✦",
    message:
      "Not everything delayed is denied. Some things simply need time to become ready",
  },
  {
    title: "✦✦ Self worth ✦✦",
    message:
      "Your value has never depended on someone's ability to recognize it.\nMake yourself a priority.\nThe moment you begin to value yourself, the world reflects that value back to you.",
  },
  {
    title: "✦✦ Gratitude ✦✦",
    message: "Gratitude begins when you stop waiting for life to be perfect",
  },
  {
    title: "✦✦ Acceptance ✦✦",
    message:
      "Stop comparing your journey with others.\nJust bloom as you are, exactly where you are.",
  },
  {
    title: "✦✦ Receiving ✦✦",
    message: "You cannot receive fully if you believe you are unworthy",
  },
  {
    title: "✦✦ Divine timing ✦✦",
    message: "Sometimes the greatest gift is the delay you never wanted",
  },
  {
    title: "✦✦ Forgiveness ✦✦",
    message:
      "Forgiveness is not forgetting.\nIt is choosing not to carry the pain any longer",
  },
  {
    title: "✦✦ Healing the past ✦✦",
    message: "The past cannot be changed, but your relationship with it can",
  },
  {
    title: "✦✦ New Chapter ✦✦",
    message:
      "Every ending deserves a new beginning.\nOpen a new Chapter",
  },
  {
    title: "✦✦ Healing ✦✦",
    message:
      "Some apologies never come.\nYour healing does not have to wait for them",
  },
  {
    title: "✦✦ Energy ✦✦",
    message: "Your energy is your greatest currency.\nSpend it wisely",
  },
  {
    title: "✦✦ Abundance ✦✦",
    message:
      "Abundance is not having everything.\nIt is recognizing that you already have enough to begin",
  },
  {
    title: "✦✦ Self love ✦✦",
    message:
      "The relationship you have with yourself teaches others how to love you",
  },
  {
    title: "✦✦ Love ✦✦",
    message: "You deserve the love you keep giving away",
  },
  {
    title: "✦✦ Healthy love ✦✦",
    message: "Real love feels safe, not confusing",
  },
  {
    title: "✦✦ Soul Connection ✦✦",
    message:
      "Some souls enter your life to stay.\nOthers come to awaken you.\nHonor every connection for the lesson, the love, or the growth it brings.\nAll brings wisdom.",
  },
  {
    title: "✦✦ Growth ✦✦",
    message: "Growth begins where comfort ends",
  },
  {
    title: "✦✦ Awareness ✦✦",
    message: "Observe before reacting",
  },
  {
    title: "✦✦ Perspective ✦✦",
    message: "Sometimes all that needs to change is the way you see it",
  },
  {
    title: "✦✦ Flow ✦✦",
    message: "When you stop forcing, life begins flowing",
  },
  {
    title: "✦✦ Energy Protection ✦✦",
    message:
      "Not everyone deserves access to your energy.\nChoose your circle wisely.",
  },
  {
    title: "✦✦ Set the intention ✦✦",
    message: "Every creation begins with a clear intention",
  },
  {
    title: "✦✦ Blessings Ahead ✦✦",
    message:
      "Beautiful things are making their way to you.\nWelcome them with an open heart",
  },
  {
    title: "✦✦ Healing ✦✦",
    message: "Healing takes time.\nHonor every step of your journey",
  },
  {
    title: "✦✦ Angels whispers ✦✦",
    message:
      "You are surrounded by love, light and gentle support from your angel.\nYou are not walking this path alone.",
  },
];

// ─── Tarot Card Symbols ───────────────────────────────────────────────────────
const CARD_SYMBOLS = ["✦", "✦", "✦", "✦", "✦"];
const CARD_NAMES: string[] = [
  // "The Moon",
  // "The Star",
  // "The Pentacle",
  // "The Messenger",
  // "The Deep",
];

// ─── Canvas Starfield ────────────────────────────────────────────────────────
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: { x: number; y: number; r: number; o: number; speed: number }[] =
      [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random(),
        speed: Math.random() * 0.004 + 0.002,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.o += s.speed;
        if (s.o > 1) s.o = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 100, ${0.2 + Math.abs(Math.sin(s.o)) * 0.7})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

// ─── Individual Tarot Card ────────────────────────────────────────────────────
interface TarotCardProps {
  index: number;
  symbol: string;
  name: string;
}

function TarotCard({ index, symbol, name }: TarotCardProps) {
  const [hovered, setHovered] = useState(false);
  const rotations = [-6, -3, 0, 3, 6];

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ rotate: rotations[index] }}
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -20, scale: 1.06, rotate: 0, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Card outer glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: "0 0 40px 8px rgba(212, 175, 100, 0.5)",
          borderRadius: "1rem",
        }}
      />

      {/* Card body */}
      <div
        className="relative w-20 h-36 sm:w-28 sm:h-48 md:w-36 md:h-60 lg:w-40 lg:h-68 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #3a245f 0%, #231038 55%, #12072a 100%)",
            border: "1.5px solid rgba(212, 175, 100, 0.55)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,175,100,0.18)",
          }}
      >
        {/* Inner ornate border */}
        <div
          className="absolute inset-2 rounded-xl"
          style={{
            border: "1px solid rgba(212, 175, 100, 0.25)",
          }}
        />
        <div
          className="absolute inset-3 rounded-xl"
          style={{
            border: "0.5px solid rgba(212, 175, 100, 0.12)",
          }}
        />

        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(212,175,100,0.4) 0%, transparent 50%),
                              radial-gradient(circle at 70% 80%, rgba(138,43,226,0.4) 0%, transparent 50%)`,
          }}
        />

        {/* Diamond pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 4 }, (_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 25 + 12.5}
                y={r * 27 + 12}
                width="12"
                height="12"
                transform={`rotate(45, ${c * 25 + 18.5}, ${r * 27 + 18})`}
                fill="none"
                stroke="rgba(212,175,100,1)"
                strokeWidth="0.8"
              />
            ))
          )}
        </svg>

        {/* Center Symbol */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <motion.div
            className="text-2xl sm:text-4xl md:text-5xl"
            style={{ color: "rgba(212, 175, 100, 0.85)" }}
            animate={hovered ? { scale: 1.15, opacity: 1 } : { scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {symbol}
          </motion.div>
          <div
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "rgba(212, 175, 100, 0.5)",
              fontSize: "9px",
            }}
          >
            {name}
          </div>
        </div>

        {/* Top corner ornament */}
        <div
          className="absolute top-4 left-4 text-xs"
          style={{ color: "rgba(212,175,100,0.4)", fontFamily: "'Cinzel', serif", fontSize: "8px" }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-4 right-4 text-xs rotate-180"
          style={{ color: "rgba(212,175,100,0.4)", fontFamily: "'Cinzel', serif", fontSize: "8px" }}
        >
          ✦
        </div>
      </div>
    </motion.div>
  );
}

// ─── Full-Screen Revealed Card ────────────────────────────────────────────────
interface RevealedCardProps {
  message: string;
  onReset: () => void;
}

function RevealedCard({ message, onReset }: RevealedCardProps) {
  const parts = message.split(/\n\n+/g);
  const title = parts[0] ?? "";
  const body = parts.slice(1).join("\n\n");

  return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: "linear-gradient(135deg, #12072a 0%, #231038 50%, #12072a 100%)" }}
      >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(138,43,226,0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Particle dots */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: "rgba(212, 175, 100, 0.6)",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Main Card */}
      <motion.div
        className="relative mx-4 max-w-lg w-full"
        initial={{ scale: 0.6, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute -inset-6 rounded-3xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(212,175,100,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Card */}
        <div
          className="relative rounded-2xl p-5 sm:p-8 md:p-10 text-center"
          style={{
            background: "linear-gradient(145deg, #2d1b4e 0%, #1a0a2e 100%)",
            border: "1.5px solid rgba(212, 175, 100, 0.55)",
            boxShadow: `
              0 0 60px rgba(212,175,100,0.15),
              0 25px 80px rgba(0,0,0,0.7),
              inset 0 1px 0 rgba(212,175,100,0.2)
            `,
          }}
        >
          {/* Inner ornate border */}
          <div
            className="absolute inset-3 rounded-xl pointer-events-none"
            style={{ border: "1px solid rgba(212,175,100,0.18)" }}
          />

          {/* Top ornament */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div style={{ color: "rgba(212,175,100,0.5)", fontSize: "10px" }} className="sm:text-[12px]">✦</div>
            <motion.div
              className="text-2xl sm:text-4xl"
              style={{ color: "rgba(212,175,100,0.9)" }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ☽
            </motion.div>
            <div style={{ color: "rgba(212,175,100,0.5)", fontSize: "10px" }} className="sm:text-[12px]">✦</div>
          </div>

          {/* Title */}
          <div
            className="tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs mb-6 sm:mb-8"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "rgba(212, 175, 100, 0.65)",
            }}
          >
            {title ? title : "Your Revelation"}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(212,175,100,0.4))" }}
            />
            <div style={{ color: "rgba(212,175,100,0.5)" }}>⚝</div>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left, transparent, rgba(212,175,100,0.4))" }}
            />
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
          >
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontStyle: "normal",
                color: "rgba(212, 175, 100, 0.75)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {title ? title : "Your Revelation"}
            </div>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(232, 220, 200, 0.92)",
                fontStyle: "italic",
                whiteSpace: "pre-line",
              }}
            >
              {body}
            </div>
          </motion.div>

          

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(212,175,100,0.3))" }}
            />
            <div style={{ color: "rgba(212,175,100,0.4)", fontSize: "10px" }}>✦</div>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left, transparent, rgba(212,175,100,0.3))" }}
            />
          </div>

          {/* Explore More Button */}
          <motion.a
            href="https://omnia-com.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm tracking-[0.15em] uppercase transition-all inline-block"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, rgba(212,175,100,0.12), rgba(212,175,100,0.06))",
              border: "1px solid rgba(212,175,100,0.45)",
              color: "rgba(212,175,100,0.9)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(212,175,100,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Explore more
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Custom Message Modal ─────────────────────────────────────────────────────
interface CustomMessageModalProps {
  onClose: () => void;
  onSave: (msg: string) => void;
}

function CustomMessageModal({ onClose, onSave }: CustomMessageModalProps) {
  const [text, setText] = useState("");

  const handleSave = () => {
    const trimmed = text.trim();
    if (trimmed.length < 5) return;
    onSave(trimmed);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: "rgba(10, 5, 20, 0.88)" }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md rounded-2xl p-8"
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg, #2d1b4e, #1a0a2e)",
          border: "1.5px solid rgba(212,175,100,0.45)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,100,0.08)",
        }}
      >
        <div
          className="text-center text-lg tracking-[0.2em] uppercase mb-2"
          style={{ fontFamily: "'Cinzel', serif", color: "rgba(212,175,100,0.9)" }}
        >
          Inscribe Your Prophecy
        </div>
        <p
          className="text-center text-sm mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(200,185,165,0.65)" }}
        >
          This message will be added to the oracle's whispers
        </p>

        <textarea
          className="w-full rounded-xl p-4 text-sm resize-none focus:outline-none"
          rows={4}
          maxLength={200}
          placeholder="Write your prophecy here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            background: "rgba(13, 5, 32, 0.8)",
            border: "1px solid rgba(212,175,100,0.3)",
            color: "rgba(220, 205, 180, 0.9)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "16px",
          }}
        />
        <div
          className="text-right text-xs mb-5 mt-1"
          style={{ color: "rgba(212,175,100,0.4)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {text.length}/200
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 py-2.5 rounded-xl text-sm tracking-widest uppercase transition-all"
            onClick={onClose}
            style={{
              fontFamily: "'Cinzel', serif",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(200,185,165,0.6)",
            }}
          >
            Cancel
          </button>
          <motion.button
            className="flex-1 py-2.5 rounded-xl text-sm tracking-widest uppercase"
            onClick={handleSave}
            disabled={text.trim().length < 5}
            style={{
              fontFamily: "'Cinzel', serif",
              background:
                text.trim().length >= 5
                  ? "linear-gradient(135deg, rgba(212,175,100,0.25), rgba(212,175,100,0.12))"
                  : "rgba(255,255,255,0.04)",
              border:
                text.trim().length >= 5
                  ? "1px solid rgba(212,175,100,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
              color:
                text.trim().length >= 5
                  ? "rgba(212,175,100,0.95)"
                  : "rgba(200,185,165,0.3)",
              cursor: text.trim().length >= 5 ? "pointer" : "not-allowed",
            }}
            whileHover={text.trim().length >= 5 ? { scale: 1.03 } : {}}
            whileTap={text.trim().length >= 5 ? { scale: 0.97 } : {}}
          >
            Inscribe
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "tarot_custom_message";

export default function Index() {
  const [phase, setPhase] = useState<"spread" | "revealed">("spread");
  const [currentMessage, setCurrentMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const [customSaved, setCustomSaved] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load saved custom message on mount + start music automatically
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCustomMessage(saved);
      setCustomSaved(true);
    }

    const a = new Audio("/exait.mp3");
    a.loop = false;
    a.volume = 0.9;
    audioRef.current = a;

    const play = () => {
      if (!audioRef.current) return;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by the browser. We'll retry on user interaction.
      });
    };

    // Try immediately when page opens
    play();

    // Retry when user interacts (autoplay policy workaround)
    const retry = () => {
      play();
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
    };

    window.addEventListener("pointerdown", retry, { once: false });
    window.addEventListener("keydown", retry, { once: false });

    // When it finishes, restart automatically
    const onEnded = () => {
      play();
    };
    a.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
    };
  }, []);



  const handleReveal = () => {
    const pool: TarotMessage[] = [...TAROT_MESSAGES];
    if (customMessage) {
      pool.push({ title: "✦✦ Your Prophecy ✦✦", message: customMessage });
    }

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    setCurrentMessage(`${chosen.title}\n\n${chosen.message}`);
    setPhase("revealed");

    // Ensure music continues/plays when moving to revealed phase
    const a = audioRef.current;
    if (a) {
      try {
        a.play().catch(() => {});
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setPhase("spread");
    setCurrentMessage("");
  };

  const handleSaveCustom = (msg: string) => {
    localStorage.setItem(STORAGE_KEY, msg);
    setCustomMessage(msg);
    setCustomSaved(true);
    setShowModal(false);
  };

  return (
      <div
        className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden"
        style={{ background: "linear-gradient(160deg, rgb(18, 8, 45) 0%, rgb(74, 32, 132) 45%, rgb(18, 8, 45) 100%)" }}
      >
      {/* Starfield */}
      <StarCanvas />

      {/* Background vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45, 27, 78, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(13, 5, 32, 0.6) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Header ── */}
      <AnimatePresence>
        {phase === "spread" && (
          <motion.header
            className="relative z-10 text-center pt-10 sm:pt-14 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative top */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div
                className="h-px w-16 sm:w-24"
                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,100,0.5))" }}
              />
              <span style={{ color: "rgba(212,175,100,0.6)", fontSize: "14px" }}>✦</span>
              <div
                className="h-px w-16 sm:w-24"
                style={{ background: "linear-gradient(to left, transparent, rgba(212,175,100,0.5))" }}
              />
            </div>

            <h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.12em] uppercase mb-3"
              style={{
                fontFamily: "'Cinzel', serif",
                background: "linear-gradient(135deg, #d4af64 0%, #f2e29a 50%, #c89b3c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
              }}
            >
beyondholistic
            </h1>

            <p
              className="text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase mb-1"
              style={{
                fontFamily: "'Cinzel', serif",
                color: "rgba(212,175,100,0.5)",
              }}
            >
              The univers may have a message for you today 
            </p>

            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl mt-3 max-w-sm mx-auto px-4 text-center"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(212, 175, 100, 0.88)",
                fontStyle: "italic",
                textShadow: "0 0 18px rgba(212,175,100,0.25), 0 2px 10px rgba(0,0,0,0.55)",
              }}
            >
             Pause . Breath . Recieve
            </p>

            {/* Bottom decorative */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div
                className="h-px w-16 sm:w-24"
                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,100,0.3))" }}
              />
              <span style={{ color: "rgba(212,175,100,0.4)", fontSize: "10px" }}>⚝</span>
              <div
                className="h-px w-16 sm:w-24"
                style={{ background: "linear-gradient(to left, transparent, rgba(212,175,100,0.3))" }}
              />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── Cards Spread ── */}
      <AnimatePresence>
        {phase === "spread" && (
          <motion.main
            className="relative z-10 flex flex-col items-center justify-center flex-1 py-8 px-4 gap-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            {/* Cards Row */}
            <div className="flex items-end justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-wrap sm:flex-nowrap px-2">
              {CARD_SYMBOLS.map((sym, i) => (
                <TarotCard key={i} index={i} symbol={sym} name={CARD_NAMES[i]} />
              ))}
            </div>

            {/* Reveal Button */}
            <motion.button
              onClick={handleReveal}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              {/* Glow behind button */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
                style={{ background: "rgba(212,175,100,0.3)" }}
              />

              <div
                className="relative px-6 sm:px-10 md:px-14 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-semibold"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background:
                    "linear-gradient(135deg, rgba(212,175,100,0.18) 0%, rgba(138,43,226,0.18) 100%)",
                  border: "1.5px solid rgba(212,175,100,0.55)",
                  color: "rgba(212,175,100,1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,100,0.15)",
                }}
              >
✦ Pick your message ✦
              </div>
            </motion.button>
          </motion.main>
        )}
      </AnimatePresence>

      {/* ── Full Screen Revealed Card ── */}
      <AnimatePresence>
        {phase === "revealed" && (
          <RevealedCard message={currentMessage} onReset={handleReset} />
        )}
      </AnimatePresence>

      {/* ── Custom Message Modal ── */}
      <AnimatePresence>
        {showModal && (
          <CustomMessageModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveCustom}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
