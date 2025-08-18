import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { Input } from "./ui/input";

interface FormItemFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  classNames?: {
    rootClassName?: string;
    labelClassName?: string;
  };
}

const FormInputField = ({
  className,
  classNames,
  label,
  name,
  required,
  ...props
}: FormItemFieldProps) => {
  return (
    <FormItem className={cn("flex flex-col gap-1", classNames?.rootClassName)}>
      {label && (
        <div className="flex items-center gap-1">
          <FormLabel className={cn("text-md", classNames?.labelClassName)}>
            {label}
          </FormLabel>
          {required && label && <span className="text-red-500">*</span>}
        </div>
      )}
      <FormControl>
        <Input
          id={name}
          name={name}
          {...props}
          className={cn("!mt-0", className)}
        />
      </FormControl>
      <FormMessage className="dark:text-red-400" />
    </FormItem>
  );
};

export default FormInputField;
