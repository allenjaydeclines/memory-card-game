import React, { useEffect, useState } from "react";
import { GameDisplay } from "./GameDisplay";
import arrayShuffle from "array-shuffle";
import matchSound from "../sounds/match-sound.mp3";
import noMatchSound from "../sounds/no-match-sound.mp3";
import resetSound from "../sounds/reset-sound.mp3";
import useSound from "use-sound";

const types = [
    '👌',
    '💕',
    '😁',
    '😊',
    '🤣',
    '😂',
    '😘',
    '✅',
]


const getGameData = () => {
    const gameData = [];
    const typesForGameData = [...types, ...types];
    let shuffledTypes = arrayShuffle(typesForGameData);

    shuffledTypes.forEach((type, index) => {
        gameData.push({
            type,
            id: index,
            open: false,
            remove: false
        })
    })

    return gameData;
}


export const GameContainer = () => {

    const [cards, setCards] = useState(getGameData());
    const [inPlay, setInplay] = useState([]);
    const [isMatching, setIsMatching] = useState(false);
    const [scores, setScores] = useState(0);
    const [moves, setMoves] = useState(0);
    const [playMatchSound] = useSound(matchSound);
    const [playNoMatchSound] = useSound(noMatchSound);
    const [playResetSound] = useSound(resetSound)

    const resetGame = () => {
        
        playResetSound();
        console.log("reset game!");
        if (window.confirm("Are you sure about that?")) {
            setCards(getGameData());
            setMoves(0);
            setScores(0);
        }
    };

    const flippedCards = (id) => () => {
        if (!isMatching) {
            const updatedCards = [...cards];
            const updateInPlay = [...inPlay];
            updatedCards.forEach(card => {
                if (card.id === id) {
                    card.open = true;
                    updateInPlay.push(card.type)
                    setInplay(updateInPlay);
                }
            })
            setCards(updatedCards);
        }
    }

    useEffect(() => {
        if (inPlay.length === 2 && !isMatching) {
            setIsMatching(true);
            const updatedCards = [...cards];
            if (inPlay[0] === inPlay[1]) {
                updatedCards.forEach(card => {
                    if (card.type === inPlay[0])
                    card.remove = true;
                })
                setScores(scores + 1);
                playMatchSound();
                setCards(updatedCards);
                setIsMatching(false)
                setInplay([]);
            } else {
                setTimeout(() => {
                    updatedCards.forEach(card => {
                    if (card.type === inPlay[0] || card.type === inPlay[1])
                        card.open = false;
                    })
                    setMoves(moves + 1);
                    playNoMatchSound();
                    setCards(updatedCards);
                    setIsMatching(false)
                    setInplay([]);
                }, 1000)
            }
        }
        
    }, [inPlay, isMatching, cards, scores, playMatchSound, moves, playNoMatchSound]);

    return (
        <GameDisplay cards={cards} onClick={flippedCards} scores={scores} moves={moves} resetGame={resetGame}/>
    )
}