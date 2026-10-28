import React, { useState } from 'react';
import { Truck, Fuel, ShoppingBag, QrCode, Play, Sparkles, Plus, Minus, CheckCircle, Navigation as NavIcon, Smartphone } from 'lucide-react';

interface ProjectInteractiveDemoProps {
  type: 'dispatch_queue' | 'station_radar' | 'reactive_cart' | 'qr_scanner' | 'liquid_canvas';
  projectId: string;
}

export const ProjectInteractiveDemo: React.FC<ProjectInteractiveDemoProps> = ({ type }) => {
  // Demo 1: Amoomy Dispatch Simulation State
  const [role, setRole] = useState<'client' | 'operator'>('client');
  const [bidAmount, setBidAmount] = useState(2400);
  const [bidStatus, setBidStatus] = useState<'pending' | 'accepted'>('pending');

  // Demo 2: Wofoodi Radar State
  const [selectedGrade, setSelectedGrade] = useState<'91' | '95' | 'diesel'>('91');
  const STATIONS = {
    '91': [
      { name: 'Aramco Al-Khobar Express', dist: '1.2 km', price: '2.18 SAR/L', status: 'Available' },
      { name: 'Sasco Highway Hub', dist: '3.4 km', price: '2.18 SAR/L', status: 'Available' },
    ],
    '95': [
      { name: 'Aldrees Desert Corridor', dist: '2.1 km', price: '2.33 SAR/L', status: 'Available' },
      { name: 'TotalEnergies Ring Road', dist: '4.8 km', price: '2.33 SAR/L', status: 'Available' },
    ],
    diesel: [
      { name: 'Petromin Freight Terminal', dist: '0.8 km', price: '1.15 SAR/L', status: 'High Capacity' },
      { name: 'Sasco Heavy Fleet Stop', dist: '2.5 km', price: '1.15 SAR/L', status: 'Available' },
    ],
  };

  // Demo 3: Raval Reactive Cart State
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Structured Linen Overshirt', price: 185, qty: 1 },
    { id: 2, name: 'Minimalist Relaxed Trousers', price: 140, qty: 1 },
  ]);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Demo 4: Payss QR Scanner State
  const [points, setPoints] = useState(1450);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanMerchant, setLastScanMerchant] = useState<string | null>(null);

  // Demo 5: Liquid Navbar State
  const [activeNavTab, setActiveNavTab] = useState(0);

  // Handlers
  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setPoints((prev) => prev + 50);
      setLastScanMerchant('Artisan Roastery (Branch 04)');
    }, 600);
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <div className="rounded-lg bg-canvas border border-border-subtle p-4 font-sans text-xs">
      {/* DEMO 1: AMOOMY */}
      {type === 'dispatch_queue' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>Freight Request: 50-Ton Crawler Crane</span>
            </span>
            <div className="flex items-center gap-1 bg-elevated p-0.5 rounded border border-border-subtle">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  role === 'client' ? 'bg-surface text-accent font-semibold shadow-subtle' : 'text-ink-muted'
                }`}
              >
                Client View
              </button>
              <button
                type="button"
                onClick={() => setRole('operator')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  role === 'operator' ? 'bg-surface text-accent font-semibold shadow-subtle' : 'text-ink-muted'
                }`}
              >
                Operator View
              </button>
            </div>
          </div>

          <div className="p-3 rounded bg-surface border border-border-subtle space-y-2">
            <div className="flex justify-between text-ink font-mono text-[11px]">
              <span>Route: Riyadh Dry Port → Jubail Industrial</span>
              <span className="text-ink-faint">430 km</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label htmlFor="bid-slider" className="text-ink-muted text-[11px]">
                Negotiated Haul Bid:
              </label>
              <span className="font-mono font-bold text-accent text-sm">{bidAmount.toLocaleString()} SAR</span>
            </div>

            <input
              id="bid-slider"
              type="range"
              min={1800}
              max={3600}
              step={50}
              value={bidAmount}
              onChange={(e) => {
                setBidAmount(Number(e.target.value));
                setBidStatus('pending');
              }}
              className="w-full accent-accent cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] font-mono text-ink-faint pt-1">
              <span>Platform Fee (5%): {Math.round(bidAmount * 0.05)} SAR</span>
              <span>Operator Payout: {Math.round(bidAmount * 0.95)} SAR</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-ink-muted text-[11px]">
              Status: <strong className="text-ink">{bidStatus === 'accepted' ? 'Contract Dispatched' : 'Real-Time Negotiation'}</strong>
            </span>
            <button
              type="button"
              onClick={() => setBidStatus('accepted')}
              className="btn-tactile px-3 py-1 rounded bg-accent text-white font-mono text-[11px] font-semibold"
            >
              {bidStatus === 'accepted' ? 'Accepted ✓' : 'Accept & Dispatch'}
            </button>
          </div>
        </div>
      )}

      {/* DEMO 2: WOFOODI */}
      {type === 'station_radar' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5" />
              <span>Live Fuel Grade Radar</span>
            </span>
            <div className="flex items-center gap-1">
              {(['91', '95', 'diesel'] as const).map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    selectedGrade === grade
                      ? 'bg-accent text-white font-bold'
                      : 'bg-elevated text-ink-muted hover:text-ink border border-border-subtle'
                  }`}
                >
                  {grade.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {STATIONS[selectedGrade].map((st, i) => (
              <div key={i} className="p-2.5 rounded bg-surface border border-border-subtle flex items-center justify-between">
                <div>
                  <span className="font-semibold text-ink block text-xs">{st.name}</span>
                  <div className="flex items-center gap-2 text-[10px] text-ink-muted font-mono mt-0.5">
                    <span className="flex items-center gap-1">
                      <NavIcon className="w-2.5 h-2.5 text-accent" />
                      <span>{st.dist} ahead</span>
                    </span>
                    <span>·</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{st.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-accent text-xs block">{st.price}</span>
                  <span className="text-[9px] font-mono text-ink-faint">Verified live</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-ink-faint flex items-center justify-between pt-1">
            <span>Radius: 5.0 km corridor buffer</span>
            <span>Clustering: Compiled SVG Markers</span>
          </div>
        </div>
      )}

      {/* DEMO 3: RAVAL */}
      {type === 'reactive_cart' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Optimistic State Reactive Cart</span>
            </span>
            <span className="text-[10px] font-mono text-ink-faint">Sub-80MB Heap Container</span>
          </div>

          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="p-2.5 rounded bg-surface border border-border-subtle flex items-center justify-between">
                <div>
                  <span className="font-medium text-ink block text-xs">{item.name}</span>
                  <span className="text-[10px] font-mono text-accent">{item.price} SAR</span>
                </div>
                <div className="flex items-center gap-2 bg-elevated px-2 py-1 rounded border border-border-subtle">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, -1)}
                    className="touch-target p-1 text-ink-muted hover:text-ink"
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono font-bold text-ink w-4 text-center">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, 1)}
                    className="touch-target p-1 text-ink-muted hover:text-ink"
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded bg-surface border border-border-subtle flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-ink-faint block text-[10px] uppercase">Instant Total (Zero Lag)</span>
              <span className="font-bold text-ink text-sm">{cartSubtotal} SAR</span>
            </div>
            <button
              type="button"
              className="btn-tactile px-3 py-1.5 rounded bg-accent text-white font-mono text-[11px] font-semibold"
            >
              Checkout Flow
            </button>
          </div>
        </div>
      )}

      {/* DEMO 4: PAYSS */}
      {type === 'qr_scanner' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5" />
              <span>Camera Throttling &amp; Reward Wallet</span>
            </span>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-accent">{points} Points</span>
            </div>
          </div>

          <div className="relative aspect-[16/7] rounded-lg bg-surface border-2 border-dashed border-border-strong flex flex-col items-center justify-center p-3 text-center overflow-hidden">
            <div className={`w-12 h-12 rounded-lg border-2 border-accent flex items-center justify-center transition-all ${isScanning ? 'scale-110 border-emerald-500' : ''}`}>
              <QrCode className="w-6 h-6 text-accent" />
            </div>
            <span className="text-[10px] font-mono text-ink-muted mt-2">
              {isScanning ? 'Decoding payload (30fps)...' : 'Sub-100ms Viewfinder Target'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono text-ink-faint">
              {lastScanMerchant ? `Scanned: ${lastScanMerchant}` : 'AES-256 Encrypted Keychain Active'}
            </div>
            <button
              type="button"
              disabled={isScanning}
              onClick={handleSimulateScan}
              className="btn-tactile px-3 py-1.5 rounded bg-accent text-white font-mono text-[11px] font-semibold disabled:opacity-50"
            >
              {isScanning ? 'Scanning...' : 'Simulate QR Scan (+50 Pts)'}
            </button>
          </div>
        </div>
      )}

      {/* DEMO 5: LIQUID NAVBAR */}
      {type === 'liquid_canvas' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>pub.dev Interactive Fluid Spring Canvas</span>
            </span>
            <span className="text-[10px] font-mono text-ink-faint">60fps CustomPainter</span>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border-subtle flex flex-col items-center justify-center gap-4">
            <span className="text-xs text-ink-muted font-sans text-center">
              Tap any destination tab below to inspect the fluid bezier wave curve in real time:
            </span>

            {/* Simulated Liquid Navbar Bar */}
            <div className="relative w-full max-w-sm h-12 bg-elevated rounded-full p-1 border border-border-strong flex items-center justify-around shadow-subtle overflow-hidden">
              {/* Dynamic Bezier Indicator Dot */}
              <div
                className="absolute top-1 bottom-1 w-[23%] bg-accent rounded-full transition-all duration-300 ease-out shadow-subtle"
                style={{
                  left: `${activeNavTab * 25 + 1}%`,
                }}
              />

              {['Feed', 'Explore', 'Wallet', 'Profile'].map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveNavTab(idx)}
                  className={`touch-target relative z-10 flex-1 text-center font-mono text-[11px] font-bold transition-colors ${
                    activeNavTab === idx ? 'text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-mono text-ink-faint flex items-center justify-between pt-1">
            <span>Score: 130/140 Pub Points</span>
            <span>Zero External Dependencies</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectInteractiveDemo;
