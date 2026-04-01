import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f1e8 0%, #efe4d5 100%);
`

export const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 40px;
`

export const Header = styled.div`
  margin-bottom: 28px;
`

export const Title = styled.h1`
  margin: 0 0 8px;
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: #3e2c23;
`

export const Subtitle = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: #7a675b;
`

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
`

export const FormCard = styled.div`
  background: #fffaf3;
  border-radius: 18px;
  padding: 24px;
  border: 1px solid rgba(111, 78, 55, 0.08);
  box-shadow: 0 14px 30px rgba(92, 58, 33, 0.08);
  height: fit-content;
`

export const ListCard = styled.div`
  background: #fffaf3;
  border-radius: 18px;
  padding: 24px;
  border: 1px solid rgba(111, 78, 55, 0.08);
  box-shadow: 0 14px 30px rgba(92, 58, 33, 0.08);
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

export const PrimaryButton = styled.button`
  height: 46px;
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

export const ErrorMessage = styled.p`
  margin: 0 0 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #b42318;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 14px;
  background: #fdf8f2;
  border: 1px solid rgba(111, 78, 55, 0.08);
`

export const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const EmployeeName = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #3e2c23;
`

export const EmployeeEmail = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  color: #7a675b;
`

export const RemoveButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border: 1px solid #f1b5b5;
  border-radius: 10px;
  background: transparent;
  color: #b42318;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: #b42318;
    background: #fff1f1;
  }
`

export const Message = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: #7a675b;
`