import { MyMasters, MyNextReleases, MySongDemos } from "@/components/artist";
import { MOCK_MY_MASTERS, MOCK_MY_Next_Releases } from "@/lib/mock-data";
import { getDemosFromPublicFolder } from "@/lib/get-from-public-folder";
import type { SongDemo } from "@/types";
export default function Artist() {
  const songDemos: SongDemo[] = getDemosFromPublicFolder();

  return (
    <div className="m-4 gap-6 flex flex-col items-center justify-center w-full mx-auto md:max-w-[80dvw] xl:max-w-[60dvw]">
      <h1>Lyon</h1>
      <MyMasters masters={MOCK_MY_MASTERS} />
      <MyNextReleases release={MOCK_MY_Next_Releases} />
      <MySongDemos songDemos={songDemos} />
    </div>
  );
}
