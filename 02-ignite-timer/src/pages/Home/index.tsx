import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import {
    HomeContainer,
    StartCountDownButton,
    StopCountDownButton
} from './styles'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod';


interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    fineshedDate?: Date,
}

interface CycleContextType {
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    markCurentCycleAsFinished: () => void,
    amountSecondsPassed: number,
    setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
});

export const CyclesContext = createContext({} as CycleContextType)

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);


    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        },

    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurentCycleAsFinished() {
        setCycles((state) =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, fineshedDate: new Date() };
                } else {
                    return cycle;
                }
            }));
    }

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()

        };

        setCycles(state => [...state, newCycle]);

        setActiveCycleId(id);

        setAmountSecondsPassed(0)

        reset();
    }

    function handleInterruptCycle() {
        setCycles(state =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() };
                } else {
                    return cycle;
                }
            }));

        setActiveCycleId(null);
    }

    const task = watch('task');
    const isSubmitDisabled = !task;


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <CyclesContext.Provider value={{
                    activeCycle,
                    activeCycleId,
                    markCurentCycleAsFinished,
                    amountSecondsPassed,
                    setSecondsPassed
                }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>

                    <Countdown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountDownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}
