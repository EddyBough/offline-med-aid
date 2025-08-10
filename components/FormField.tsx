import { Input } from "./ui/Input";

type Props = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

export const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}: Props) => (
  <Input
    label={label}
    value={value}
    onChangeText={onChange}
    placeholder={placeholder}
    required={required}
    error={error}
  />
);
