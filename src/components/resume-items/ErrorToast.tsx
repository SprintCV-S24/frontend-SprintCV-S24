import { toast } from "sonner"


export const showErrorToast = (errorMessage: string) => {
    toast("Error!", {
        description: errorMessage,
        action: {
            label: "Dismiss",
            onClick: () => console.log(""),
        }
    });
};

export default showErrorToast;
