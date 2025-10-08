import { useState } from "react";
import { Chess } from "chess.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ChessPuzzle = () => {
  // Extremely difficult mate in 2: White to move and mate in 2
  // Position: Famous composition - Solution: 1. Qg6+! and mate next move
  const puzzlePosition = "r5rk/5p1p/5R2/4B3/8/8/7P/7K w - - 0 1";
  
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

  const makeBlackMove = (currentGame: Chess) => {
    // Get all legal moves for Black
    const moves = currentGame.moves({ verbose: true });
    if (moves.length === 0) return;

    // Black makes the best defensive move (or forced move if in check)
    const move = moves[0]; // In mate in 2, Black's move is often forced
    currentGame.move(move);
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
          // Check if this is the first move and validate it's the correct one
          if (moveCount === 0) {
            // The only correct first move is Ra6+ (rook from f6 to a6)
            if (move.from !== 'f6' || move.to !== 'a6') {
              toast.error("Wrong move! Try again.", {
                description: "Only one move leads to mate in 2. Look for a forcing rook check!",
              });
              setSelectedSquare(null);
              
              // Reset the position after wrong move
              setTimeout(() => {
                const resetGame = new Chess(puzzlePosition);
                setGame(resetGame);
                setMoveCount(0);
              }, 1500);
              return;
            }
          }

          setMoveCount(moveCount + 1);
          setSelectedSquare(null);

          if (gameCopy.isCheckmate()) {
            setPuzzleSolved(true);
            toast.success("🎉 Puzzle solved! Checkmate!", {
              description: "Excellent tactical vision!",
            });
            setGame(gameCopy);
          } else if (gameCopy.isCheck()) {
            toast.success("Good move! You're on the right track.", {
              description: "Black will now respond...",
            });
            setGame(gameCopy);
            
            // Black responds automatically after a short delay
            setTimeout(() => {
              const newGame = new Chess(gameCopy.fen());
              makeBlackMove(newGame);
              
              if (newGame.isCheckmate()) {
                // White should be able to deliver checkmate now
                toast.info("Now find the checkmate move!");
              }
              
              setGame(newGame);
            }, 500);
          } else {
            // Wrong move (shouldn't reach here for first move due to check above)
            toast.error("Not quite right. Try again!", {
              description: "Look for a forcing check first.",
            });
            setGame(gameCopy);
            
            // Reset the position after wrong move
            setTimeout(() => {
              const resetGame = new Chess(puzzlePosition);
              setGame(resetGame);
              setMoveCount(0);
            }, 1500);
          }
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
              aspect-square flex items-center justify-center text-4xl transition-all leading-none select-none
              ${isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}
              ${isSelected ? 'ring-4 ring-primary ring-inset' : ''}
              ${piece && piece.color === game.turn() ? 'hover:opacity-80 cursor-pointer' : ''}
              ${!piece && selectedSquare ? 'hover:bg-primary/20' : ''}
            `}
            style={{
              color: piece?.color === 'w' ? '#ffffff' : '#000000',
              fontFamily: `'Segoe UI Symbol','DejaVu Sans','Symbola','Noto Sans Symbols2','Arial Unicode MS','serif'`,
              textShadow: piece?.color === 'w'
                ? '1px 1px 2px rgba(0,0,0,0.7)'
                : 'none'
            }}
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
    toast.info("Hint: Play Rf8+ to force Black's response, then deliver mate with your bishop!");
  };

  return (
    <section id="chess-puzzle" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Chess Puzzle Challenge</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            White to move, mate in two!
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
                      <span className="font-medium">Hard</span>
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
                        Start with a forcing check using your rook. After Black's forced response, you can deliver checkmate with your bishop!
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
