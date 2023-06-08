import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "../../styles";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from 'react-hook-form';


export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                id="task"
                placeholder='De um nome para seu projeto'
                list="task-suggestions"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="projeto 1" />
                <option value="projeto 2" />
                <option value="projeto 3" />
                <option value="projeto 4" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder='00'
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>Minutos</span>
        </FormContainer>
    )
}