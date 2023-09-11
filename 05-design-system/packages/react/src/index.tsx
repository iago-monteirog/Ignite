/* eslint-disable prettier/prettier */
import { ComponentProps } from 'react'

import { styled } from './styles'

export const Button = styled('button', {
    fontFamily: '$default',
    backgroundColor: '$ignite300',
    borderRadius: '$sm',
    border: 0,
    fontWeight: 'bold',
    color: '$white',
    cursor: 'pointer',

    variants: {
        size: {
            small: {
                fontSize: 14,
                padding: '$2 $4',
            },
            big: {
                fontSize: 16,
                padding: '$3 $6',

            }
        }
    },

    defaultVariants: {
        size: 'small'
    },

    '&:hover': {
        backgroundColor: '$ignite500'
    }
})

export type ButtonProps = ComponentProps<typeof Button>
