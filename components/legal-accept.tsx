"use client"

import Link from "next/link"
import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"

export function LegalAccept() {
const [accepted, setAccepted] =
useState(false)

return ( <div className="space-y-4 rounded-xl border bg-card p-4"> <div className="flex items-start gap-3">
<Checkbox
id="terms"
checked={accepted}
onCheckedChange={(v) =>
setAccepted(!!v)
}
/>

    <label
      htmlFor="terms"
      className="text-sm leading-relaxed text-muted-foreground"
    >
      Eu concordo com os{" "}
      <Link
        href="/terms"
        target="_blank"
        className="font-medium text-primary underline"
      >
        Termos de Serviço
      </Link>{" "}
      e com a{" "}
      <Link
        href="/privacy"
        target="_blank"
        className="font-medium text-primary underline"
      >
        Política de Privacidade
      </Link>{" "}
      do EduFormAI.
    </label>
  </div>
</div>


)
}
