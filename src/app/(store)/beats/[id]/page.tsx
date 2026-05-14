import { Beat } from "@/features/beats/components/beat";
type SigleBeatPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SigleBeatPage({ params }: SigleBeatPageProps) {
  const { id } = await params;

  return (
    <div>
      <Beat id={id} />
    </div>
  );
}
