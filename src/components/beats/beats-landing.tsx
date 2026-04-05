import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BeatsLanding() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-foreground via-foreground/100 to-background font-sans">
      <h1 className="text-4xl font-bold text-primary-foreground">
        Beats Landing Page
      </h1>
      <div className="w-full md:w-[80%] h-full flex items-start justify-center p-4">
        <Table>
          <TableCaption>Beats Catalog</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Beat Name</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Chill Vibes</TableCell>
              <TableCell>Lo-fi</TableCell>
              <TableCell>$20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Trap Banger</TableCell>
              <TableCell>Trap</TableCell>
              <TableCell>$30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gritty Boom Bap</TableCell>
              <TableCell>Boom Bap</TableCell>
              <TableCell>$25</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
