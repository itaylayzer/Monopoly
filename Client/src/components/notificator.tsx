import { forwardRef, useImperativeHandle } from "react";

interface NotificatorProps {}
export interface NotificatorRef {
    message: (
        message: string,
        type?: "info" | "warn" | "error",
        time?: number,
        after?:()=>void
    ) => void;
    dialog: (
        build_dialog_function: (
            close_dialog_func: () => void,
            create_button: (
                innerHTML: string,
                onClick: (this: GlobalEventHandlers, ev: MouseEvent) => any
            ) => HTMLButtonElement
        ) => {
            innerHTML: string;
            buttons: Array<HTMLButtonElement>;
        }
    ) => void;
}

// Create the component with forwardRef
const NotifyElement = forwardRef<NotificatorRef, NotificatorProps>(
    // @ts-ignore
    (prop, ref) => {
        useImperativeHandle(ref, () => ({
            message(message, type, time, after) {
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
                        if (after) after();
                    }, 700);
                };

                setTimeout(() => {
                    if (!already_hidden) {
                        element.style.animation = animation_text;
                        setTimeout(() => {
                            folder.removeChild(element);
                            element.remove();
                            if (after) after();
                        }, 700);
                    }
                }, (time ?? 2) * 1000);
            },
            dialog(build_dialog_function) {
                const dialogScreen = document.querySelector(
                    "div.dialog-screen"
                ) as HTMLDivElement;
                const dialaogElement = document.querySelector(
                    "div.dialog-box"
                ) as HTMLDivElement;
                const textsElement = dialaogElement.querySelector(
                    "div.texts"
                ) as HTMLDivElement;
                const buttonsElement = dialaogElement.querySelector(
                    "div.buttons"
                ) as HTMLDivElement;
                const functionResults = build_dialog_function(
                    () => {
                        dialogScreen.setAttribute("data-show", "false");
                        dialaogElement.setAttribute("data-show", "false");
                        dialaogElement.style.animation =
                            "dialogout 1s cubic-bezier(.5,0,1,.5)";
                        setTimeout(() => {
                            dialaogElement.style.animation = "";
                            textsElement.innerHTML = "";
                            buttonsElement.innerHTML = "";
                        }, 1000);
                    },
                    (innerHTML, onClick) => {
                        const _button = document.createElement("button");
                        _button.onclick = onClick;
                        _button.innerHTML = innerHTML;
                        return _button;
                    }
                );
                dialaogElement.setAttribute("data-show", "true");
                dialogScreen.setAttribute("data-show", "true");
                textsElement.innerHTML = functionResults.innerHTML;
                for (const x of functionResults.buttons) {
                    buttonsElement.appendChild(x);
                }
            },
        }));

        return (
            <>
                {" "}
                <div className="notify"></div>
                <div className="dialog-screen" data-show={false}></div>
                <div className="dialog-box" data-show={false}>
                    <div className="texts"></div>
                    <div className="buttons"></div>
                </div>
            </>
        );
    }
);

export default NotifyElement;
