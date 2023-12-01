import { type ReactNode, type ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/styles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
}

export default function Button({ children, ...delegated }: ButtonProps) {
  return <Wrapper {...delegated}>{children}</Wrapper>;
}

const Wrapper = styled.button`
  background-color: hsl(${COLORS['dark-slate-grey']});
  color: hsl(${COLORS.white});

  border: none;
  border-radius: 8px;

  margin-top: 24px;
  padding: 16px 24px;

  font-weight: var(--fw-bold);

  transition: transform 150ms;

  &:focus {
    outline-offset: 2px;
  }

  &:hover:not(:disabled) {
    background-color: hsl(${COLORS['dark-slate-grey']} / 0.9);
  }

  &.cta:hover:not(:disabled) {
    background-image: linear-gradient(
      to right,
      #e1496d,
      hsl(7.415730337078654, 100%, 65.09803921568627%)
    );

    box-shadow: 0 8px 24px 0 hsl(${COLORS.tomato} / 0.5);

    transform: scale(1.02);
  }

  /* &:disabled {
    background-color: hsl(${COLORS['dark-slate-grey']} / 0.5);
  } */
`;
