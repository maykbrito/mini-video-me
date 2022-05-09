import { useLanguage } from 'renderer/hooks'

export function Status({ status }) {
  const { getTerm } = useLanguage()

  return (
    <div className="message-wrapper">
      <h3>{getTerm(status)}...</h3>
    </div>
  )
}
