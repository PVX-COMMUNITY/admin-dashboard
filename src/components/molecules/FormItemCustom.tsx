import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
  field: ControllerRenderProps;
}

export function FormItemCustom(props: Props) {
  const { field } = props;

  return (
    <FormItem className="mt-4">
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input placeholder="name" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
