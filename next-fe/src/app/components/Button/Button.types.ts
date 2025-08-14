export interface ButtonProps {
    text: string | React.ReactNode;
    type: "Success" | "Error" | "Common" | "Plain";
    className?: string;
    onClick?: any;
}