import { useState, useEffect, useRef } from "react";
import { Server, Socket } from "./assets/websockets.ts";
import { Player, PlayerJSON } from "./assets/player";
import "./monopoly.css";
import MonopolyNav, { MonopolyNavRef } from "./components/ingame/nav.tsx";
import MonopolyGame, { MonopolyGameRef } from "./components/ingame/game.tsx";
import NotifyElement, { NotificatorRef } from "./components/notificator";
import monopolyJSON from "./assets/monopoly.json";
import { MonopolySettings } from "./assets/types";
function App({
    socket,
    name,
    server,
}: {
    socket: Socket;
    name: string;
    server: Server | undefined;
}) {
    const [clients, SetClients] = useState<Map<string, Player>>(new Map());
    const players = Array.from(clients.values());

    const [currentId, SetCurrent] = useState<string>("");
    const [gameStarted, SetGameStarted] = useState<boolean>(false);
    const [imReady, SetReady] = useState<boolean>(false);
    const [selectedMode, SetMode] = useState<number>(0);
    const [globalSettings, SetSettings] = useState<MonopolySettings>();
    const [mainTheme, SetTheme] = useState(new Audio("./main-theme.mp3"));
    useEffect(() => {
        if (!gameStarted) return;
        // Sound Effect
        mainTheme.loop = true;
        mainTheme.play();

        mainTheme.volume = 0.25;
        if (globalSettings !== undefined) {
            mainTheme.volume =
                (globalSettings.audio[0] / 100) *
                (globalSettings.audio[2] / 100);
        }
        SetTheme(mainTheme);
    }, [gameStarted]);
    useEffect(() => {
        const settings_interval = setInterval(() => {
            const parsedCookie = JSON.parse(document.cookie)["settings"];
            SetSettings(parsedCookie);
        }, 1000);
        return () => {
            clearInterval(settings_interval);
        };
    }, [document.cookie]);

    useEffect(() => {
        if (globalSettings !== undefined) {
            mainTheme.volume =
                (globalSettings.audio[0] / 100) *
                (globalSettings.audio[2] / 100);
        }
    }, [globalSettings]);

    const engineRef = useRef<MonopolyGameRef>(null);
    const navRef = useRef<MonopolyNavRef>(null);
    const notifyRef = useRef<NotificatorRef>(null);

    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );
    if (server !== undefined) {
        server.RenderLogs((array) => {
            try {
                const x = document.body.querySelector(
                    "#server main div.middle"
                ) as HTMLDivElement;
                x.innerHTML = "";
                for (const v of array) {
                    x.innerHTML += `<p> ${v.join("\t")} </p>`;
                }
            } catch {}
        });
    }
    useEffect(() => {
        let settings: MonopolySettings | undefined = undefined;

        const settings_interval = setInterval(() => {
            settings = JSON.parse(document.cookie)["settings"];
        }, 1000);

        function mouseMove(e: MouseEvent) {
            const _pos = { x: e.clientX, y: e.clientY };
            const xplayer = clients.get(socket.id);
            socket.emit("mouse", _pos);
            xplayer ? (xplayer.positions = _pos) : "";
        }

        function destroyPlayer(playerId: string) {
            // remove player from clients
            function removePlayer() {
                clients.delete(playerId);
                SetClients(new Map(clients));

                // 1 frame to check if it isnt removed
                requestAnimationFrame(() => {
                    if (clients.has(playerId)) {
                        // request a loop frame!
                        requestAnimationFrame(removePlayer);
                    } else {
                    }
                });
            }
            removePlayer();

            // removing child from game div
            function removeChild() {
                const _element = document.querySelector(
                    `div.player[player-id="${playerId}"]`
                );
                if (_element === null) return;
                if (_element.parentElement)
                    _element.parentElement.removeChild(_element);
                _element.remove();

                // 1 frame to check if it isnt removed
                requestAnimationFrame(() => {
                    if (
                        document.querySelector(
                            `div.player[player-id="${playerId}"]`
                        ) !== null
                    ) {
                        // request a loop frame!
                        requestAnimationFrame(removeChild);
                    } else {
                    }
                });
            }
            removeChild();
        }

        function playerMoveGENERATOR(
            final_position: number,
            _xplayer: Player,
            get200whengo: boolean = true,
            afterFinished?: () => void,
            adding: boolean = true
        ) {
            var sum_moves = (final_position - _xplayer.position) % 40;
            if (
                (final_position < _xplayer.position || sum_moves < 0) &&
                adding
            ) {
                sum_moves = 40 - _xplayer.position + final_position;
            }

            if (!adding) {
                sum_moves = _xplayer.position - final_position;
                if (sum_moves < 0) {
                    sum_moves += 40;
                }
            }

            const time = 0.35 * 1000 * sum_moves;

            console.log(
                `${new Date().toTimeString()} generator ${Math.random()} target ${final_position} time ${time} current ${
                    _xplayer.position
                }`
            );
            function _playerMoveFunc() {
                var firstPosition = 0;
                var addedMoney = false;
                var i = 0;
                const element = document.querySelector(
                    `div.player[player-id="${_xplayer.id}"]`
                ) as HTMLDivElement;

                firstPosition = _xplayer.position;
                _xplayer.position += 1;
                var audio = new Audio("./step2.mp3");
                audio.volume =
                    0.1 *
                    ((settings?.audio[1] ?? 100) / 100) *
                    ((settings?.audio[0] ?? 100) / 100);
                audio.loop = false;
                audio.play();
                element.style.animation =
                    "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                const movingAnim = () => {
                    if (i < sum_moves) {
                        i += 1;
                        var audio = new Audio("./step2.mp3");
                        audio.volume =
                            1 *
                            ((settings?.audio[1] ?? 100) / 100) *
                            ((settings?.audio[0] ?? 100) / 100);
                        audio.loop = false;
                        audio.play();
                        _xplayer.position =
                            (_xplayer.position + (adding ? 1 : -1)) % 40;
                        if (_xplayer.position == 0 && get200whengo) {
                            _xplayer.balance += 200;
                            var audio = new Audio("./moneyplus.mp3");
                            audio.volume =
                                1 *
                                ((settings?.audio[1] ?? 100) / 100) *
                                ((settings?.audio[0] ?? 100) / 100);
                            audio.loop = false;
                            audio.play();
                            if (_xplayer.id === socket.id) {
                                if (
                                    settings !== undefined &&
                                    settings.notifications === true
                                )
                                    notifyRef.current?.message(
                                        `${200} of money is added to the account`,
                                        "info",
                                        2,
                                        () => {},
                                        false
                                    );
                                engineRef.current?.applyAnimation(2);
                            }
                            addedMoney = true;
                            SetClients(
                                new Map(clients.set(_xplayer.id, _xplayer))
                            );
                        }
                        if (i == sum_moves - 1) {
                            _xplayer.position = final_position;
                            element.style.animation =
                                "part 0.9s cubic-bezier(0,.7,.57,1)";
                            setTimeout(() => {
                                element.style.animation = "";
                            }, 900);

                            if (
                                !addedMoney &&
                                firstPosition > _xplayer.position &&
                                get200whengo
                            ) {
                                var audio = new Audio("./moneyplus.mp3");
                                audio.volume =
                                    1 *
                                    ((settings?.audio[1] ?? 100) / 100) *
                                    ((settings?.audio[0] ?? 100) / 100);
                                audio.loop = false;
                                audio.play();
                                _xplayer.balance += 200;
                                if (_xplayer.id === socket.id) {
                                    if (
                                        settings !== undefined &&
                                        settings.notifications === true
                                    )
                                        notifyRef.current?.message(
                                            `${200} of money is added to the account`,
                                            "info",
                                            2,
                                            () => {},
                                            false
                                        );
                                    engineRef.current?.applyAnimation(2);
                                }
                                addedMoney = true;

                                SetClients(
                                    new Map(clients.set(_xplayer.id, _xplayer))
                                );
                            }
                            if (afterFinished) afterFinished();
                        } else {
                            element.style.animation =
                                "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                            setTimeout(movingAnim, 0.35 * 1000);
                        }
                    }
                };
                setTimeout(movingAnim, 0.35 * 1000);
            }

            return {
                func: _playerMoveFunc,
                time,
            };
        }

        //#region socket handeling
        const socket_Initials = (args: {
            turn_id: string;
            other_players: Array<PlayerJSON>;
        }) => {
            SetCurrent(args.turn_id.toString());
            for (const x of args.other_players) {
                SetClients(
                    clients.set(
                        x.id,
                        new Player(x.id, x.username).recieveJson(x)
                    )
                );
            }
        };

        const socket_NewPlayer = (args: PlayerJSON) => {
            SetClients(
                new Map(
                    clients.set(
                        args.id,
                        new Player(args.id, args.username).recieveJson(args)
                    )
                )
            );
        };

        const socket_Ready = (args: {
            id: string;
            state: boolean;
            selectedMode: number;
        }) => {
            const x = clients.get(args.id);
            if (x === undefined) return;
            x.ready = args.state;
            SetClients(new Map(clients.set(x.id, x)));
            SetMode(args.selectedMode);
        };
        const socket_StartGame = () => {
            SetGameStarted(true);
        };

        const socket_DisconnectedPlayer = (args: {
            id: string;
            turn: string;
        }) => {
            SetCurrent(args.turn);
            if (clients.size > 2) {
                const name = clients.get(args.id)?.username ?? "player";
                notifyRef.current?.message(`${name} disconected`, "error");
            } else {
                mainTheme.pause();
                notifyRef.current?.dialog(
                    (close_func, createButton) => ({
                        innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                            clients.get(socket.id)?.balance ?? 0
                        } </p>`,
                        buttons: [
                            createButton("PLAY ANOTHER GAME", () => {
                                close_func();
                                document.location.reload();
                            }),
                        ],
                    }),
                    "winning"
                );
            }
            destroyPlayer(args.id);
        };

        const socket_TurnFinished = (args: {
            from: string;
            turnId: string;
            pJson: PlayerJSON;
        }) => {
            const x = clients.get(args.from);

            if (
                x !== undefined &&
                JSON.stringify(x.properties) !=
                    JSON.stringify(args.pJson.properties)
            ) {
                // sound part - other player part
                var audio = new Audio("./buying1.mp3");
                audio.volume =
                    0.5 *
                    ((settings?.audio[1] ?? 100) / 100) *
                    ((settings?.audio[0] ?? 100) / 100);
                audio.loop = false;
                audio.play();
            }

            if (args.from !== socket.id && x) {
                x.recieveJson(args.pJson);
                SetClients(new Map(clients.set(args.from, x)));
            }

            if (args.pJson.balance < 0) {
                if (args.pJson.id !== socket.id) {
                    if (clients.size > 2) {
                        const name = args.pJson.username;
                        notifyRef.current?.message(`${name} lost`, "info");
                    } else {
                        if (clients.has(socket.id)) {
                            mainTheme.pause();
                            notifyRef.current?.dialog(
                                (close_func, createButton) => ({
                                    innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                                        clients.get(socket.id)?.balance ?? 0
                                    } </p>`,
                                    buttons: [
                                        createButton(
                                            "PLAY ANOTHER GAME",
                                            () => {
                                                close_func();
                                                document.location.reload();
                                            }
                                        ),
                                    ],
                                }),
                                "winning"
                            );
                        } else {
                            const xclient = Array.from(clients.values()).filter(
                                (v) => v.id !== args.pJson.id
                            )[0];
                            const name = xclient.username ?? 0;
                            mainTheme.pause();
                            notifyRef.current?.dialog(
                                (close_func, createButton) => ({
                                    innerHTML: `<h3> ${name} WON! </h3> <p> ${name} won with the balance of ${
                                        clients.get(socket.id)?.balance ?? 0
                                    } </p>`,
                                    buttons: [
                                        createButton(
                                            "PLAY ANOTHER GAME",
                                            () => {
                                                close_func();
                                                document.location.reload();
                                            }
                                        ),
                                    ],
                                }),
                                "winning"
                            );
                        }
                    }
                } else {
                    mainTheme.pause();
                    notifyRef.current?.dialog(
                        (close_func, createButton) => ({
                            innerHTML: `<h3> YOU LOST! </h3> <p> you lost your money and lost the monopol with a wanted balance of ${-(
                                clients.get(socket.id)?.balance ?? 0
                            )} </p>`,
                            buttons: [
                                createButton("CONTINUE WATCHING", () => {
                                    close_func();
                                }),
                                createButton("PLAY ANOTHER GAME", () => {
                                    close_func();
                                    document.location.reload();
                                }),
                            ],
                        }),
                        "loosing"
                    );
                }

                destroyPlayer(args.pJson.id);
            }

            SetCurrent(args.turnId);
            if (args.turnId === socket.id) {
                const x = clients.get(args.turnId);
                if (x && x.isInJail) {
                    engineRef.current?.showJailsButtons(
                        (x?.getoutCards ?? -1) > 0
                    );
                } else {
                }
            }
            navRef.current?.reRenderPlayerList();
        };

        const socket_Message = (message: { from: string; message: string }) => {
            navRef.current?.addMessage(message);
        };
        const socket_DiceRollResult = (args: {
            listOfNums: [number, number, number];
            turnId: string;
        }) => {
            var audio = new Audio("./rolling.mp3");
            audio.volume =
                ((settings?.audio[1] ?? 100) / 100) *
                ((settings?.audio[0] ?? 100) / 100);
            audio.loop = false;
            audio.play();
            // const sumTimes = args.listOfNums[0] + args.listOfNums[1];
            const localPlayer = clients.get(socket.id) as Player;
            const xplayer = clients.get(args.turnId) as Player;
            const dice_generatorResults = playerMoveGENERATOR(
                args.listOfNums[2],
                xplayer,
                true,
                () => {
                    if (args.turnId != socket.id && args.listOfNums[2] === 30) {
                        setTimeout(() => {
                            const generatorResults = playerMoveGENERATOR(
                                10,
                                xplayer,
                                false,
                                () => {
                                    xplayer.position = 10;
                                    xplayer.isInJail = true;
                                    var audio = new Audio("./jail.mp3");
                                    audio.volume =
                                        0.5 *
                                        ((settings?.audio[1] ?? 100) / 100) *
                                        ((settings?.audio[0] ?? 100) / 100);
                                    audio.loop = false;
                                    audio.play();
                                    xplayer.jailTurnsRemaining = 3;
                                }
                            );
                            generatorResults.func();
                        }, 800);
                    }
                }
            );

            engineRef.current?.diceResults({
                l: [args.listOfNums[0], args.listOfNums[1]],
                time: localPlayer.isInJail
                    ? 2000
                    : dice_generatorResults.time + 2000 + 800,
                onDone: () => {
                    if (socket.id !== args.turnId) return;

                    const location = clients.get(socket.id)?.position ?? -1;
                    const proprety = propretyMap.get(location);
                    if (proprety != undefined) {
                        if (
                            proprety.id === "communitychest" ||
                            proprety.id === "chance"
                        ) {
                            socket.emit(
                                "chorch_roll",
                                proprety.id === "chance"
                            );
                        } else {
                            engineRef.current?.setStreet({
                                location,
                                rolls: args.listOfNums[1] + args.listOfNums[0],
                                onResponse: (b, info) => {
                                    var time_till_free = 0;
                                    if (b === "buy") {
                                        if (
                                            settings !== undefined &&
                                            settings.notifications === true
                                        )
                                            notifyRef.current?.message(
                                                `${
                                                    (proprety?.price ?? 0) * 1
                                                } of money is deducted from the account`,
                                                "info",
                                                2,
                                                () => {},
                                                false
                                            );
                                        localPlayer.balance -=
                                            (proprety?.price ?? 0) * 1;
                                        engineRef.current?.applyAnimation(1);
                                        localPlayer.properties.push({
                                            posistion: localPlayer.position,
                                            count: 0,
                                            group:
                                                propretyMap.get(
                                                    localPlayer.position
                                                )?.group ?? "",
                                        });
                                        var audio = new Audio("./buying1.mp3");
                                        audio.volume =
                                            0.5 *
                                            ((settings?.audio[1] ?? 100) /
                                                100) *
                                            ((settings?.audio[0] ?? 100) / 100);
                                        audio.loop = false;
                                        audio.play();
                                    } else if (b === "advance-buy") {
                                        var audio = new Audio("./buying1.mp3");
                                        audio.volume =
                                            0.5 *
                                            ((settings?.audio[1] ?? 100) /
                                                100) *
                                            ((settings?.audio[0] ?? 100) / 100);
                                        audio.loop = false;
                                        audio.play();
                                        const propId = Array.from(
                                            new Map(
                                                localPlayer.properties.map(
                                                    (v, i) => [i, v]
                                                )
                                            ).entries()
                                        ).filter(
                                            (v) => v[1].posistion === location
                                        )[0][0];

                                        const _info = info as {
                                            state: 1 | 2 | 3 | 4 | 5;
                                            money: number;
                                        };

                                        localPlayer.properties[propId].count =
                                            _info.state === 5
                                                ? "h"
                                                : _info.state;

                                        if (_info.state === 5) {
                                            if (
                                                settings !== undefined &&
                                                settings.notifications === true
                                            )
                                                notifyRef.current?.message(
                                                    `${
                                                        proprety.ohousecost ?? 0
                                                    } of money is deducted from the account`,
                                                    "info",
                                                    2,
                                                    () => {},
                                                    false
                                                );
                                            localPlayer.balance -=
                                                proprety.ohousecost ?? 0;
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        } else {
                                            if (
                                                settings !== undefined &&
                                                settings.notifications === true
                                            )
                                                notifyRef.current?.message(
                                                    `${
                                                        proprety.housecost ?? 0
                                                    } of money is deducted from the account`,
                                                    "info",
                                                    2,
                                                    () => {},
                                                    false
                                                );
                                            localPlayer.balance -=
                                                (proprety.housecost ?? 0) *
                                                _info.money;
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        }
                                    } else if (b === "someones") {
                                        const players = Array.from(
                                            clients.values()
                                        );
                                        for (const p of players) {
                                            for (const prp of p.properties) {
                                                if (
                                                    prp.posistion === location
                                                ) {
                                                    var payment_ammount = 0;

                                                    if (
                                                        proprety.group ===
                                                            "Utilities" &&
                                                        prp.rent
                                                    ) {
                                                        const multy_ =
                                                            p.properties.filter(
                                                                (v) =>
                                                                    v.group ===
                                                                    "Utilities"
                                                            ).length === 2
                                                                ? 10
                                                                : 4;
                                                        payment_ammount =
                                                            prp.rent * multy_;
                                                    } else if (
                                                        proprety.group ===
                                                        "Railroad"
                                                    ) {
                                                        const count =
                                                            p.properties.filter(
                                                                (v) =>
                                                                    v.group ===
                                                                    "Railroad"
                                                            ).length;
                                                        const rents = [
                                                            25, 50, 100, 200,
                                                        ];
                                                        payment_ammount =
                                                            rents[count];
                                                    } else if (
                                                        prp.count === 0
                                                    ) {
                                                        payment_ammount =
                                                            proprety?.rent ?? 0;
                                                    } else if (
                                                        typeof prp.count ===
                                                            "number" &&
                                                        prp.count > 0
                                                    ) {
                                                        payment_ammount =
                                                            (proprety?.multpliedrent ?? [
                                                                0, 0, 0, 0,
                                                            ])[prp.count - 1] ??
                                                            0;
                                                    } else if (
                                                        prp.count === "h"
                                                    ) {
                                                        payment_ammount =
                                                            (proprety?.multpliedrent ?? [
                                                                0, 0, 0, 0, 0,
                                                            ])[4] ?? 0;
                                                    }
                                                    if (
                                                        settings !==
                                                            undefined &&
                                                        settings.notifications ===
                                                            true
                                                    )
                                                        notifyRef.current?.message(
                                                            `${payment_ammount} of money is deducted from the account`,
                                                            "info",
                                                            2,
                                                            () => {},
                                                            false
                                                        );
                                                    var audio = new Audio(
                                                        "./moneyminus.mp3"
                                                    );
                                                    audio.volume =
                                                        ((settings?.audio[1] ??
                                                            100) /
                                                            100) *
                                                        ((settings?.audio[0] ??
                                                            100) /
                                                            100);
                                                    audio.loop = false;
                                                    audio.play();
                                                    localPlayer.balance -=
                                                        payment_ammount;
                                                    engineRef.current?.applyAnimation(
                                                        1
                                                    );
                                                    socket.emit("pay", {
                                                        balance:
                                                            payment_ammount,
                                                        from: socket.id,
                                                        to: p.id,
                                                    });
                                                    engineRef.current?.applyAnimation(
                                                        1
                                                    );
                                                }
                                            }
                                        }
                                    } else if (b === "nothing") {
                                        if (
                                            (proprety?.id ?? "") == "gotojail"
                                        ) {
                                            const generatorResults =
                                                playerMoveGENERATOR(
                                                    10,
                                                    xplayer,
                                                    false,
                                                    () => {
                                                        xplayer.position = 10;
                                                        xplayer.isInJail = true;
                                                        xplayer.jailTurnsRemaining = 3;
                                                    }
                                                );

                                            time_till_free =
                                                generatorResults.time;
                                            generatorResults.func();
                                        }

                                        if (proprety?.id === "incometax") {
                                            localPlayer.balance -= 200;
                                            if (
                                                settings !== undefined &&
                                                settings.notifications === true
                                            )
                                                notifyRef.current?.message(
                                                    `${200} of money is deducted from the account`,
                                                    "info",
                                                    2,
                                                    () => {},
                                                    false
                                                );
                                            var audio = new Audio(
                                                "./moneyminus.mp3"
                                            );
                                            audio.volume =
                                                ((settings?.audio[1] ?? 100) /
                                                    100) *
                                                ((settings?.audio[0] ?? 100) /
                                                    100);
                                            audio.loop = false;
                                            audio.play();
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        }
                                        if (proprety?.id === "luxerytax") {
                                            localPlayer.balance -= 100;
                                            if (
                                                settings !== undefined &&
                                                settings.notifications === true
                                            )
                                                notifyRef.current?.message(
                                                    `${100} of money is deducted from the account`,
                                                    "info",
                                                    2,
                                                    () => {},
                                                    false
                                                );
                                            var audio = new Audio(
                                                "./moneyminus.mp3"
                                            );
                                            audio.volume =
                                                ((settings?.audio[1] ?? 100) /
                                                    100) *
                                                ((settings?.audio[0] ?? 100) /
                                                    100);
                                            audio.loop = false;
                                            audio.play();
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        }
                                    } else if (b === "special_action") {
                                        if (
                                            settings !== undefined &&
                                            settings.notifications === true
                                        )
                                            notifyRef.current?.message(
                                                `${
                                                    (proprety?.price ?? 0) * 1
                                                } of money is deducted from the account`,
                                                "info",
                                                2,
                                                () => {},
                                                false
                                            );
                                        var audio = new Audio("./buying1.mp3");
                                        audio.volume =
                                            0.5 *
                                            ((settings?.audio[1] ?? 100) /
                                                100) *
                                            ((settings?.audio[0] ?? 100) / 100);
                                        audio.loop = false;
                                        audio.play();
                                        localPlayer.balance -=
                                            (proprety?.price ?? 0) * 1;
                                        engineRef.current?.applyAnimation(1);

                                        const _info = info as {
                                            rolls: number;
                                        };

                                        const calculateRent = _info.rolls;
                                        localPlayer.properties.push({
                                            posistion: localPlayer.position,
                                            count: 0,
                                            rent: calculateRent,
                                            group:
                                                propretyMap.get(
                                                    localPlayer.position
                                                )?.group ?? "",
                                        });
                                    }

                                    setTimeout(() => {
                                        SetClients(
                                            new Map(
                                                clients.set(
                                                    socket.id,
                                                    localPlayer
                                                )
                                            )
                                        );
                                        engineRef.current?.freeDice();
                                        const json = (
                                            clients.get(socket.id) as Player
                                        ).toJson();
                                        socket.emit("finish-turn", json);
                                    }, time_till_free);
                                },
                            });
                        }
                    }
                },
            });

            if (xplayer.isInJail) {
                setTimeout(() => {
                    if (args.listOfNums[0] == args.listOfNums[1]) {
                        xplayer.isInJail = false;
                        setTimeout(() => {
                            dice_generatorResults.func();
                        }, 2000);
                    } else if (xplayer.jailTurnsRemaining > 0) {
                        xplayer.jailTurnsRemaining -= 1;
                        if (xplayer.jailTurnsRemaining === 0) {
                            xplayer.isInJail = false;
                        }
                    }
                    SetClients(new Map(clients.set(args.turnId, xplayer)));
                }, 1500);
            } else {
                setTimeout(() => {
                    dice_generatorResults.func();
                }, 2000);
            }
        };
        const socket_Unjail = (args: {
            to: string;
            option: "card" | "pay";
        }) => {
            const x = clients.get(args.to);
            if (x) {
                if (args.option === "card") {
                    x.getoutCards -= 1;
                } else {
                    x.balance -= 50;
                    if (
                        x.id === socket.id &&
                        settings !== undefined &&
                        settings.notifications === true
                    )
                        notifyRef.current?.message(
                            `${50} of money is deducted from the account`,
                            "info",
                            2,
                            () => {},
                            false
                        );
                    var audio = new Audio("./moneyminus.mp3");
                    audio.volume =
                        ((settings?.audio[1] ?? 100) / 100) *
                        ((settings?.audio[0] ?? 100) / 100);
                    audio.loop = false;
                    audio.play();
                }
                x.isInJail = false;
                x.jailTurnsRemaining = 0;
                SetClients(new Map(clients.set(args.to, x)));
            }
        };
        const socket_MemberUpdating = (args: {
            playerId: string;
            animation: "recieveMoney";
            additional_props: any[];
            pJson: [PlayerJSON, PlayerJSON];
        }) => {
            for (const x of args.pJson) {
                const p = clients.get(x.id);
                p?.recieveJson(x);
            }

            if (socket.id === args.playerId) {
                engineRef.current?.applyAnimation(2);
            }
        };
        const socket_ChorchResult = (args: {
            element: {
                title: string;
                action: string;
                tileid: string;
                groupid?: undefined;
                rentmultiplier?: undefined;
                amount?: undefined;
                subaction?: undefined;
                count?: undefined;
                buildings?: undefined;
                hotels?: undefined;
            };
            is_chance: boolean;
            turnId: string;
        }) => {
            const numOfTime = 3000;
            engineRef.current?.chorch(args.element, args.is_chance, numOfTime);

            setTimeout(() => {
                const c = args.element;
                const xplayer = clients.get(args.turnId);
                if (xplayer === undefined) return;
                function addBalanceToOthers(amnout: number) {
                    if (xplayer === undefined) return 0;

                    const other_players = Array.from(clients.values()).filter(
                        (v) => v.id !== xplayer.id
                    );
                    for (const p of other_players) {
                        p.balance += amnout;
                        if (
                            p.id === socket.id &&
                            settings !== undefined &&
                            settings.notifications === true
                        ) {
                            notifyRef.current?.message(
                                `${amnout} of money is added to the account`,
                                "info",
                                2,
                                () => {},
                                false
                            );
                            var audio = new Audio("./moneyplus.mp3");
                            audio.volume =
                                ((settings?.audio[1] ?? 100) / 100) *
                                ((settings?.audio[0] ?? 100) / 100);
                            audio.loop = false;
                            audio.play();
                        }
                        SetClients(new Map(clients.set(p.id, p)));

                        if (xplayer.id === socket.id) {
                            if (amnout > 0) {
                                socket.emit("pay", {
                                    balance: amnout,
                                    from: socket.id,
                                    to: xplayer.id,
                                });
                            } else {
                                socket.emit("pay", {
                                    balance: amnout,
                                    from: xplayer.id,
                                    to: socket.id,
                                });
                            }
                        }
                    }
                    return other_players.length;
                }

                var time_till_finish = 0;
                switch (c.action) {
                    case "move":
                        if (c.tileid) {
                            const p = new Map(
                                monopolyJSON.properties.map((obj) => {
                                    return [obj.id, obj];
                                })
                            );
                            const targetPos = p.get(c.tileid)?.posistion;
                            if (targetPos === undefined) break;

                            const _generatorResults = playerMoveGENERATOR(
                                targetPos,
                                xplayer
                            );
                            time_till_finish = _generatorResults.time;
                            _generatorResults.func();
                        } else if (c.count) {
                            const _generatorResults = playerMoveGENERATOR(
                                (xplayer.position + c.count) % 40,
                                xplayer,
                                true,
                                () => {},
                                c.count >= 0
                            );
                            time_till_finish = _generatorResults.time;
                            _generatorResults.func();
                        }
                        break;

                    case "addfunds":
                        xplayer.balance += c.amount ?? 0;
                        if (xplayer.id === socket.id) {
                            if (
                                settings !== undefined &&
                                settings.notifications === true
                            )
                                notifyRef.current?.message(
                                    `${
                                        c.amount ?? 0
                                    } of money is added to the account`,
                                    "info",
                                    2,
                                    () => {},
                                    false
                                );
                            var audio = new Audio("./moneyplus.mp3");
                            audio.volume =
                                ((settings?.audio[1] ?? 100) / 100) *
                                ((settings?.audio[0] ?? 100) / 100);
                            audio.loop = false;
                            audio.play();
                            engineRef.current?.applyAnimation(2);
                        }
                        break;
                    case "jail":
                        if (c.subaction !== undefined) {
                            switch (c.subaction) {
                                case "getout":
                                    xplayer.getoutCards += 1;
                                    break;
                                case "goto":
                                    const _generatorResults =
                                        playerMoveGENERATOR(
                                            10,
                                            xplayer,
                                            false,
                                            () => {
                                                xplayer.position = 10;
                                                xplayer.isInJail = true;
                                                var audio = new Audio(
                                                    "./jail.mp3"
                                                );
                                                audio.volume =
                                                    0.5 *
                                                    ((settings?.audio[1] ??
                                                        100) /
                                                        100) *
                                                    ((settings?.audio[0] ??
                                                        100) /
                                                        100);
                                                audio.loop = false;
                                                audio.play();
                                                xplayer.jailTurnsRemaining = 3;
                                            }
                                        );
                                    time_till_finish = _generatorResults.time;
                                    _generatorResults.func();
                                    break;
                            }
                            SetClients(
                                new Map(clients.set(xplayer.id, xplayer))
                            );
                        }
                        break;

                    case "removefunds":
                        xplayer.balance -= c.amount ?? 0;
                        if (xplayer.id === socket.id) {
                            engineRef.current?.applyAnimation(1);
                            if (
                                settings !== undefined &&
                                settings.notifications === true
                            )
                                notifyRef.current?.message(
                                    `${
                                        c.amount ?? 0
                                    } of money is deducted from the account`,
                                    "info",
                                    2,
                                    () => {},
                                    false
                                );
                            var audio = new Audio("./moneyminus.mp3");
                            audio.volume =
                                ((settings?.audio[1] ?? 100) / 100) *
                                ((settings?.audio[0] ?? 100) / 100);
                            audio.loop = false;
                            audio.play();
                        }
                        break;
                    // amount
                    case "removefundstoplayers":
                        addBalanceToOthers(c.amount ?? 0);
                        // xplayer.balance -= (c.amount ?? 0) * l;
                        if (xplayer.id === socket.id)
                            engineRef.current?.applyAnimation(1);
                        break;

                    case "addfundsfromplayers":
                        addBalanceToOthers(-(c.amount ?? 0));
                        // xplayer.balance += (c.amount ?? 0) * l;
                        // if (xplayer.id === socket.id)
                        //     engineRef.current?.applyAnimation(2);
                        break;

                    case "movenearest":
                        if (!c.groupid) return;

                        function findNextValue(arr: number[], X: number) {
                            // Sort the array in ascending order
                            arr.sort((a, b) => a - b);

                            // Loop through the array to find the next value
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] > X) {
                                    return arr[i];
                                }
                            }

                            // If no value greater than X is found, return the first element (wrap around)
                            return arr[0];
                        }

                        var p = "";

                        if (c.groupid === "utility") {
                            p = "Utilities";
                        } else {
                            p = "Railroad";
                        }
                        const arr = monopolyJSON.properties
                            .filter((v) => v.group === p)
                            .map((v) => v.posistion);
                        const ongoingLocation = findNextValue(
                            arr,
                            xplayer.position
                        );
                        const _generatorResults = playerMoveGENERATOR(
                            ongoingLocation,
                            xplayer
                        );
                        time_till_finish = _generatorResults.time;
                        _generatorResults.func();
                        break;

                    case "propertycharges":
                    // TODO: Later!
                    default:
                        break;
                }

                setTimeout(() => {
                    SetClients(new Map(clients.set(xplayer.id, xplayer)));
                    if (xplayer.id === socket.id) {
                        engineRef.current?.freeDice();
                        socket.emit(
                            "finish-turn",
                            (clients.get(socket.id) as Player).toJson()
                        );
                    }
                }, time_till_finish);
            }, numOfTime);
        };
        function socket_Mouse(args: { id: string; x: number; y: number }) {
            const xplayer = clients.get(args.id);
            if (xplayer === undefined) return;
            xplayer.positions = { x: args.x, y: args.y };
            clients.set(args.id, xplayer);
        }
        function socket_networkDisconnect() {
            mainTheme.pause();
            notifyRef.current?.dialog(
                (close_func, createButton) => ({
                    innerHTML: `<h3> LOST CONNECTION </h3> <p> you were disconnected from the game </p>`,
                    buttons: [
                        createButton("PLAY ANOTHER GAME", () => {
                            close_func();
                            document.location.reload();
                        }),
                    ],
                }),
                "loosing"
            );
        }
        document.addEventListener("mousemove", mouseMove);
        socket.on("initials", socket_Initials);
        socket.on("new-player", socket_NewPlayer);
        socket.on("ready", socket_Ready);
        socket.on("start-game", socket_StartGame);
        socket.on("disconnected-player", socket_DisconnectedPlayer);
        socket.on("turn-finished", socket_TurnFinished);
        socket.on("message", socket_Message);
        socket.on("dice_roll_result", socket_DiceRollResult);
        socket.on("unjail", socket_Unjail);
        socket.on("member_updating", socket_MemberUpdating);
        socket.on("chorch_result", socket_ChorchResult);
        socket.on("mouse", socket_Mouse);
        socket.on("disconnect", socket_networkDisconnect);
        var to_emit_name = true;
        //#endregion
        if (to_emit_name) socket.emit("name", name);

        return () => {
            to_emit_name = false;
            clearInterval(settings_interval);
            document.removeEventListener("mousemove", mouseMove);
            // socket.off("initials", socket_Initials);
            // socket.off("new-player", socket_NewPlayer);
            // socket.off("ready", socket_Ready);
            // socket.off("start-game", socket_StartGame);
            // socket.off("disconnected-player", socket_DisconnectedPlayer);
            // socket.off("turn-finished", socket_TurnFinished);
            // socket.off("message", socket_Message);
            // socket.off("dice_roll_result", socket_DiceRollResult);
            // socket.off("unjail", socket_Unjail);
            // socket.off("member_updating", socket_MemberUpdating);
            // socket.off("chorch_result", socket_ChorchResult);
            // socket.off("mouse", socket_Mouse);
            // socket.off("disconnect", socket_networkDisconnect);
        };
    }, []);

    useEffect(() => {
        navRef.current?.reRenderPlayerList();
    }, [clients]);

    return gameStarted ? (
        <>
            {globalSettings !== undefined && globalSettings.accessibility[3] ? (
                <div className="cursors">
                    {Array.from(clients.values())
                        .filter((v) => v.id !== socket.id)
                        .map((v, i) => {
                            return (
                                <img
                                    src="./cursor.png"
                                    style={{
                                        translate: `${v.positions.x}px ${v.positions.y}px`,
                                    }}
                                    key={i}
                                    className="cursor"
                                />
                            );
                        })}
                </div>
            ) : (
                <></>
            )}
            <main>
                <MonopolyNav
                    currentTurn={currentId}
                    ref={navRef}
                    name={name}
                    socket={socket}
                    players={players}
                    server={server}
                    callServer={() => {
                        const root = document.body.querySelector(
                            "#root"
                        ) as HTMLDivElement;

                        root.style.transform = "translateX(100%)";
                    }}
                />

                <MonopolyGame
                    clickedOnBoard={(a) => {
                        navRef.current?.clickedOnBoard(a);
                    }}
                    ref={engineRef}
                    socket={socket}
                    players={Array.from(clients.values())}
                    myTurn={currentId === socket.id}
                />
            </main>
            <NotifyElement ref={notifyRef} />
            <div id="server">
                <main>
                    <div
                        className="upper"
                        onClick={() => {
                            const root = document.body.querySelector(
                                "#root"
                            ) as HTMLDivElement;

                            root.style.transform = "";
                        }}
                    >
                        Server.exe
                    </div>
                    <div className="middle"></div>
                    <div className="lower">
                        <input type="text" />
                    </div>
                </main>
                <footer
                    onClick={() => {
                        const root = document.body.querySelector(
                            "#root"
                        ) as HTMLDivElement;

                        root.style.transform = "";
                    }}
                >
                    <img src="icon.png" alt="" />
                </footer>
            </div>
        </>
    ) : (
        <div className="lobby">
            <h3>Hello there {name}</h3>
            the players that are currently in the lobby are
            <div>
                {Array.from(clients.values()).map((v, i) => {
                    return (
                        <p
                            style={
                                v.ready ? { backgroundColor: "#32a852" } : {}
                            }
                            className="lobby-players"
                            key={i}
                        >
                            {v.username}
                        </p>
                    );
                })}
            </div>
            <br />
            choose the game mode that you desire
            <div className="modes">
                {(["Monopoly", "Ronopoly"] as Array<string>).map((v, k) => {
                    return (
                        <p
                            data-select={k === selectedMode}
                            key={k}
                            onClick={() => {
                                socket.emit("ready", { mode: k });
                            }}
                        >
                            {v}
                        </p>
                    );
                })}
            </div>
            <center>
                <button
                    onClick={() => {
                        socket.emit("ready", { ready: !imReady });
                        SetReady(!imReady);
                    }}
                >
                    {!imReady ? "Ready" : "Not Ready"}
                </button>
            </center>
        </div>
    );
}

export default App;
