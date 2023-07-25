import { forwardRef, useImperativeHandle } from "react";

interface NotificatorProps {}
export interface NotificatorRef {
    message: (
        message: string,
        type?: "info" | "warn" | "error",
        time?: number
    ) => void;
}

// Create the component with forwardRef
const NotifyElement = forwardRef<NotificatorRef, NotificatorProps>(
    (prop, ref) => {
        useImperativeHandle(ref, () => ({
            message(message, type, time) {
                const folder = document.querySelector(
                    "div.notify"
                ) as HTMLDivElement;

                const element = document.createElement("div") as HTMLDivElement;
                element.className = "notification";
                element.innerHTML = message;
                element.setAttribute("data-notif-type", type ?? "info");

                folder.appendChild(element);
                var already_hidden = false;
                var animation_text = "popoff .7s cubic-bezier(.62,.25,1,-0.73)";

                element.onclick = () => {
                    already_hidden = true;
                    element.style.animation = animation_text;
                    setTimeout(() => {
                        folder.removeChild(element);
                        element.remove();
                    }, 700);
                };

                setTimeout(() => {
                    if (!already_hidden) {
                        element.style.animation = animation_text;
                        setTimeout(() => {
                            folder.removeChild(element);
                            element.remove();
                        }, 700);
                    }
                }, (time ?? 2) * 1000);
            },
        }));

        return <div className="notify"></div>;
    }
);

export default NotifyElement;
