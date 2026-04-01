import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7f1e8 0%, #e8dccb 100%);
  padding: 24px;
`

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #fffaf3;
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 20px 50px rgba(92, 58, 33, 0.15);
  border: 1px solid rgba(111, 78, 55, 0.08);
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

export const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #6f4e37;
  margin-bottom: 8px;
`

export const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  color: #3e2c23;
  margin-bottom: 8px;
`

export const Subtitle = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #7a675b;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.label`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
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

  &::placeholder {
    color: #b09a87;
  }
`

export const Button = styled.button`
  height: 50px;
  border: none;
  border-radius: 12px;
  background: #6f4e37;
  color: #fffaf3;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover:not(:disabled) {
    background: #5c3a21;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: #b42318;
  margin: 0;
`