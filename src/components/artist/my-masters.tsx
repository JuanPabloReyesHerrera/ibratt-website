import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_MY_MASTERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { DownloadButton } from "../ui/dowload-button";

export function MyMasters() {
  return (
    <div className="w-90 h-full">
      {MOCK_MY_MASTERS.map(({ name, isPay, released, wav, mp3, key, bpm }) => (
        <Card key={wav} className="shadow-md shadow-foreground/10">
          <CardHeader>
            <CardTitle className="flex items-end gap-2">
              <img
                src={"/assets/portada-beat-1.jpg"}
                alt={name}
                className="size-12 rounded-lg object-cover"
              />
              {name}
            </CardTitle>
            <CardDescription className="">
              <span>Released:</span>
              <span>{released}</span>
            </CardDescription>
            <CardAction>
              <DownloadButton />
            </CardAction>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="flex gap-1">
              <p className="text-muted-foreground font-bold">Status:</p>
              <p
                className={cn(
                  "flex gap-1 items-center",
                  isPay ? "text-green-500" : "text-red-500",
                )}
              >
                {isPay ? "Pago" : "Pendiente"}
                <span
                  className={cn(
                    "animate-ping inline-flex h-1 w-1 rounded-full",
                    isPay ? "bg-green-400" : "bg-red-400",
                  )}
                />
              </p>
            </div>

            <p className="text-muted-foreground">
              Wav, mp3, stems, performace, beat
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-1">
              <p className="text-muted-foreground font-bold">Key:</p>
              <p className="font-light">{key}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-muted-foreground font-bold"> Bpm:</p>
              <p className="font-light">{bpm}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
