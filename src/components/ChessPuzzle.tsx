import { useState } from "react";
import { Chess } from "chess.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ChessPuzzle = () => {
  // Extremely difficult mate in 2: White to move and mate in 2
  const puzzlePosition = "3rr1k1/pp3ppp/2p5/2P5/4P3/1P3P2/P5PP/3RR1K1 w - - 0 1";
  
  const [game, setGame] = useState(new Chess(puzzlePosition));
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const resetPuzzle = () => {
    const newGame = new Chess(puzzlePosition);
    setGame(newGame);
    setSelectedSquare(null);
    setMoveCount(0);
    setPuzzleSolved(false);
    setShowHint(false);
    toast.info("Puzzle reset! Find the winning continuation.");
  };

  const handleSquareClick = (square: string) => {
    if (puzzleSolved) return;

    const piece = game.get(square as any);
    
    if (selectedSquare === null) {
      // Select a piece
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
    } else {
      // Try to make a move
      if (selectedSquare === square) {
        setSelectedSquare(null);
        return;
      }

      const gameCopy = new Chess(game.fen());
      
      try {
        const move = gameCopy.move({
          from: selectedSquare,
          to: square,
          promotion: "q",
        });

        if (move) {
          setMoveCount(moveCount + 1);
          setSelectedSquare(null);

          if (gameCopy.isCheckmate()) {
            setPuzzleSolved(true);
            toast.success("🎉 Puzzle solved! Checkmate!", {
              description: "Excellent tactical vision!",
            });
          } else if (gameCopy.isCheck()) {
            toast.success("Good move! You're on the right track.", {
              description: "Continue to find the mate!",
            });
          }

          setGame(gameCopy);
        } else {
          setSelectedSquare(null);
        }
      } catch {
        setSelectedSquare(null);
      }
    }
  };

  const getPieceSymbol = (piece: any) => {
    if (!piece) return "";
    
    const symbols: Record<string, string> = {
      'p': piece.color === 'w' ? '♙' : '♟',
      'n': piece.color === 'w' ? '♘' : '♞',
      'b': piece.color === 'w' ? '♗' : '♝',
      'r': piece.color === 'w' ? '♖' : '♜',
      'q': piece.color === 'w' ? '♕' : '♛',
      'k': piece.color === 'w' ? '♔' : '♚',
    };
    
    return symbols[piece.type] || "";
  };

  const renderBoard = () => {
    const squares = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    for (let rank of ranks) {
      for (let file of files) {
        const square = file + rank;
        const piece = game.get(square as any);
        const isLight = (files.indexOf(file) + parseInt(rank)) % 2 === 0;
        const isSelected = selectedSquare === square;

        squares.push(
          <button
            key={square}
            onClick={() => handleSquareClick(square)}
            className={`
              aspect-square flex items-center justify-center text-4xl transition-all
              ${isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}
              ${isSelected ? 'ring-4 ring-primary ring-inset' : ''}
              ${piece && piece.color === game.turn() ? 'hover:opacity-80 cursor-pointer' : ''}
              ${!piece && selectedSquare ? 'hover:bg-primary/20' : ''}
            `}
            disabled={puzzleSolved}
          >
            {getPieceSymbol(piece)}
          </button>
        );
      }
    }

    return squares;
  };

  const giveHint = () => {
    setShowHint(true);
    toast.info("Hint: Look for a forcing exchange on the d-file that leaves Black with no defense!");
  };

  return (
    <section id="chess-puzzle" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Chess Puzzle Challenge</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An extremely difficult puzzle: White to move and mate in 2. Only the sharpest minds will solve this!
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-4">
                <div className="relative max-w-[500px] mx-auto w-full">
                  <div className="grid grid-cols-8 border-4 border-foreground/20 rounded-lg overflow-hidden shadow-xl">
                    {renderBoard()}
                  </div>
                  {puzzleSolved && (
                    <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <div className="bg-background p-6 rounded-lg shadow-xl text-center">
                        <Trophy className="h-12 w-12 text-primary mx-auto mb-2" />
                        <p className="text-xl font-bold">Puzzle Solved!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Puzzle Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="font-medium text-destructive">Extremely Difficult</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Theme:</span>
                      <span className="font-medium">Mate in 2</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Moves made:</span>
                      <span className="font-medium">{moveCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Turn:</span>
                      <span className="font-medium">{game.turn() === 'w' ? 'White' : 'Black'}</span>
                    </div>
                    {game.isCheck() && !puzzleSolved && (
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium">King in check!</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {puzzleSolved
                      ? "Congratulations! You've demonstrated excellent tactical awareness."
                      : "Click a piece to select it, then click the destination square to move it. Look for forcing moves!"}
                  </p>
                  {showHint && !puzzleSolved && (
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <p className="font-medium mb-1">Hint:</p>
                      <p className="text-muted-foreground">
                        The key is a rook sacrifice on d8! After the forced recapture, checkmate follows immediately.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={resetPuzzle}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Puzzle
                  </Button>
                  {!puzzleSolved && !showHint && (
                    <Button
                      onClick={giveHint}
                      variant="secondary"
                      className="flex-1"
                    >
                      Show Hint
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ChessPuzzle;
