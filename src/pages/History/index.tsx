import { HistoryContainer, HistoryList } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>2 months ago</td>
              <td>Done</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>2 months ago</td>
              <td>Done</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>2 months ago</td>
              <td>Done</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>2 months ago</td>
              <td>Done</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
