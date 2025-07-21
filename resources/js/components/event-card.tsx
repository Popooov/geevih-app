import { Calendar } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

interface EventCardProps {
  titulo: string
  fecha: string
  descripcion: string
  link?: string
  imagen?: string
}

export default function EventCard({
  titulo,
  fecha,
  descripcion,
  link,
  imagen,
}: EventCardProps) {
  return (
    <Card className="hover:shadow-md transition overflow-hidden flex flex-col justify-between">
      {/* HEADER: imagen + título */}
      <CardHeader className="p-0 relative h-40">
        <img
          src={imagen ?? "/images/evento-placeholder.jpg"}
          alt={`Imagen del evento: ${titulo}`}
          className="object-cover w-full h-full rounded-t-xl"
        />
        <div className="absolute inset-0 bg-black/60 flex items-end p-4 rounded-t-xl">
          <CardTitle className="text-white text-base">
            {titulo}
          </CardTitle>
        </div>
      </CardHeader>

      {/* CONTENT: fecha y descripción */}
      <CardContent className="space-y-2 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{fecha}</span>
        </div>
        <CardDescription>
          {descripcion}
        </CardDescription>
      </CardContent>

      {/* FOOTER: enlace si existe */}
      {link && (
        <CardFooter className="pb-4">
          <a
            href={link}
            target="_self"
            rel="noopener noreferrer"
            className="text-sm text-primary underline"
          >
            Más información →
          </a>
        </CardFooter>
      )}
    </Card>
  )
}
