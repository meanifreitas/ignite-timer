import { FormContainer, TaskInput, TimeInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I will be working on</label>
      <TaskInput
        list="task-suggestions"
        id="task"
        placeholder="Give your project a name"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
      </datalist>

      <label htmlFor="time">during</label>
      <TimeInput
        type="number"
        id="time"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('time', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
