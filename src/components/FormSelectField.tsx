import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FormItemFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  classNames?: {
    rootClassName?: string;
    labelClassName?: string;
  };
  onChange: (value: string) => void;
  value: string;
  data: {
    label: string;
    value: string;
  }[]
}

const FormSelectField = ({
  classNames,
  placeholder,
  label,
  required,
  data,
  onChange,
  value,
}: FormItemFieldProps) => {
  return (
    <FormItem className={cn("flex flex-col", classNames?.rootClassName)}>
      <div className="flex items-center gap-1">
        <FormLabel className={cn("", classNames?.labelClassName)}>
          {label}
        </FormLabel>
        {required && <span className="text-red-500">*</span>}
      </div>
      <Select onValueChange={onChange} value={value}>
        <FormControl>
          <SelectTrigger className="!mt-0">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {data.map((item, key) => (
            <SelectItem key={key} value={item.value}>{item.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default FormSelectField;
