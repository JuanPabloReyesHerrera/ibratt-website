"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  ScrollArea,
  Checkbox,
} from "@/components/ui";
import { useMyNextReleasesStore } from "@/store/my-next-releases-store";
import { siteConfig } from "@/config/site";

export function ApprovalDialog() {
  const { isApprovalDialogOpen, closeApprovalDialog, approveRelease, release } =
    useMyNextReleasesStore();

  const [artistName, setArtistName] = useState("");
  const [hasReadContract, setHasReadContract] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const canApprove =
    artistName.trim().length > 2 && hasReadContract && hasAcceptedTerms;

  function handleApprove() {
    if (!canApprove) return;
    approveRelease(artistName.trim());
    setArtistName("");
    setHasReadContract(false);
    setHasAcceptedTerms(false);
  }

  function handleClose() {
    closeApprovalDialog();
    setArtistName("");
    setHasReadContract(false);
    setHasAcceptedTerms(false);
  }

  const today = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={isApprovalDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="dark max-w-xl max-h-[80%] flex flex-col overflow-auto">
        <DialogHeader>
          <DialogTitle className="dark text-foreground text-xl">
            Contrato de Aprobación Final
          </DialogTitle>
          <DialogDescription className="text-destructive font-medium">
            ⚠️ Esta acción es irreversible. Lee el contrato completo antes de
            firmar.
          </DialogDescription>
        </DialogHeader>

        {/* Contrato — scrollable */}
        <ScrollArea className="flex-1 max-h-[50dvh] overflow-auto border border-border rounded-lg p-4 text-sm text-muted-foreground leading-relaxed">
          <div className="space-y-4">
            <p className="text-foreground font-semibold text-base">
              ACUERDO DE APROBACIÓN Y ENTREGA FINAL DE PRODUCCIÓN MUSICAL
            </p>

            <p>
              Fecha: <strong className="text-foreground">{today}</strong>
              <br />
              Productor:{" "}
              <strong className="text-foreground">{siteConfig.name}</strong>
              <br />
              Obra: <strong className="text-foreground">{release?.name}</strong>
            </p>

            <div className="space-y-2">
              <p className="text-foreground font-medium">
                1. DECLARACIÓN DE APROBACIÓN
              </p>
              <p>
                Al firmar este documento, el ARTISTA declara que ha escuchado
                íntegramente la versión actual de la obra musical indicada, y
                que la misma cumple con todos los requisitos de calidad, estilo
                y dirección artística acordados previamente con el PRODUCTOR.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-foreground font-medium">
                2. CARÁCTER DEFINITIVO E IRREVERSIBLE
              </p>
              <p>
                Esta aprobación tiene carácter{" "}
                <strong className="text-foreground">
                  definitivo e irrevocable
                </strong>
                . Una vez firmado este documento, el ARTISTA renuncia
                expresamente al derecho de solicitar modificaciones adicionales
                sobre la mezcla, masterización, arreglos, instrumentación o
                cualquier otro elemento de la producción.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-foreground font-medium">
                3. LÍMITE DE MODIFICACIONES AGOTADO
              </p>
              <p>
                Las partes acordaron previamente un máximo de{" "}
                <strong className="text-foreground">
                  {release?.maxModifications} revisiones
                </strong>
                . Con la firma de este contrato, el proceso de revisiones queda
                oficialmente cerrado independientemente del número de revisiones
                utilizadas.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-foreground font-medium">
                4. ENTREGA DE ARCHIVOS
              </p>
              <p>
                Tras la firma, el PRODUCTOR procederá a entregar los archivos
                finales en los formatos acordados (WAV, MP3, stems según
                corresponda) dentro del plazo estipulado en el acuerdo de
                producción original. No se realizarán cambios sobre los archivos
                entregados bajo ninguna circunstancia.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-foreground font-medium">
                5. RESPONSABILIDAD DEL ARTISTA
              </p>
              <p>
                El ARTISTA asume plena responsabilidad sobre la decisión de
                aprobación. Cualquier inconformidad posterior con el resultado
                no generará obligación alguna por parte del PRODUCTOR de
                realizar trabajo adicional no remunerado. Si el ARTISTA desea
                modificaciones después de esta aprobación, deberá contratar una
                nueva sesión de producción.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-foreground font-medium">6. VALIDEZ LEGAL</p>
              <p>
                Este registro digital, junto con el nombre del firmante y la
                marca de tiempo generada automáticamente por el sistema,
                constituye evidencia suficiente del acuerdo entre las partes y
                tiene la misma validez que una firma física en el contexto de
                las relaciones comerciales entre ARTISTA y PRODUCTOR.
              </p>
            </div>

            <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border">
              Documento generado automáticamente por la plataforma de{" "}
              {siteConfig.name}. Registro: {new Date().toISOString()}
            </p>
          </div>
        </ScrollArea>

        {/* Checkboxes de confirmación */}
        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="read"
              checked={hasReadContract}
              onCheckedChange={(v) => setHasReadContract(!!v)}
            />
            <label
              htmlFor="read"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              He leído el contrato completo y entiendo que esta aprobación es{" "}
              <strong className="text-foreground">
                definitiva e irreversible
              </strong>
              .
            </label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={hasAcceptedTerms}
              onCheckedChange={(v) => setHasAcceptedTerms(!!v)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Acepto los términos y autorizo la entrega final de los archivos
              sin posibilidad de modificaciones posteriores.
            </label>
          </div>
        </div>

        {/* Firma digital — nombre del artista */}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            Firma digital — escribe tu nombre completo exactamente como aparece
            en tu contrato:
          </label>
          <Input
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Nombre completo del artista"
            className="bg-transparent text-foreground"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            className="hover:bg-destructive/80! active:bg-destructive/80! active:scale-90"
            variant="outline"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleApprove}
            disabled={!canApprove}
            className="bg-green-700 hover:bg-green-700/80 active:scale-90 text-destructive-foreground"
          >
            Firmar y aprobar definitivamente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
