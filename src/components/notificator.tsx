import { forwardRef, useImperativeHandle } from "react";
import { MonopolyCookie } from "../assets/types";
import { CookieManager } from "../assets/cookieManager";

interface NotificatorProps {}
export interface NotificatorRef {
	message: (
		message: string,
		type?: "info" | "warn" | "error",
		time?: number,
		after?: () => void,
		sfx?: boolean
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
		},
		soundtrack: "winning" | "loosing"
	) => void;
}

// Create the component with forwardRef
const NotifyElement = forwardRef<NotificatorRef, NotificatorProps>(
	// @ts-ignore
	(prop, ref) => {
		useImperativeHandle(ref, () => ({
			message(message, type, time, after, sfx) {
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

				if (sfx === undefined || (sfx !== undefined && sfx === true)) {
					const _settings = (
						JSON.parse(
							decodeURIComponent(
								CookieManager.get("monopolySettings") as string
							)
						) as MonopolyCookie
					).settings;
					let audio = new Audio("./notifications.mp3");
					audio.volume =
						((_settings?.audio[1] ?? 100) / 100) *
						((_settings?.audio[0] ?? 100) / 100);
					audio.play();
				}
			},
			dialog(build_dialog_function, soundtrack) {
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

				const _settings = (
					JSON.parse(
						decodeURIComponent(
							CookieManager.get("monopolySettings") as string
						)
					) as MonopolyCookie
				).settings;

				switch (soundtrack) {
					case "loosing":
						var audio = new Audio("./dying.mp3");
						audio.volume =
							0.16 *
							((_settings?.audio[1] ?? 100) / 100) *
							((_settings?.audio[0] ?? 100) / 100);
						audio.loop = false;
						audio.play();
						break;
					case "winning":
						var audio = new Audio("./winning.mp3");
						audio.volume =
							((_settings?.audio[1] ?? 100) / 100) *
							((_settings?.audio[0] ?? 100) / 100);
						audio.loop = false;
						audio.play();
						break;
					default:
						break;
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
