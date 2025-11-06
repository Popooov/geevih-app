import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface RecursoCardProps {
  titulo: string;
  tipo: string;
  fecha: string;
  enlace?: string | null;
}

export default function ResourceCard({ titulo, tipo, fecha, enlace }: RecursoCardProps) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="flex items-start gap-3 pb-2">
        <FileText className="w-6 h-6 text-muted-foreground mt-1" />
        <div>
          <CardTitle className="text-base">{titulo}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {tipo} • {fecha}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {enlace ? (
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            title={`Abrir ${titulo}`}
            aria-label={`Abrir o descargar ${titulo}`}
            className="text-sm text-primary underline hover:opacity-80"
          >
            Ver / Descargar recurso →
          </a>
        ) : (
          <span className="text-sm text-gray-400">Recurso no disponible</span>
        )}
      </CardContent>
    </Card>
  );
}
