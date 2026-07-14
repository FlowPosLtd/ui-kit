import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Switch } from "./switch";
import { Columns3, ChevronDown } from "lucide-react";

export interface ManageColumnsColumn {
  key: string;
  label: string;
  alwaysVisible?: boolean;
}

interface ManageColumnsProps {
  columns: ManageColumnsColumn[];
  visibility: Record<string, boolean>;
  onToggle: (key: string) => void;
}

export const ManageColumns = ({
  columns,
  visibility,
  onToggle,
}: ManageColumnsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="tertiary" size="sm" className="whitespace-nowrap">
          <Columns3 className="w-4 h-4" />
          Manage Columns
          <ChevronDown className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 p-0">
        <div className="px-grid py-2.5 border-b border-border">
          <span className="text-body-3 font-medium text-content-primary">
            Manage columns
          </span>
        </div>
        <div className="py-1 max-h-80 overflow-y-auto">
          {columns.map((col) => (
            <div
              key={col.key}
              className="flex items-center justify-between px-grid py-inner"
            >
              <span className="text-body-3 text-content-primary">
                {col.label}
              </span>
              <Switch
                checked={visibility[col.key] !== false}
                onCheckedChange={() =>
                  !col.alwaysVisible && onToggle(col.key)
                }
                disabled={col.alwaysVisible}
                className="scale-75"
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
