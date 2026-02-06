import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/lib/types";

export const AgentCard = ({ agent }: { agent: Agent }) => (
  <Card>
    <CardContent className="space-y-4 p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
          <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Makléř</p>
          <p className="font-semibold">{agent.name}</p>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>{agent.phone}</p>
        <p>{agent.email}</p>
      </div>
      <Button variant="outline" className="w-full">
        Kontaktovat makléře
      </Button>
    </CardContent>
  </Card>
);
