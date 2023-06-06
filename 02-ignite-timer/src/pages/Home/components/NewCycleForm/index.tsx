import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "../../styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        },

    });

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
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>Minutos</span>
        </FormContainer>
    )
}