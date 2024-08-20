import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';

void main() => runApp(const TapTheCircleGame());

class TapTheCircleGame extends StatelessWidget {
  const TapTheCircleGame({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: GameScreen(),
    );
  }
}

class GameScreen extends StatefulWidget {
  const GameScreen({super.key});

  @override
  _GameScreenState createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  int score = 0;
  int lives = 3;
  double xPosition = 0.0;
  double yPosition = 0.0;
  Random random = Random();
  bool circleVisible = true;
  Timer? circleTimer;

  @override
  void didChangeDependencies() {
    _startNewCircle();
    super.didChangeDependencies();
  }

  void _moveCircle() {
    if (lives <= 0) return; // Prevent playing if game over

    setState(() {
      score++;
      _startNewCircle();
    });
  }

  void _startNewCircle() {
    circleTimer?.cancel(); // Cancel any existing timer
    setState(() {
      xPosition =
          random.nextDouble() * (MediaQuery.of(context).size.width - 50);
      yPosition = random.nextDouble() *
          (MediaQuery.of(context).size.height -
              150); // Leave some space for score
      circleVisible = true;
    });

    // Start a timer for 1 second
    circleTimer = Timer(const Duration(seconds: 1), () {
      if (circleVisible) {
        _missedCircle();
      }
    });
  }

  void _missedCircle() {
    setState(() {
      lives--;
      if (lives > 0) {
        _startNewCircle();
      } else {
        circleVisible = false; // Hide circle when game over
        _showGameOverDialog();
      }
    });
  }

  void _showGameOverDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Game Over"),
        content: Text("You missed 3 circles. Your final score is $score."),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _resetGame();
            },
            child: const Text("Play Again"),
          ),
        ],
      ),
    );
  }

  void _resetGame() {
    setState(() {
      score = 0;
      lives = 3;
      _startNewCircle();
    });
  }

  @override
  void dispose() {
    circleTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Tap the Circle Game"),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          // Circle
          if (circleVisible)
            Positioned(
              left: xPosition,
              top: yPosition,
              child: GestureDetector(
                onTap: () {
                  _moveCircle();
                },
                child: Container(
                  width: 50,
                  height: 50,
                  decoration: const BoxDecoration(
                    color: Colors.blue,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ),
          // Score and Lives
          Positioned(
            top: 20,
            right: 20,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  'Score: $score',
                  style: const TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold),
                ),
                Text(
                  'Lives: $lives',
                  style: const TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
