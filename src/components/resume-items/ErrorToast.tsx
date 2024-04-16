import { toast } from "sonner"


export const showErrorToast = (errorType: string, errorMessage: string) => {
    toast(errorType, {
        description: errorMessage,
        action: {
            label: "Dismiss",
            onClick: () => console.log(""),
        }
    });
};

export default showErrorToast;
