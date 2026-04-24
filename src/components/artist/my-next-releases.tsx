"use client";

import { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollArea,
  Button,
} from "@/components/ui";
import { CheckCheck, Lock } from "lucide-react";
import { useMyNextReleasesStore } from "@/store/my-next-releases-store";
import { ModificationCounter } from "./my-next-reales/modification-counter";
import { ApprovalDialog } from "./my-next-reales/approval-dialog";
import { ReleaseVersionItem } from "./my-next-reales/release-version-item";
import type { MyNextRelease } from "@/types";

type MyNextReleasesProps = {
  release: MyNextRelease;
};

export function MyNextReleases({ release }: MyNextReleasesProps) {
  const {
    release: storeRelease,
    setRelease,
    openApprovalDialog,
    hasReachedModificationLimit,
    getRemainingModifications,
  } = useMyNextReleasesStore();

  // Carga el release en el store cuando el componente monta
  useEffect(() => {
    setRelease(release);
  }, [release, setRelease]);

  // Usa el release del store para tener los datos actualizados
  // (isFullyApproved, approvedAt, etc.)
  const current = storeRelease ?? release;

  if (!current.versions || current.versions.length === 0) return null;

  // La primera del array es la más reciente
  const latestVersion = current.versions[0];
  const previousVersions = current.versions.slice(1);

  function handleDownload(audioUrl: string) {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = audioUrl.split("/").pop() ?? "version";
    link.click();
  }

  function handleFeedback() {
    // TODO: abrir modal de feedback cuando lo implementes
    console.log("feedback");
  }

  const remaining = getRemainingModifications();
  const limitReached = hasReachedModificationLimit();
  const isApproved = current.isFullyApproved;

  return (
    <>
      {/* El dialog vive fuera del card para no tener problemas de z-index */}
      <ApprovalDialog />

      <div className="w-full h-full flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">Next Release</h1>

        <Card className="w-[80%] md:w-[80%]">
          <CardHeader>
            <CardTitle className="truncate flex items-center gap-2">
              {current.name}
              {isApproved && <Lock className="size-4 text-green-500" />}
            </CardTitle>
            <CardDescription>
              {isApproved
                ? `Aprobado el ${new Date(current.approvedAt!).toLocaleDateString("es-CO")} por ${current.approvedBy}`
                : `${previousVersions.length} versión${previousVersions.length !== 1 ? "es" : ""} anterior${previousVersions.length !== 1 ? "es" : ""}`}
            </CardDescription>

            {/* Contador de modificaciones en reversa */}
            <CardAction>
              {isApproved ? (
                <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                  <CheckCheck className="size-3" /> Cerrado
                </span>
              ) : (
                <ModificationCounter />
              )}
            </CardAction>
          </CardHeader>

          {/* Versión actual */}
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground mb-2 px-2">
              Versión actual
            </p>
            <ReleaseVersionItem
              {...latestVersion}
              isLatest
              onDownload={() => handleDownload(latestVersion.audioUrl)}
              onFeedback={handleFeedback}
            />

            {/* Botón de aprobar — solo si no está aprobado */}
            {!isApproved && (
              <div className="mt-4 px-2">
                <Button
                  onClick={openApprovalDialog}
                  className="w-full bg-green-600 hover:bg-green-700 text-white touch-manipulation"
                  disabled={isApproved}
                >
                  <CheckCheck className="size-4 mr-2" />
                  Aprobar versión definitivamente
                </Button>
                {limitReached && (
                  <p className="text-xs text-destructive text-center mt-2">
                    ⚠️ Has alcanzado el límite de modificaciones. Debes aprobar
                    esta versión o contratar revisiones adicionales.
                  </p>
                )}
                {!limitReached && remaining === 1 && (
                  <p className="text-xs text-yellow-500 text-center mt-2">
                    ⚠️ Te queda solo {remaining} modificación disponible.
                  </p>
                )}
              </div>
            )}
          </CardContent>

          {/* Versiones anteriores */}
          {previousVersions.length > 0 && (
            <CardFooter className="py-0 px-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="previous" className="border-none">
                  <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-2">
                    Ver {previousVersions.length} versión
                    {previousVersions.length !== 1 ? "es" : ""} anterior
                    {previousVersions.length !== 1 ? "es" : ""}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScrollArea className="h-48 w-full">
                      {previousVersions.map((v) => (
                        <ReleaseVersionItem
                          key={v.audioUrl}
                          {...v}
                          onDownload={() => handleDownload(v.audioUrl)}
                        />
                      ))}
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
}
