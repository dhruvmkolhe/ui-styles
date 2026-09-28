"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, ShieldAlert, Eye, EyeOff, RotateCcw } from "lucide-react";
import type { VaultMode } from "../tokens";

export function FormEffect({ slug, mode }: { slug: string; mode: VaultMode }) {
  const dark = mode === "dark";

  // 1. OTP Code Input
  if (slug === "otp-code-input") {
    return <OtpInputComponent />;
  }

  // 2. Password Strength Meter
  if (slug === "password-strength-meter") {
    return <PasswordStrengthComponent />;
  }

  // 3. Signature Pad
  if (slug === "signature-pad") {
    return <SignaturePadComponent />;
  }

  // 4. Drag Drop Upload Zone
  if (slug === "drag-drop-upload-zone") {
    return <UploadZoneComponent />;
  }

  return <div>Form Effect</div>;
}

function OtpInputComponent() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, index: number) => {
    const char = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    if (char && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full max-w-sm p-5 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl text-white">
      <div className="text-center mb-4">
        <h5 className="text-sm font-bold">Two-Factor Authentication</h5>
        <p className="text-[11px] text-zinc-400 mt-0.5">Enter the 6-digit code sent to your device</p>
      </div>
      <div className="flex gap-2 justify-center">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-10 h-12 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-lg font-mono font-bold text-violet-300 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-inner"
          />
        ))}
      </div>
      <button className="w-full mt-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg transition-colors">
        Verify Security Token
      </button>
    </div>
  );
}

function PasswordStrengthComponent() {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);

  const lengthOk = pwd.length >= 8;
  const numOk = /\d/.test(pwd);
  const specOk = /[^A-Za-z0-9]/.test(pwd);
  const upperOk = /[A-Z]/.test(pwd);
  const score = [lengthOk, numOk, specOk, upperOk].filter(Boolean).length;

  return (
    <div className="w-full max-w-sm p-5 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl text-white">
      <h5 className="text-sm font-bold mb-3">Create Master Password</h5>
      <div className="relative mb-3">
        <input
          type={show ? "text" : "password"}
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Enter secure password..."
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none focus:border-violet-400 pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex gap-1.5 mb-3">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              score >= level
                ? score === 1
                  ? "bg-red-500"
                  : score === 2
                  ? "bg-amber-500"
                  : score === 3
                  ? "bg-cyan-400"
                  : "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                : "bg-zinc-800"
            }`}
          />
        ))}
      </div>

      <div className="space-y-1 text-[11px] text-zinc-400">
        <div className={`flex items-center gap-1.5 ${lengthOk ? "text-emerald-400" : ""}`}>
          <CheckCircle2 className="w-3.5 h-3.5" /> Minimum 8 characters
        </div>
        <div className={`flex items-center gap-1.5 ${specOk ? "text-emerald-400" : ""}`}>
          <CheckCircle2 className="w-3.5 h-3.5" /> Contains special symbol
        </div>
      </div>
    </div>
  );
}

function SignaturePadComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full max-w-sm p-4 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold font-mono">DIGITAL SIGNATURE</span>
        <button onClick={clear} className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={320}
        height={85}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const r = canvas.getBoundingClientRect();
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.strokeStyle = "#8b5cf6";
          ctx.lineTo(e.clientX - r.left, e.clientY - r.top);
          ctx.stroke();
        }}
        onPointerDown={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const r = canvas.getBoundingClientRect();
          ctx.beginPath();
          ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
        }}
        className="w-full h-20 rounded-xl bg-zinc-900 border border-zinc-700 cursor-crosshair touch-none shadow-inner"
      />
      <p className="text-[10px] text-zinc-500 text-center mt-2 font-mono">
        Sign above using mouse or touch
      </p>
    </div>
  );
}

function UploadZoneComponent() {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        setUploaded(true);
      }}
      className={`w-full max-w-sm p-6 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer ${
        dragOver
          ? "border-violet-400 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          : "border-zinc-700 bg-zinc-950/80 hover:border-zinc-500"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-3">
        <UploadCloud className="w-6 h-6" />
      </div>
      <h5 className="text-xs font-bold text-white">
        {uploaded ? "Assets Received ✓" : "Drop files here or browse"}
      </h5>
      <p className="text-[10px] text-zinc-400 mt-1">Supports PNG, SVG, MP4 up to 50MB</p>
    </div>
  );
}
