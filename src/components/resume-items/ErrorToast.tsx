import { toast } from "sonner"


export const showErrorToast = (messageType: string, errorMessage: string) => {
    toast(messageType, {
        description: errorMessage,
        action: {
            label: "Dismiss",
            onClick: () => console.log(""),
        }
    });
};

export default showErrorToast;
