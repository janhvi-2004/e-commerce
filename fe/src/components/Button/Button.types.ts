export interface ButtonProps {
    text: string;
    type: "Success" | "Error" | "Common";
    className?: string;
    onClick?: () => void;
}