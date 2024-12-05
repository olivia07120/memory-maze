# Memory Maze Game

Memory Maze is an interactive React-based game that challenges players' memory and observation skills. The game leverages DevCycle SDK and OpenFeature provider for feature flagging and dynamic content delivery, allowing for a customizable and evolving gaming experience.

Website live at: https://olivia07120.github.io/memory-maze/

## Features

- Multiple themed levels with increasing difficulty
- Dynamic content based on feature flags
- Animated questions for enhanced difficulty
- Score tracking and level progression
- Dark/Light theme toggle
- Responsive design for various screen sizes

## Technologies Used

- React: A JavaScript library for building user interfaces
- DevCycle SDK: For feature flag management
- OpenFeature provider: For standardized feature flagging
- CSS Animations: For enhanced visual effects

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/olivia07120/memory-maze.git
   ```

2. Navigate to the project directory:
   ```
   cd memory-maze
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your DevCycle account and obtain your client key

5. Create a `config.js` file in the `src` directory with your DevCycle client key:
   ```javascript
   const config = {
     DEVCYCLE_CLIENT_KEY: 'your_client_key_here'
   };
   
   export default config;
   ```

6. Start the development server:
   ```
   npm start
   ```

## Game Rules

1. Start the game by clicking "Start Your Adventure!"
2. Observe the displayed image or animated scene carefully
3. Answer the multiple-choice question about what you observed
4. Progress through levels by answering correctly
5. The game ends when you complete all levels or answer incorrectly

## Feature Flags

The game utilizes the following feature flags:

- `dark-theme`: Toggles between dark and light theme
- `game-theme`: Sets the current game theme (e.g., 'autumnHarvest', 'halloween', etc.)
- `difficulty-hard`: Enables animated questions for increased difficulty

## Project Structure

- `src/App.js`: Main component handling game logic and state
- `src/RoomDisplay.js`: Component for displaying room contents
- `src/AnimatedQuestion.js`: Component for rendering animated questions
- `src/utils/themeUtils.js`: Utility functions for theme management
- `src/questions/`: Directory containing question sets for different themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- DevCycle for providing feature flagging capabilities
- OpenFeature for standardized feature management
- React community for excellent documentation and support
