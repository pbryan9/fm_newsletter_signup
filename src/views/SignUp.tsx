import { useRef, useState } from 'react';
import styled from 'styled-components';

import headerImageMobile from '../assets/images/illustration-sign-up-mobile.svg';
import headerImageDesktop from '../assets/images/illustration-sign-up-desktop.svg';
// import listIcon from '../../public/icon-list.svg';
import { COLORS, SCREEN } from '../assets/styles';
import Button from '../components/Button';

type SignUpProps = {
  setFormIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

function isValidEmail(value: string) {
  // regex stolen from https://stackoverflow.com/a/201378/19913288

  const VALID_EMAIL =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return value.match(VALID_EMAIL);
}

export default function SignUp({
  setFormIsSubmitted,
  email,
  setEmail,
}: SignUpProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  function validateEmail(value: string) {
    if (value === '') return;

    const isValid = isValidEmail(value);

    if (isValid) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 50);
    }

    return isValid;
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateEmail(email)) return;

    setFormIsSubmitted(true);
  }

  return (
    <Wrapper>
      <ImageWrapper>{/* <Image src={headerImageMobile} /> */}</ImageWrapper>

      <ContentWrapper>
        <Headline>Stay updated!</Headline>

        <Message>
          Join 60,000+ product managers receiving monthly updates on:
        </Message>

        <BenefitsList>
          <Benefit>Product discovery and building what matters</Benefit>
          <Benefit>Measuring to ensure updates are a success</Benefit>
          <Benefit>And much more!</Benefit>
        </BenefitsList>

        <FormWrapper onSubmit={submitForm}>
          <LabelContainer>
            <EmailLabel htmlFor='email-address-input'>Email address</EmailLabel>

            {isInvalid && <ErrorMessage>Valid email required</ErrorMessage>}
          </LabelContainer>

          <EmailInput
            id='email-address-input'
            ref={emailInputRef}
            type='text'
            placeholder='email@company.com'
            autoComplete='email'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isInvalid) validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(email)}
            className={isInvalid ? 'invalid' : undefined}
          />

          <Button
            type='submit'
            className='cta'
            disabled={isInvalid || email === ''}
          >
            Subscribe to monthly newsletter
          </Button>
        </FormWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100vw;

  background-color: hsl(${COLORS.white});

  @media screen and (min-width: ${SCREEN}) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 40px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 36px;
    height: 640px;
    max-width: 930px;

    padding: 24px;

    box-shadow: 0px 24px 24px 24px hsl(${COLORS['dark-slate-grey']} / 0.3);
  }
`;

const ImageWrapper = styled.section`
  /* margin-top: -1px; */
  width: 100vw;
  height: 286px;

  background-image: url(${headerImageMobile});
  background-size: cover;
  background-position: bottom;

  @media screen and (min-width: ${SCREEN}) {
    background-image: url(${headerImageDesktop});
    height: 100%;
    flex-basis: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 24px;
  }
`;

const ContentWrapper = styled.section`
  padding: 40px 24px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: ${SCREEN}) {
    justify-content: center;
    flex-basis: 50%;

    padding-left: 40px;
  }
`;

const Headline = styled.h1`
  font-weight: var(--fw-bold, 700);
  font-size: 2.5rem;
  line-height: 1;

  @media screen and (min-width: ${SCREEN}) {
    font-size: 3.5rem;
  }
`;

const Message = styled.p``;

const BenefitsList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 12px;
`;

const Benefit = styled.li`
  list-style: none;
  position: relative;

  margin: 0 -1rem;
  padding: 0 0 0 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    width: 1.5rem;
    aspect-ratio: 1 / 1;
    display: inline-block;
    background-size: contain;
    background-image: url('/icon-list.svg');
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EmailInput = styled.input`
  /* 54 px */
  border: 1px solid hsl(${COLORS['grey']} / 0.6);
  border-radius: 8px;
  color: hsl(${COLORS['dark-slate-grey']});

  padding: 16px 24px;

  &::placeholder {
    color: hsl(${COLORS['charcoal-grey']});
  }

  &:focus {
    border: 1px solid hsl(${COLORS['dark-slate-grey']});
    outline-offset: 2px;
  }

  &.invalid {
    border: 1px solid hsl(${COLORS.tomato});
    background-color: hsl(${COLORS.tomato} / 0.3);
    color: hsl(${COLORS.tomato});
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmailLabel = styled.label`
  font-size: 0.75rem;
  font-weight: var(--fw-bold);
`;

const ErrorMessage = styled.p`
  font-size: 0.75rem;
  font-weight: var(--fw-bold);
  color: hsl(${COLORS.tomato});
`;
