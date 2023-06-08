import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "../../styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

export function Countdown() {
    const {
        activeCycle,
        activeCycleId,
        markCurentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed
    } = useContext(CyclesContext);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle]);

    useEffect(() => {
        let interval: number;
        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

                if (secondsDifference >= totalSeconds) {
                    markCurentCycleAsFinished();
                    setSecondsPassed(totalSeconds);

                    clearInterval(interval);
                } else {
                    setSecondsPassed(secondsDifference);
                }

            }, 1000)
        }

        // função para remover o ciclo anterior que estava em execução. Basicamente
        // é uma função para resetar o "useEffect" que foi executado anteriormente.
        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleId, markCurentCycleAsFinished, setSecondsPassed])

    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>

            <Separator>:</Separator>

            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}