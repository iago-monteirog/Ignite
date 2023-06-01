import { Play } from 'phosphor-react'
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from './styles'

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        type="text"
                        id="task"
                        placeholder='De um nome para seu projeto'
                        list="task-suggestions"
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
                    />

                    <span>Minutos</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>

                    <Separator>:</Separator>

                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton disabled type="submit">
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}