import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { Textarea } from "./ui/textarea";

interface FormItemFieldProps extends React.ComponentProps<"textarea"> {
  label?: string;
  classNames?: {
    rootClassName?: string;
    labelClassName?: string;
  };
}

const FormTextareaField = ({
  className,
  classNames,
  label,
  name,
  required,
  ...props
}: FormItemFieldProps) => {
  return (
    <FormItem className={cn("flex flex-col gap-1", classNames?.rootClassName)}>
      <div className="flex items-center gap-1">
        {label && (
          <FormLabel className={cn("", classNames?.labelClassName)}>
            {label}
          </FormLabel>
        )}
        {required && <span className="text-red-500">*</span>}
      </div>
      <FormControl>
        <Textarea
          id={name}
          name={name}
          {...props}
          className={cn("!mt-0", className)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormTextareaField;
