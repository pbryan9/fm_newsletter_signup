import styled from 'styled-components';

import checkmark from '../assets/images/icon-success.svg';
import Button from '../components/Button';
import { COLORS, SCREEN } from '../assets/styles';

type ConfirmationProps = {
  email: string;
  dismiss: () => void;
};

export default function Confirmation({ email, dismiss }: ConfirmationProps) {
  return (
    <Wrapper>
      <ContentContainer>
        <img src={checkmark} alt='success' height={64} width={64} />
        <Headline>Thanks for subscribing!</Headline>
        <p>
          A confirmation email has been sent to <Email>{email}</Email>. Please
          open it and click the button inside to confirm your subscription.
        </p>
      </ContentContainer>
      <Button onClick={() => dismiss()} className='confirmation-button'>
        Dismiss message
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: hsl(${COLORS.white});

  min-height: 100%;
  padding: 148px 24px 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  @media screen and (min-width: ${SCREEN}) {
    min-height: unset;
    width: 500px;
    aspect-ratio: 1 / 1;

    padding: 40px 56px 56px;

    border-radius: 36px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 0px 24px 24px 24px hsl(${COLORS['dark-slate-grey']} / 0.3);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Headline = styled.h1`
  line-height: 1;
  font-size: 2.5rem;
  padding-top: 1rem;

  @media screen and (min-width: ${SCREEN}) {
    font-size: 3.5rem;
  }
`;

const Email = styled.span`
  font-weight: var(--fw-bold, 700);
`;
