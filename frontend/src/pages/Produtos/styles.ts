import styled from 'styled-components'

type StatusProps = {
  $active?: boolean
}

export const Container = styled.div`
  min-height: 100vh;
  background: #f7f1e8;
`

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`

export const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #3e2c23;
  margin-bottom: 24px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`

export const Card = styled.div`
  background: #fffaf3;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(92, 58, 33, 0.1);
  border: 1px solid rgba(111, 78, 55, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CardTitle = styled.h2`
  font-family: 'DM Sans', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #3e2c23;
`

export const CardDescription = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: #7a675b;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`

export const Price = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  color: #6f4e37;
`

export const Status = styled.span<StatusProps>`
  font-size: 0.8rem;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#d1fae5' : '#fee2e2')};
  color: ${({ $active }) => ($active ? '#065f46' : '#991b1b')};
`

export const Message = styled.p`
  font-family: 'DM Sans', sans-serif;
  color: #7a675b;
`