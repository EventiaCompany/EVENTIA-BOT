'use client'

import { useState } from 'react'
import { QrCode, KeyRound, Smartphone } from 'lucide-react'

const STEPS_QR = [
  'Abre WhatsApp y ve a Dispositivos vinculados.',
  'Toca "Vincular un dispositivo".',
  'Escanea el código QR que aparece en la consola.',
]

const STEPS_CODE = [
  'Selecciona la opción de código de 8 dígitos.',
  'Ingresa tu número con código de país.',
  'Escribe el código en Dispositivos vinculados.',
]

export function Connect() {
  const [method, setMethod] = useState<'qr' | 'code'>('qr')
  const steps = method === 'qr' ? STEPS_QR : STEPS_CODE

  return (
    <section id="connect" className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            Vincula tu número en dos formas
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Elige el método que prefieras. Ambos usan la conexión multidispositivo
            oficial de WhatsApp, sin comprometer tu sesión principal.
          </p>

          <div className="mt-8 inline-flex rounded-xl border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => setMethod('qr')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                method === 'qr'
                  ? 'bg-brand-gradient text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <QrCode className="size-4" />
              Código QR
            </button>
            <button
              type="button"
              onClick={() => setMethod('code')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                method === 'code'
                  ? 'bg-brand-gradient text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <KeyRound className="size-4" />
              Código de 8 dígitos
            </button>
          </div>

          <ol className="mt-8 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-center">
          <div className="glow-brand flex aspect-square w-full max-w-sm flex-col items-center justify-center gap-6 rounded-3xl border border-border bg-background p-10 text-center">
            {method === 'qr' ? (
              <>
                <QrCode className="size-28 text-foreground" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">
                  El QR se genera en la consola al iniciar AKARI con la opción 1.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  {['A', 'K', 'A', 'R', 'I', '2', '4', '7'].map((c, i) => (
                    <span
                      key={i}
                      className="flex size-9 items-center justify-center rounded-lg bg-brand-gradient font-display text-lg font-bold text-primary-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Smartphone className="size-4" />
                  Ingresa este código en tu WhatsApp.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
