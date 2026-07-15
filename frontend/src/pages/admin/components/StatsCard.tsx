import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
    icon: React.ElementType;
    label: string;
    value: string;
    bgColor: string;
    iconColor: string;
};

const StatsCard = ({icon:Icon, label, value, bgColor, iconColor}: StatsCardProps) => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6 ">
            <div className="flex items-center gap-4">
                <div>
                    <Icon/>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}
