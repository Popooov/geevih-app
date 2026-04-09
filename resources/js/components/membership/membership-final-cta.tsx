import { Button } from "../ui/button";

export default function FinalCTA() {
  return (
    <section className="bg-[#af101a] py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-2xl font-semibold">
          Únete a GEEVIH y contribuye al avance de la enfermería experta en VIH
        </h2>

        <div className="mt-8">
          <Button className="bg-white text-[#af101a] hover:bg-gray-100">
            Hazte socio
          </Button>
        </div>
      </div>
    </section>
  );
}
