import { type ButtonHTMLAttributes } from 'react'

import { play } from '../../utils/sound'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', onClick, className = '', children, ...rest }: Props) {
  return (
    <button
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      onClick={(e) => { play('click'); onClick?.(e) }}
      {...rest}
    >
      {children}
    </button>
  )
}



