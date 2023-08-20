import * as Dialog from '@radix-ui/react-dialog';
import * as S from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        control
    } = useForm<NewTransactionsFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    });

    async function handleCreateNewTransaction(data: NewTransactionsFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(data);
    }
    return (
        <Dialog.Portal>
            <S.Overlay />

            <S.Content>
                <S.CloseButton>
                    <X size={24} />
                </S.CloseButton>
                <Dialog.Title>Nova transação</Dialog.Title>
                <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder='Descrição'
                        required
                        {...register('description')}
                    />
                    <input
                        type="text"
                        placeholder='Preço'
                        required
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder='Categoria'
                        required
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name='type'
                        render={({ field }) => {
                            return (
                                <S.TransactionType
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <S.TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </S.TransactionTypeButton>
                                    <S.TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </S.TransactionTypeButton>
                                </S.TransactionType>
                            )
                        }}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </S.Content>
        </Dialog.Portal>
    );
}