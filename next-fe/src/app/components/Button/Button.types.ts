export interface ButtonProps {
    text: string | React.ReactNode;
    type: "Success" | "Error" | "Common";
    className?: string;
    onClick?: any;
}