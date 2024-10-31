import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Layout from './Layout'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <Layout />
  </StrictMode>,
)
