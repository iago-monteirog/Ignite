import { MagnifyingGlass } from 'phosphor-react';
import * as S from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';
// import { memo } from 'react';

/**
 * Por que um componente renderiza?
 * 
 * - Hooks changed (mudou, estado, context, reducer);
 * - Props changed (mudou propriedades);
 * - Parent rerendered (componente pai renderizou);
 * 
 * Qual o fluxo de renderização?
 * 1. O react recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela
 * 
 * Fluxo com o Memo:
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1 Comparar a versão anterior dos hooks e props
 * 0.2 Se mudou algo, ele vai permitir nova renderização. Se nao mudou, ele nao entra no fluxo de rederização.
 */

const searchFormSchema = z.object({
    query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions;
    });

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    });

    async function handleSearchTransactions(data: SearchFormInputs) {
        await fetchTransactions(data.query);
    }

    return (
        <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type='text'
                placeholder='Busque por transações'
                {...register('query')}
            />

            <button type='submit' disabled={isSubmitting} >
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </S.SearchFormContainer>
    );
}

// export const SearchForm = memo(SearchFormComponent);