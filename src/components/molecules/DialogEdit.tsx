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
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {oragnism}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {Object.keys(form.getValues()).map((key) => {
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as Path<T>}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>{key}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={key}
                          {...field}
                          disabled={field.name === "uuid" ? true : false}
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
