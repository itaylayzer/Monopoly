# 🎲 Monopoly 🎲 - A Multiplayer React.js and Peer.js Game

[3.9.23] Taking A Break so i disabled firebase [accounts and so on, system that are not completed]

Welcome to my Monopoly, a thrilling online multiplayer game developed using React.js, Express.js, and TypeScript. This exciting rendition of the classic Monopoly game incorporates some intriguing rule changes. this Monopoly can only be played in multiplayer mode.

### Features

Monopoly boasts an array of fantastic features to enhance your gaming journey. The game includes a user-friendly dialog box that keeps you informed about important events and announcements, along with a robust notification system to ensure you never miss a crucial update. Engage in lively conversations with other players through the integrated chat feature, fostering a sense of community and fun.

the player navigation panel enables you to view the status of other players in the game, providing valuable insights into their progress and strategies. Similarly, the property navigation system allows you to manage and monitor your properties and even search for details about others.

### Gameplay and UI

Immerse yourself in an interactive gaming experience through the game UI. By clicking on the streets on the virtual board, you can access detailed cards for each property, helping you make informed decisions during gameplay. The roll UI enables smooth and engaging dice rolling, adding excitement to each turn. With the card UI system, you can view the cards for each street, gaining a comprehensive understanding of the game's dynamics.

Participate in the property-buying process through the intuitive buy-in UI and system, making strategic investments to grow your wealth and secure your victory. The game mechanics are designed to be straightforward, ensuring a user-friendly experience for players of all levels.

## How to run the project

theres `src/config.ts` file that is hidden (inside .gitignore file), that his structure is:

```ts
export default {
	CODE_PREFIX: <string> // required,
	PEER_SERVER_HOST: <string?>, // optional
	PEER_SERVER_PORT: <number?>, // optional, default 443
	PEER_SECURE: <boolean?>, // optional, default false
	PEER_DEBUG_LEVEL: <number?>, // optional, default 0
};
```

## Credits

credit for danielstern for the monopoly.json file which i modified
https://github.com/danielstern/science/blob/master/monopoly.json

### Pascol Credits

Main Theme : https://youtu.be/NaH_BiPeZ80

#### Sound Effects:

-   Rolling Dice: https://youtu.be/rVjCSaXhZTs
-   Buying: https://youtu.be/IVjC5fTeubA
-   Dying: https://youtu.be/_asNhzXq72w
-   Winning: https://youtu.be/K0ZNtpTYKpI
-   Notification: https://youtu.be/84frnbTWGis
-   Walking: https://youtu.be/7skwR49UhqA
-   Jail: https://youtu.be/h2CTMrzxe24
-   Money: https://www.epidemicsound.com/track/oKEES3Rkmk/
-   Swipe: https://youtu.be/4-lY0NT-bJs
-   Clicking: https://youtu.be/3c-yEJYQcgM

Soundtrakcs Where edited using Adobe Audition

## Legal Disclaimer

As the developer of this Monopoly game project, it is essential to clarify the following legal aspects:

1. Game Mechanics and Rules: The game mechanics and rules of Monopoly have been widely known and played for many years. This project aims to offer a digital rendition of the classic Monopoly experience, utilizing original concepts that have become common knowledge.

2. Original Monopoly Intellectual Property: The Monopoly board game is a registered trademark and copyrighted property of Hasbro Inc. and its respective licensors. This project is not an official representation or product of Hasbro Inc., and no direct affiliation or endorsement is implied.

3. License and Usage: This Monopoly game project is developed with the intent of being an educational and personal project. It is offered as a free-to-use, open-source initiative for learning purposes, and no commercial use or distribution is intended.

4. Fair Use and Transformative Work: This project may fall under the category of "fair use" as it is a transformative work that provides a unique digital experience based on the original Monopoly game. It is not intended to compete with or harm the commercial interests of the original trademark owner.

5. No Warranty or Liability: While efforts have been made to create an enjoyable and bug-free experience, this project is provided as-is without any warranty. The developer shall not be liable for any issues or damages arising from the use of this software.

6. Attribution: This project may include third-party libraries or assets that are appropriately credited and licensed under their respective terms. Any attributions and licenses should be preserved as required by the respective authors.

7. Personal Responsibility: As the developer, you are responsible for complying with all applicable laws, including intellectual property laws, and ensuring that your usage of this project is within legal boundaries.

## TODO List:

1. Bots System [trying to achive that with Tensorflow.js]
2. Advanced Server Display [Event Logs, Player Statistics, Memory and Network Use]
3. Advanced Game Mode - Economic System & Rebuy Street from Owner
4. Firestore Usage:
    1. Score System
    2. Players LeaderBoard
    3. Search for Player Statistics
5. Responsive UI:
    1. Mobile Design
    2. 3D Game Version

## Pictures and Videos of the game!

for more pictures https://itaylayzer.github.io/Monopoly/gallery
![picture of the monopoly game](https://cdn.discordapp.com/attachments/1005211638191890532/1133681326793433138/7.PNG)

## Features

### Keys

1. [1-9]: Nav Tabs
2. Mouse Wheel: Rotate the Board
3. Mouse Wheel + Shift: Scale the Board
