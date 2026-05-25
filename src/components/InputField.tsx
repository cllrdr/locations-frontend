import { type FC, type ChangeEvent, type KeyboardEvent } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

interface InputFieldProps {
  value: string;
  setValue: (value: string) => void;
  loading?: boolean;
  onSubmit: () => void;
  placeholder?: string;
}

export const InputField: FC<InputFieldProps> = ({
  value, setValue, loading, onSubmit, placeholder = "Поиск..."
}) => (
  <Form 
    className="search-form"
    onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
  >
    <InputGroup>
      <Form.Control
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onSubmit()}
        disabled={loading}
      />
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Поиск..." : "Найти"}
      </Button>
    </InputGroup>
  </Form>
);

export default InputField;