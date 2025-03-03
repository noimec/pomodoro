export interface ButtonsConfig {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
}

export interface TasksButtonsProps {
    onIncrease: () => void;
    onDecrease: () => void;
    onEdit: () => void;
    onModalOpen: () => void;
}