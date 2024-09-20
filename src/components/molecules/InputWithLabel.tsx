import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
}

export function InputWithLabel(props: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={props.id}>{props.labelText}</Label>
      <Input
        className="mt-2"
        type={props.inputType}
        id={props.id}
        placeholder={props.inputPlaceholder}
      />
    </div>
  );
}
