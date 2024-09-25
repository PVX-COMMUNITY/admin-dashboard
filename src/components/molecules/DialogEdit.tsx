import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  open: boolean;
  oragnism: string;
  form: UseFormReturn<T>;
  setOpen: () => void;
  onSubmit: (data: T) => void;
}

export function DialogEdit<T extends FieldValues>(props: Props<T>) {
  const { open, setOpen, oragnism, form, onSubmit } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-[425px] max-w-[95vw] max-h-[90vh] overflow-auto"
      >
        <DialogHeader>
          <DialogTitle>Edit {oragnism}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {Object.keys(form.getValues()).map((key) => {
              const typedKey = key as Path<T>;
              const fieldValue = form.getValues(typedKey);
              const fieldType = typeof fieldValue;

              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={typedKey}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="capitalize">{key}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={key}
                          {...field}
                          type={fieldType === "number" ? "number" : "text"}
                          disabled={field.name === "uuid"}
                          onChange={(e) => {
                            const value =
                              fieldType === "number"
                                ? parseFloat(e.target.value)
                                : e.target.value;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            <Button className="mt-4 ml-auto block" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
