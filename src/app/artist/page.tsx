import { MyMasters, MyRefs } from "@/components/artist";

export default function Artist() {
  return (
    <div className="flex flex-col justify-center items-center">
      artist section
      <div>Bienvenido</div>
      <MyMasters />
      <MyRefs />
    </div>
  );
}
