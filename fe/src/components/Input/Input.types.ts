export interface InputProps {
    type: string;
    placeholder?: string;
    value: string;
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}