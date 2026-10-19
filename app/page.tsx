import World from "@/components/world/World";
import { WorldProvider } from "@/components/world/WorldProvider";

export default function Page() {
  return (
    <WorldProvider>
      <World />
    </WorldProvider>
  );
}
