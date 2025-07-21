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
  enlace: string;
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
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary underline hover:opacity-80"
        >
          Descargar recurso →
        </a>
      </CardContent>
    </Card>
  );
}
