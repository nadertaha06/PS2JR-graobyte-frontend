import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(62, 44, 35, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 200;
`

export const Modal = styled.div`
  width: 100%;
  max-width: 520px;
  background: #fffaf3;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 24px 60px rgba(62, 44, 35, 0.2);
  border: 1px solid rgba(111, 78, 55, 0.1);
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const Title = styled.h2`
  margin: 0;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #3e2c23;
`

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.8rem;
  color: #7a675b;
  line-height: 1;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.label`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #4a3428;
`

export const Input = styled.input`
  height: 48px;
  border: 1px solid #d7c3ae;
  border-radius: 12px;
  padding: 0 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: #3e2c23;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #c08b5c;
    box-shadow: 0 0 0 3px rgba(192, 139, 92, 0.15);
  }
`

export const TextArea = styled.textarea`
  border: 1px solid #d7c3ae;
  border-radius: 12px;
  padding: 12px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: #3e2c23;
  background: #fff;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #c08b5c;
    box-shadow: 0 0 0 3px rgba(192, 139, 92, 0.15);
  }
`

export const Select = styled.select`
  height: 48px;
  border: 1px solid #d7c3ae;
  border-radius: 12px;
  padding: 0 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: #3e2c23;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #c08b5c;
    box-shadow: 0 0 0 3px rgba(192, 139, 92, 0.15);
  }
`

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`

export const ErrorMessage = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: #b42318;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`

export const SecondaryButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border: 1px solid #d7c3ae;
  border-radius: 12px;
  background: transparent;
  color: #4a3428;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
`

export const PrimaryButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border: none;
  border-radius: 12px;
  background: #6f4e37;
  color: #fffaf3;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
